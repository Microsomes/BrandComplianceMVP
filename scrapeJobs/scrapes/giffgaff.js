const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require("fs");
const { extractPhoneDetailsCatelogPage } = require("./extractors/gifffgaff_phonedetails")

// Add stealth plugin
puppeteer.use(StealthPlugin());

// Helper function to sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const giffgaff = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        browserWSEndpoint: 'wss://brd-customer-hl_a55a480a-zone-scraping_browser1:cni5swxj8kop@brd.superproxy.io:9222'
    });

    const page = await browser.newPage();

    // Navigate to the target page
    await page.goto('https://www.giffgaff.com/mobile-phones/', { waitUntil: 'networkidle2' });

    // Accept cookies
    await page.waitForSelector('.cbot-btn__switch', { timeout: 5000 });
    await page.click('.cbot-btn__switch');

    // Interact with the checkbox
    await page.waitForSelector('.gg-c-checkbox__pseudo-checkbox', { timeout: 5000 });
    await page.evaluate(() => {
        document.querySelectorAll(".gg-c-checkbox__pseudo-checkbox")[5].click();
    });

    await sleep(5000);


    //.phone-card

    await page.waitForSelector('.phone-card', { timeout: 5000 });

    const phones = await extractPhoneDetailsCatelogPage(page);

    console.log(phones);

    

    // Close browser
    await browser.close();
};

giffgaff();
