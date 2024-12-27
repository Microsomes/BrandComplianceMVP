
const fs = require("fs");
const moment = require("moment");
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');


puppeteer.use(StealthPlugin());


// Helper function to sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


class BrowserScraper {

    constructor(url,vendor,type,waitfor,behaviours,handlers){
        this.url = url;
        this.vendor = vendor;
        this.type = type;
        this.waitfor = waitfor;
        this.behaviours = behaviours;
        this.handler = handlers;


        this.result = [];
    }

    async scrape(){
        console.log("Scraping", this.vendor, this.type,this.url);
        const browser = await puppeteer.launch({
            headless: false,
            // args: ['--no-sandbox', '--disable-setuid-sandbox'],
            // browserWSEndpoint: 'wss://brd-customer-hl_a55a480a-zone-scraping_browser1:cni5swxj8kop@brd.superproxy.io:9222'
        });
        
        const page = await browser.newPage();
        
        await page.goto(this.url,{
             waitUntil: 'networkidle2'
        });


        for (let i = 0; i < this.behaviours.length; i++) {
            await this.behaviours[i](page);
            await sleep(5000);
        }



        await page.waitForSelector(this.waitfor);

        await page.screenshot({ path: 'giffgaff4.png', fullPage: true });


        // const data = await this.handler(page);


        // this.result = data;

        // await browser.close();
        // return data;
    }

    async save(){
        fs.writeFileSync(`${this.vendor}_${this.type}_${moment().format("YYYYMMDD")}.json`, JSON.stringify(this.result, null, 2));
    }

}

module.exports ={
    BrowserScraper
}