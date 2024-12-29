const puppeteer = require('puppeteer-core');

const SBR_WS_ENDPOINT = 'wss://brd-customer-hl_a55a480a-zone-scraping_browser2:iwjt3mng1k6f@brd.superproxy.io:9222'

async function main() {
    console.log('Connecting to Scraping Browser...');
    const browser = await puppeteer.connect({
        browserWSEndpoint: SBR_WS_ENDPOINT,
    });
    try {
        const page = await browser.newPage();
        console.log('Connected! Navigating to https://www.carphonewarehouse.com/samsung-galaxy-s24-ultra-256gb-titanium-violet/deals...');
        await page.goto('https://www.carphonewarehouse.com/samsung-galaxy-s24-ultra-256gb-titanium-violet/deals');
        // CAPTCHA handling: If you're expecting a CAPTCHA on the target page, use the following code snippet to check the status of Scraping Browser's automatic CAPTCHA solver
        // const client = await page.createCDPSession();
        // console.log('Waiting captcha to solve...');
        // const { status } = await client.send('Captcha.waitForSolve', {
        //     detectTimeout: 10000,
        // });
        // console.log('Captcha solve status:', status);
        console.log('Navigated! Scraping page content...');
        const html = await page.content();
        await page.screenshot({
            path: 'screenshot2.png',
            fullPage: true,
        })
        console.log(html)
    } finally {
        await browser.close();
    }
}

main().catch(err => {
    console.error(err.stack || err);
    process.exit(1);
});