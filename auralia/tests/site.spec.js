import { mkdir } from "node:fs/promises";

import { expect, test as base } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const errors = [];
    const consoleErrors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    await use(page);
    expect(errors, `${testInfo.title} reported browser errors`).toEqual([]);
    expect(consoleErrors, `${testInfo.title} reported console errors`).toEqual([]);
  },
});

const widths = [320, 360, 390, 768, 1024, 1440, 1920];

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
    viewport: window.innerWidth,
  }));

  expect(overflow.document).toBeLessThanOrEqual(overflow.viewport + 1);
  expect(overflow.body).toBeLessThanOrEqual(overflow.viewport + 1);
}

async function expectDecodedImage(locator) {
  await expect(locator).toBeVisible();
  await expect
    .poll(() => locator.evaluate((image) => image.complete && image.naturalWidth > 0))
    .toBe(true);
}

async function gotoReady(page, path = "/") {
  const response = await page.goto(path, { waitUntil: "load" });
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
  return response;
}

test("renders the public routes through SSR", async ({ page }) => {
  for (const route of [
    ["/", /Auralis — The Wireless Headphones of the Future/],
    ["/privacy", /Privacy Policy — Auralis/],
    ["/terms", /Terms of Service — Auralis/],
  ]) {
    const response = await gotoReady(page, route[0]);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(route[1]);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator(".skip-link")).toHaveAttribute("href", "#main-content");
  }
});

test("keeps the composition inside the viewport at responsive widths", async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await gotoReady(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("supports keyboard skip navigation and mobile navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoReady(page);

  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const trigger = page.locator('button[aria-label="Open navigation"]');
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Product" }).click();
  await page.waitForTimeout(250);
  await expect(dialog).toBeHidden();
  await expect(page.locator("#features")).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expectNoHorizontalOverflow(page);
});

test("loads the primary hero image", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await gotoReady(page);

  const heroImage = page.locator(
    'img[alt="Space grey wireless over-ear headphones, three-quarter view"]',
  );
  await expectDecodedImage(heroImage);
  await expect(page.getByText("Space Grey — full view")).toBeVisible();
});

test("selects plans and completes the reservation dialog", async ({ page }) => {
  await gotoReady(page);

  const standard = page.getByRole("radio", { name: /Standard edition/i });
  await page.locator('label[for="plan-standard"]').click();
  await expect(standard).toBeChecked();
  await page.getByRole("button", { name: "Order Now" }).first().click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Standard Edition" })).toBeVisible();
  await dialog.getByRole("button", { name: "Not yet" }).click();
  await expect(dialog).toBeHidden();

  const signature = page.getByRole("radio", { name: /Signature edition/i });
  await page.locator('label[for="plan-signature"]').click();
  await page.getByRole("button", { name: "Order Now" }).nth(1).click();
  await expect(dialog.getByRole("heading", { name: "Signature Edition" })).toBeVisible();
  await dialog.getByRole("button", { name: "Confirm order" }).click();
  await expect(page.getByText("Signature reserved")).toBeVisible();
});

test("supports marquee controls and reduced motion", async ({ page }) => {
  await gotoReady(page);

  const pause = page.getByRole("button", { name: "Pause scene marquee" });
  await expect(pause).toHaveAttribute("aria-pressed", "false");
  await pause.click();
  await expect(page.getByRole("button", { name: "Resume scene marquee" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "load" });
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
  await expect
    .poll(() =>
      page.locator(".marquee-track").evaluate((track) => getComputedStyle(track).animationName),
    )
    .toBe("none");
});

test("keeps touch controls usable in portrait and landscape", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:5175",
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await gotoReady(page);
  for (const button of [
    page.getByRole("button", { name: "Open navigation" }),
    page.getByRole("button", { name: "Pause scene marquee" }),
  ]) {
    const box = await button.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  await page.setViewportSize({ width: 844, height: 390 });
  await page.reload({ waitUntil: "load" });
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
  await expectNoHorizontalOverflow(page);
  await context.close();
  expect(errors).toEqual([]);
});

test("captures desktop and mobile review screenshots", async ({ page }) => {
  await mkdir("test-results", { recursive: true });

  for (const capture of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    await page.setViewportSize({ width: capture[1], height: capture[2] });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await expectDecodedImage(
      page.locator('img[alt="Space grey wireless over-ear headphones, three-quarter view"]'),
    );
    await page.screenshot({ path: `test-results/${capture[0]}.png`, fullPage: true });
  }
});

test("does not request third-party runtime resources", async ({ page }) => {
  const external = new Set();
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.protocol === "http:" || url.protocol === "https:") {
      if (url.origin !== "http://127.0.0.1:5175") external.add(url.origin);
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await expectDecodedImage(
    page.locator('img[alt="Space grey wireless over-ear headphones, three-quarter view"]'),
  );
  expect([...external]).toEqual([]);
});
