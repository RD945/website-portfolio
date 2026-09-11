import { test, expect } from "@playwright/test";
import fs from "node:fs";

const viewports = [320, 360, 390, 768, 1024, 1440, 1920];

async function expectNoHorizontalOverflow(page) {
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasOverflow).toBe(false);
}

test.describe("Flow responsive and interaction coverage", () => {
  for (const width of viewports) {
    test(`renders without overflow at ${width}px`, async ({ page }) => {
      const pageErrors = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));

      await page.setViewportSize({ width, height: width <= 390 ? 844 : 1000 });
      await page.goto("/");

      await expect(page.getByRole("heading", { name: "Keep every customer relationship moving." })).toBeVisible();
      await expectNoHorizontalOverflow(page);
      expect(pageErrors).toEqual([]);
    });
  }

  test("mobile navigation opens, closes from a link, and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-navigation")).toBeVisible();

    await page.locator('#mobile-navigation a[href="#features"]').click();
     await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(page).toHaveURL(/#features$/);

    await menuButton.click();
    await page.keyboard.press("Escape");
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
    await expect(page).toHaveURL(/#main$/);
  });

  test("template, testimonial, and FAQ controls work", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");

    const template = page.locator('article[aria-live="polite"]');
    await expect(template).toContainText("Pass context without the scramble.");
    await page.getByRole("tab", { name: "Show Account review template" }).click();
    await expect(template).toContainText("See where every relationship stands.");

    await page.getByRole("button", { name: "Next testimonial" }).click();
    await expect(page.locator('[aria-live="polite"]').nth(1)).toContainText("account history");

    const faq = page.locator("details").filter({ hasText: "What makes Flow different?" });
    await faq.locator("summary").click();
    await expect(faq.locator("p")).toBeVisible();
  });

  test("signup calls are UI-only and do not navigate", async ({ page }) => {
    await page.goto("/");
    const currentUrl = page.url();
    await page.getByRole("link", { name: "Sign up for Flow for free" }).click();
    await expect(page).toHaveURL(currentUrl);
    await expect(page.getByRole("heading", { name: "Keep every customer relationship moving." })).toBeVisible();
  });

  test("visible local images decode without external requests", async ({ page }) => {
    const externalRequests = [];
    page.on("request", (request) => {
      const requestUrl = new URL(request.url());
       if (requestUrl.protocol.startsWith("http") && requestUrl.origin !== "http://127.0.0.1:5183") {
        externalRequests.push(request.url());
      }
    });

    await page.goto("/");
    const images = page.locator("img");
    for (let index = 0; index < await images.count(); index += 1) {
      await images.nth(index).scrollIntoViewIfNeeded();
    }

    const imageState = await images.evaluateAll((elements) => elements.map((image) => ({
      complete: image.complete,
      width: image.naturalWidth,
      source: image.currentSrc,
    })));

    expect(externalRequests).toEqual([]);
    expect(imageState.length).toBeGreaterThan(0);
    expect(imageState.every((image) => image.complete && image.width > 0 && image.source.startsWith("http://127.0.0.1:5183/"))).toBe(true);
  });

  test("captures desktop and mobile review screenshots", async ({ page }) => {
    fs.mkdirSync("test-results", { recursive: true });

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await page.screenshot({ path: "test-results/desktop.png", fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  });
});
