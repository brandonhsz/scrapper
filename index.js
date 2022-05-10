
const puppeteer = require('puppeteer');


const scrapper = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 720});
    await page.goto('http://osticket.sto.com.mx/osTicket/upload/scp/login.php');

    await page.type('#name', "");
    await page.type('#pass', "");

    await Promise.all([
        page.click('.submit'),
        page.waitForNavigation(),
      ]);

    await page.screenshot({ path: 'example.png' });
  
    await browser.close();
}

//login()
scrapper()
