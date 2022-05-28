
import puppeteer from "puppeteer";
import { ILogin } from "../interfaces/Login.interface";


export const scrapper = async (data: ILogin): Promise<any> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 720 });
    await page.goto('http://osticket.sto.com.mx/osTicket/upload/scp/login.php');

    await page.type('#name', data.name);
    await page.type('#pass', data.pass);

    await Promise.all([
        page.click('.submit'),
        page.waitForNavigation(),
    ]).catch(e => {
        console.log(`Error en login \n user: ${data.name} \n pass: ${data.pass}`)
    })

    const elements = await (await page.evaluate(() => Array.from(document.querySelectorAll("tr"), element => element.innerText)))
    const element = elements.slice(1, elements.length - 1)

    //await page.screenshot({ path: `C:\Users\soporte.escorza\Music\pro\scrapper\Images` });

    await browser.close();

    return element
}

