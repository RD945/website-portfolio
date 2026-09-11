import { mkdirSync } from "node:fs";
import { test, expect } from "@playwright/test";

const viewports = [320, 360, 390, 768, 1024, 1440, 1920];

async function expectNoHorizontalOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

async function waitForImages(page) {
  for (const image of await page.locator(".asset-visual img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(
      () => image.evaluate((element) => element.complete && element.naturalWidth > 0),
      { timeout: 20_000 },
    ).toBe(true);
    await image.evaluate((element) => element.decode());
  }
}

test("responsive composition and mobile navigation", async ({ page }) => {
  for (const width of viewports) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator(".menu-button");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Films" }).click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#work$/);
  await expectNoHorizontalOverflow(page);
});

test("keyboard baseline, interactions, and local image loading", async ({ page }) => {
  const errors = [];
  const failedRequests = [];
  const badResponses = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => failedRequests.push(request.url()));
  page.on("response", (response) => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
  });

  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();

  await expect(page.locator(".hero-artwork img")).toBeAttached();
  await expect(page.locator(".hero-play")).toHaveAttribute("href", "#work");

  const service = page.getByRole("button", { name: "Narrative Films" });
  await service.click();
  await expect(service).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#service-description-1")).toBeVisible();
  await service.click();
  await expect(service).toHaveAttribute("aria-expanded", "false");

  await page.locator(".menu-button").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".menu-button")).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator(".menu-button")).toHaveAttribute("aria-expanded", "false");

  await waitForImages(page);
  expect(errors).toEqual([]);
  expect(failedRequests).toEqual([]);
  expect(badResponses).toEqual([]);
});

test("desktop and mobile visual captures", async ({ page }) => {
  mkdirSync("test-results", { recursive: true });

  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await waitForImages(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await waitForImages(page);
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  await expectNoHorizontalOverflow(page);
});

test("touch targets and reduced-motion layout", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");

  const menuBox = await page.locator(".menu-button").boundingBox();
  expect(menuBox.width).toBeGreaterThanOrEqual(44);
  expect(menuBox.height).toBeGreaterThanOrEqual(44);

  const ctaBox = await page.getByRole("link", { name: "Start a conversation" }).boundingBox();
  expect(ctaBox.width).toBeGreaterThanOrEqual(44);
  expect(ctaBox.height).toBeGreaterThanOrEqual(44);
  await expectNoHorizontalOverflow(page);
  await context.close();
});
