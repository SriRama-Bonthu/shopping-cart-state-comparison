const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Usage: node capture-render-counts.js <url> <name>
// Example: node capture-render-counts.js http://localhost:5173 context-naive

(async () => {
  const url = process.argv[2];
  const name = process.argv[3] || 'run';
  if (!url) {
    console.error('Usage: node capture-render-counts.js <url> <name>');
    process.exit(1);
  }

  const outDir = path.join(__dirname, 'results');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const screenshotsDir = path.join(outDir, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    // wait for product button
    await page.waitForSelector('.product-card button', { timeout: 10000 });

    for (let i = 0; i < 10; i++) {
      await page.click('.product-card button');
      await page.waitForTimeout(150);
    }

    const counts = await page.$$eval('[data-testid="render-count"]', els => els.map(e => e.textContent.trim()));
    const screenshotPath = path.join(screenshotsDir, `${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const result = { url, name, timestamp: new Date().toISOString(), renderCounts: counts };
    const outPath = path.join(outDir, `${name}.json`);
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2));

    console.log('Saved:', outPath);
    console.log('Screenshot:', screenshotPath);
    console.log('Render counts:', counts);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();
