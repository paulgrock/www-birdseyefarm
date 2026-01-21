import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  await page.goto('http://localhost:4321');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Get image srcset attributes
  const imageSrcsets = await page.$$eval('img', imgs =>
    imgs.map(img => ({
      alt: img.alt,
      src: img.currentSrc || img.src,
      srcset: img.srcset,
      sizes: img.sizes,
      displayWidth: img.width,
      displayHeight: img.height
    }))
  );

  console.log('\n=== IMAGE SRCSET ANALYSIS ===\n');
  imageSrcsets.forEach((img, index) => {
    console.log(`Image ${index + 1}: ${img.alt}`);
    console.log(`  Display Size: ${img.displayWidth}x${img.displayHeight}px`);
    console.log(`  Current Src: ${img.src}`);
    if (img.srcset) {
      console.log(`  Srcset: ${img.srcset}`);
      console.log(`  Sizes: ${img.sizes}`);
    } else {
      console.log(`  ⚠️  No srcset attribute`);
    }
    console.log('');
  });

  await browser.close();
})();
