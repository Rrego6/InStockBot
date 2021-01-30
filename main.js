const puppeteer = require('puppeteer');

let url = 'https://www.newegg.com/amd-ryzen-9-5900x/p/N82E16819113664#';
const outOfStockDivSelector = 'div.product-wrap div.product-inventory';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  
  try {
    let outOfStockTextContent = await page.$eval(outOfStockDivSelector, el => el.textContext);
    if(outOfStockTextContent) {
        console.log(outOfStockTextContent);
    }
  } catch(e) {
        console.log('error!')
  }

  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
