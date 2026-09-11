import { test, expect } from '@playwright/test';

test('project exploration and private inquiry brief', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'View study: The Courtyard House', exact: true }).click();
  const project = page.locator('#project-dialog');
  await expect(project).toBeVisible();
  await expect(project.getByRole('heading')).toHaveText('The Courtyard House');
  await page.keyboard.press('Escape');
  await expect(project).not.toBeVisible();
  await page.getByRole('button', { name: 'Tell us about your project' }).click();
  await page.getByLabel('Your name').fill('Test Client');
  await page.getByLabel('Email address').fill('client@example.com');
  await page.getByLabel('Project location').fill('Countryside');
  await page.getByLabel('What are you imagining?').fill('A quiet courtyard home with room for a garden.');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Prepare project brief' }).click();
  expect((await download).suggestedFilename()).toBe('forma-project-brief.txt');
  await expect(page.getByRole('status')).toContainText('Your brief is ready');
});

test('responsive composition and mobile navigation', async ({ page }) => {
  for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation').getByRole('link', { name: 'Selected work' }).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#work$/);
});

test('baseline links, image loading, and keyboard focus', async ({ page }) => {
  const errors = [];
  const failedRequests = [];
  const badResponses = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => failedRequests.push(request.url()));
  page.on('response', response => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator('.hero-image img')).toBeVisible();
  await expect.poll(() => page.locator('.hero-image img').evaluate(image => image.complete && image.naturalWidth > 0), { timeout: 20000 }).toBe(true);
  await page.locator('.process-list summary').nth(1).click();
  await expect(page.locator('.process-list details').nth(1)).toHaveAttribute('open', '');
  expect(errors).toEqual([]);
  expect(failedRequests).toEqual([]);
  expect(badResponses).toEqual([]);
});

test('capture desktop and mobile compositions', async ({ page }) => {
  const waitForDecodedImage = async image => {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0), { timeout: 20000 }).toBe(true);
    await image.evaluate(element => element.decode());
  };

  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator('.hero-image img, .project-image img, #palette-image').all()) {
    await waitForDecodedImage(image);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'test-results/desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileHero = page.locator('.hero-image img');
  await expect.poll(() => mobileHero.evaluate(image => image.currentSrc.includes('hero-mobile-') && image.complete && image.naturalWidth > 0), { timeout: 20000 }).toBe(true);
  await mobileHero.evaluate(image => image.decode());
  await page.screenshot({ path: 'test-results/mobile.png', fullPage: true });
});

test('material selection carries into an editable downloadable brief', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Forest & warmth', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Forest & warmth', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#palette-title')).toHaveText('Forest & warmth');
  await expect(page.locator('.swatch-name').nth(1)).toHaveText('Walnut');
  await expect(page.locator('#palette-image')).toHaveAttribute('src', '/images/stillwater-800.webp');
  await page.getByRole('button', { name: 'Start with this palette' }).click();
  await expect(page.getByLabel('Material direction (optional)')).toHaveValue('Forest & warmth');
  await page.getByLabel('Your name').fill('Material Client');
  await page.getByLabel('Email address').fill('client@example.com');
  await page.getByLabel('Project location').fill('Woodland');
  await page.getByLabel('What are you imagining?').fill('A home inspired by the forest palette.');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Prepare project brief' }).click();
  await download;
  const brief = await page.locator('.download-link').evaluate(async link => (await fetch(link.href)).text());
  expect(brief).toContain('Material direction: Forest & warmth');
  await page.getByRole('button', { name: 'Close inquiry' }).click();
  await page.getByRole('button', { name: 'Stone & stillness', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#palette-title')).toHaveText('Stone & stillness');
});

test('material explorer recovers from image failure and works on touch', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.route('**/images/stillwater-*.webp', route => route.abort());
  await page.goto('/');
  await page.getByRole('button', { name: 'Forest & warmth', exact: true }).tap();
  await expect(page.locator('.atelier-loading')).toContainText('Image unavailable');
  await page.getByRole('button', { name: 'Earth & light', exact: true }).tap();
  await expect(page.locator('.atelier-loading')).toBeHidden();
  await page.getByRole('button', { name: 'Start with this palette' }).tap();
  await expect(page.getByLabel('Material direction (optional)')).toHaveValue('Earth & light');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test('phone inquiry, touch targets, and landscape reflow', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  expect(await page.locator('.hero-image img').evaluate(image => image.currentSrc)).toContain('hero-mobile-800.webp');
  const target = await page.locator('.image-open').boundingBox();
  expect(target.width).toBeGreaterThanOrEqual(44);
  expect(target.height).toBeGreaterThanOrEqual(44);
  await page.getByRole('button', { name: 'Tell us about your project' }).tap();
  await expect(page.locator('#inquiry-dialog')).toBeVisible();
  expect(await page.getByLabel('Your name').evaluate(input => getComputedStyle(input).fontSize)).toBe('16px');
  await page.getByRole('button', { name: 'Prepare project brief' }).tap();
  expect(await page.getByLabel('Your name').evaluate(input => input.validity.valueMissing)).toBe(true);
  await page.setViewportSize({ width: 844, height: 390 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Close inquiry' }).tap();
  await expect(page.locator('#inquiry-dialog')).not.toBeVisible();
  await context.close();
});
