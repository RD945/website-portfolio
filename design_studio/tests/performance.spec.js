import { test, expect } from "@playwright/test";

const profiles = [
  { name: "desktop-fast", width: 1440, height: 1000, latency: 20, mbps: 20, cpu: 1 },
  { name: "mobile-fast", width: 390, height: 844, latency: 40, mbps: 10, cpu: 4 },
  { name: "mobile-slow-4g", width: 390, height: 844, latency: 150, mbps: 1.6, cpu: 4 },
];

for (const profile of profiles) {
  test(`cold-load performance: ${profile.name}`, async ({ browser }) => {
    const results = [];

    for (let run = 0; run < 3; run += 1) {
      const context = await browser.newContext({
        viewport: { width: profile.width, height: profile.height },
        deviceScaleFactor: profile.width < 700 ? 2 : 1,
      });
      const page = await context.newPage();
      const failedRequests = [];
      const badResponses = [];
      page.on("requestfailed", (request) => failedRequests.push(request.url()));
      page.on("response", (response) => {
        if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
      });

      const session = await context.newCDPSession(page);
      await session.send("Network.enable");
      await session.send("Network.setCacheDisabled", { cacheDisabled: true });
      await session.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: profile.latency,
        downloadThroughput: profile.mbps * 125000,
        uploadThroughput: 125000,
      });
      await session.send("Emulation.setCPUThrottlingRate", { rate: profile.cpu });

      await page.addInitScript(() => {
        window.metrics = { lcp: 0, cls: 0, lcpElement: "" };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.metrics.lcp = entry.startTime;
            window.metrics.lcpElement = entry.element?.tagName || "unknown";
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.metrics.cls += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });

      await page.goto("/");
      await page.locator(".hero-artwork img").evaluate((image) => image.decode());
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);

      const result = await page.evaluate(() => ({
        lcp: Math.round(window.metrics.lcp),
        lcpElement: window.metrics.lcpElement,
        cls: Number(window.metrics.cls.toFixed(4)),
        load: Math.round(performance.getEntriesByType("navigation")[0].loadEventEnd),
        transferredKB: Math.round(performance.getEntriesByType("resource").reduce((sum, resource) => sum + resource.transferSize, 0) / 1024),
        external: performance.getEntriesByType("resource").filter((resource) => !resource.name.startsWith(location.origin)).length,
      }));

      results.push(result);
      expect(failedRequests, `${profile.name} failed requests`).toEqual([]);
      expect(badResponses, `${profile.name} error responses`).toEqual([]);
      await context.close();
    }

    console.log(`${profile.name}: ${JSON.stringify(results)}`);
    for (const result of results) {
      expect(result.cls).toBeLessThan(0.1);
      expect(result.external).toBe(0);
      expect(result.lcp, `${profile.name} LCP budget`).toBeLessThan(1000);
      expect(result.load, `${profile.name} load-event budget`).toBeLessThan(1000);
    }
  });
}
