import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";

const outputDir = "C:/Users/Reetam/AppData/Local/Temp/opencode/sythra-captures";
await mkdir(outputDir, { recursive: true });

const localServer = spawn("cmd.exe", ["/d", "/s", "/c", "npm run dev -- --host 127.0.0.1 --port 4173"], {
  cwd: process.cwd(),
  stdio: "ignore",
  windowsHide: true,
});

const waitForServer = async (url) => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for ${url}`);
};

await waitForServer("http://127.0.0.1:4173/");

const browser = await chromium.launch({ headless: true });
const targets = [
  { name: "live", url: "https://www.sythra.ai/" },
  { name: "local", url: "http://127.0.0.1:4173/" },
];
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of viewports) {
  for (const target of targets) {
    const page = await browser.newPage({ viewport });
    await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(target.name === "live" ? 7000 : 2500);
    await page.screenshot({
      path: `${outputDir}/${target.name}-${viewport.name}-full.png`,
      fullPage: true,
    });
    await page.screenshot({
      path: `${outputDir}/${target.name}-${viewport.name}-viewport.png`,
      fullPage: false,
    });

    const snapshot = await page.evaluate(() => ({
      title: document.title,
      height: document.documentElement.scrollHeight,
      sections: [...document.querySelectorAll("main > section, main > div, body > section")].map((section) => ({
        id: section.id,
        className: section.className,
        top: Math.round(section.getBoundingClientRect().top + window.scrollY),
        height: Math.round(section.getBoundingClientRect().height),
      })),
      headings: [...document.querySelectorAll("h1, h2, h3")].slice(0, 20).map((heading) => heading.textContent.trim()),
    }));
    console.log(JSON.stringify({ target: target.name, viewport: viewport.name, ...snapshot }));
    await page.close();
  }
}

await browser.close();
localServer.kill();
