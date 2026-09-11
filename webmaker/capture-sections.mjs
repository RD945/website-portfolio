import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";

const outputDir = "C:/Users/Reetam/AppData/Local/Temp/opencode/sythra-captures/sections";
await mkdir(outputDir, { recursive: true });
const server = spawn("cmd.exe", ["/d", "/s", "/c", "npm run dev -- --host 127.0.0.1 --port 4173"], {
  cwd: process.cwd(),
  stdio: "ignore",
  windowsHide: true,
});

for (let attempt = 0; attempt < 60; attempt += 1) {
  try {
    if ((await fetch("http://127.0.0.1:4173/")).ok) break;
  } catch {
    // Wait for Vite.
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
}

const browser = await chromium.launch({ headless: true });
const sections = [
  ["hero", 0],
  ["ai", 1417],
  ["features", 2289],
  ["agentic", 3273],
  ["what", 4018],
  ["audience", 9647],
  ["faq", 10345],
  ["access", 11594],
];

for (const target of [
  ["live", "https://www.sythra.ai/"],
  ["local", "http://127.0.0.1:4173/"],
]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(target[1], { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(target[0] === "live" ? 5000 : 1800);
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (const [name, liveY] of sections) {
    const y = target[0] === "live" ? liveY : Math.min(liveY, pageHeight - 1000);
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(450);
    await page.screenshot({ path: `${outputDir}/${target[0]}-${name}.png`, fullPage: false });
  }
  await page.close();
}

await browser.close();
server.kill();
