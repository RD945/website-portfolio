import { chromium } from 'playwright';
import { createServer } from 'vite';
const server = await createServer({ server: { host:'127.0.0.1', port:4188, strictPort:true } });
let browser;
try {
  await server.listen();
  browser = await chromium.launch({ headless:true });
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({viewport:{width,height:900}});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4188/',{waitUntil:'domcontentloaded',timeout:20000});
    await page.evaluate(()=>document.fonts.ready);
    await page.locator('#products .product-card').count().then(count=>{if(count!==6)throw Error(`Expected 6 products, got ${count}`);});
    await page.locator('[data-filter="Ecommerce"]').click();
    if (await page.locator('#products .product-card').count() !== 2) throw Error('Product filter failed');
    await page.locator('[data-filter="all"]').click();
    await page.locator('[data-details="launch"]').first().click();
    await page.locator('#product-dialog[open]').waitFor({timeout:3000});
    await page.locator('#product-dialog [data-add="launch"]').click();
    await page.locator('#product-dialog [data-close]').click();
    await page.locator('[data-cart]').first().click();
    await page.locator('#cart-dialog[open]').waitFor({timeout:3000});
    if (await page.locator('#cart-dialog .cart-item').count() !== 1) throw Error('Cart add failed');
    await page.locator('#brief-form input[name="name"]').fill('Test Buyer');
    await page.locator('#brief-form input[name="email"]').fill('buyer@example.com');
    await page.locator('#brief-form textarea').fill('A small business website with a clear contact path.');
    await page.locator('#brief-form button[type="submit"]').click();
    if (!(await page.locator('#brief-status').textContent()).includes('downloaded')) throw Error('Brief download failed');
    await page.screenshot({path:`C:/Users/Reetam/AppData/Local/Temp/opencode/sitecraft-captures/final-${width}.png`});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    console.log(JSON.stringify({width,overflow,errors,products:6,filter:'passed',cart:'passed',brief:'passed'}));
    if (overflow||errors.length) throw Error('Browser checks failed');
    await page.close();
  }
} finally {
  await browser?.close();
  await server.close();
}
