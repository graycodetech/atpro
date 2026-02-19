const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///home/jules/index.html');

  // Click Customer Mgmt (L1)
  await page.click('text=Customer Mgmt');
  // Click Customers (L2)
  await page.click('text=Customers');

  await page.screenshot({ path: '/home/jules/verification/sidebar_3levels.png' });

  await browser.close();
})();
