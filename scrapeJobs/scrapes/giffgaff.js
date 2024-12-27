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
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // browserWSEndpoint: 'wss://brd-customer-hl_a55a480a-zone-scraping_browser1:cni5swxj8kop@brd.superproxy.io:9222'
    });

    const page = await browser.newPage();

    // Navigate to the target page
    await page.goto('https://www.giffgaff.com/mobile-phones/apple/iphone-12/phone-plans', { waitUntil: 'networkidle2' });

    // Accept cookies
    await page.waitForSelector('.cbot-btn__switch', { timeout: 5000 });
    await page.click('.cbot-btn__switch');

    // Interact with the checkbox
    await page.waitForSelector('.gg-c-checkbox__pseudo-checkbox', { timeout: 5000 });
    await page.evaluate(() => {
        document.querySelectorAll(".gg-c-checkbox__pseudo-checkbox")[2].click();
    });


    //.phone-card

    await page.waitForSelector('.phone-card', { timeout: 5000 });

    const phones = await extractPhoneDetailsCatelogPage(page);

    fs.writeFileSync("giffgaff2.json", JSON.stringify(phones, null, 2));

    // Wait for actions to take effect
    await sleep(5000);

    // Take a screenshot
    await page.screenshot({ path: 'giffgaff.png', fullPage: true });

    // Close browser
    await browser.close();
};

giffgaff();
