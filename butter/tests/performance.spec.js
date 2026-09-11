import { test, expect } from "@playwright/test";

const profiles = [
  {
    name: "desktop-fast",
    viewport: { width: 1440, height: 1000 },
    latency: 20,
    downloadMbps: 20,
    cpuRate: 1,
    deviceScaleFactor: 1,
  },
  {
    name: "mobile-fast",
    viewport: { width: 390, height: 844 },
    latency: 40,
    downloadMbps: 10,
    cpuRate: 4,
    deviceScaleFactor: 2,
  },
  {
    name: "mobile-slow-4g",
    viewport: { width: 390, height: 844 },
    latency: 150,
    downloadMbps: 1.6,
    cpuRate: 4,
    deviceScaleFactor: 2,
  },
];

for (const profile of profiles) {
  test(`${profile.name} cold load stays within budget`, async ({ browser, baseURL }, testInfo) => {
    const runs = [];

    for (let run = 0; run < 3; run += 1) {
      const context = await browser.newContext({
        viewport: profile.viewport,
        deviceScaleFactor: profile.deviceScaleFactor,
      });
      const page = await context.newPage();
      const client = await context.newCDPSession(page);
      const externalRequests = [];

      await client.send("Network.enable");
      await client.send("Network.setCacheDisabled", { cacheDisabled: true });
      await client.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: profile.latency,
        downloadThroughput: (profile.downloadMbps * 1024 * 1024) / 8,
        uploadThroughput: (profile.downloadMbps * 1024 * 1024) / 8,
      });
      await client.send("Emulation.setCPUThrottlingRate", { rate: profile.cpuRate });

      page.on("request", (request) => {
        const requestUrl = new URL(request.url());
        if (requestUrl.protocol.startsWith("http") && requestUrl.origin !== new URL(baseURL).origin) {
          externalRequests.push(request.url());
        }
      });

      await page.addInitScript(() => {
        window.__flowPerformance = { lcp: 0, cls: 0 };

        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const latest = entries[entries.length - 1];
          if (latest) {
            window.__flowPerformance.lcp = latest.startTime;
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });

        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              window.__flowPerformance.cls += entry.value;
            }
          }
        }).observe({ type: "layout-shift", buffered: true });
      });

      await page.goto("/", { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);

      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        const resources = performance.getEntriesByType("resource");
        return {
          lcp: window.__flowPerformance.lcp || navigation.loadEventEnd,
          cls: Number(window.__flowPerformance.cls.toFixed(4)),
          loadEvent: navigation.loadEventEnd,
          transferredKb: Math.round(resources.reduce((total, resource) => total + (resource.transferSize || resource.encodedBodySize || 0), 0) / 1024),
        };
      });

      runs.push({ ...metrics, externalRequests });
      await context.close();
    }

    await testInfo.attach(`${profile.name}-metrics`, {
      body: JSON.stringify(runs, null, 2),
      contentType: "application/json",
    });

    for (const result of runs) {
      expect(result.cls, `${profile.name} CLS`).toBeLessThan(0.1);
      expect(result.externalRequests, `${profile.name} external requests`).toEqual([]);
      expect(result.lcp, `${profile.name} LCP`).toBeLessThan(1000);
      expect(result.loadEvent, `${profile.name} load event`).toBeLessThan(1000);
    }
  });
}
