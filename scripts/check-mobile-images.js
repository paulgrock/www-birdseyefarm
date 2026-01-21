import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE size
    deviceScaleFactor: 2 // Retina display
  });
  const page = await context.newPage();

  await page.goto('http://localhost:4321');
  await page.waitForLoadState('networkidle');

  // Wait a bit more for images to load
  await page.waitForTimeout(2000);

  // Take a screenshot of the page
  await page.screenshot({ path: 'mobile-view-full.png', fullPage: true });

  // Get all images on the page
  const images = await page.$$eval('img', imgs =>
    imgs.map(img => ({
      src: img.src,
      width: img.width,
      height: img.height,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      alt: img.alt,
      className: img.className,
      computedStyle: {
        width: window.getComputedStyle(img).width,
        height: window.getComputedStyle(img).height,
        objectFit: window.getComputedStyle(img).objectFit
      }
    }))
  );

  console.log('\n=== IMAGE ANALYSIS ===\n');
  images.forEach((img, index) => {
    console.log(`Image ${index + 1}:`);
    console.log(`  Source: ${img.src}`);
    console.log(`  Alt: ${img.alt}`);
    console.log(`  Display Size: ${img.width}x${img.height}`);
    console.log(`  Natural Size: ${img.naturalWidth}x${img.naturalHeight}`);
    console.log(`  Computed Style: ${img.computedStyle.width} x ${img.computedStyle.height}`);
    console.log(`  Object Fit: ${img.computedStyle.objectFit}`);

    // Check if image is being scaled down significantly
    const scaleRatio = img.naturalWidth / img.width;
    if (scaleRatio > 2) {
      console.log(`  ⚠️  Image is scaled down ${scaleRatio.toFixed(2)}x (good for retina)`);
    } else if (scaleRatio < 1) {
      console.log(`  ❌ Image is being UPSCALED (will look blurry!)`);
    } else {
      console.log(`  ⚠️  Image scale ratio: ${scaleRatio.toFixed(2)}x (may look blurry on retina)`);
    }
    console.log('');
  });

  await browser.close();
})();
