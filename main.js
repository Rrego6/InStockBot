const puppeteer = require('puppeteer');

let url = 'https://www.newegg.com/amd-ryzen-9-5900x/p/N82E16819113664#';
const outOfStockDivSelector = 'div.product-wrap div.product-inventory';
const titleSelector = 'div.product-main div.product-wrap h1.product-title';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  //get title
  try {
    let title = await page.$eval(
      titleSelector,
      (el) => {
        return el.textContent;
      }
    );
    if(title) {
      title = title.trim();
      console.log(title);
    }
  }
  catch(e) {
        console.log('error with retrieving title!')
  }
  
  try {
    let outOfStockTextContent = await page.$eval(
      outOfStockDivSelector,
      (el) => {
        return el.textContent;
      }
    );
    if(outOfStockTextContent) {
      outOfStockTextContent = outOfStockTextContent.trim();
      console.log(outOfStockTextContent);
    }
  } catch(e) {
        console.log('error!')
  }

  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
