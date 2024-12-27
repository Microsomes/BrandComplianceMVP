
const giffgaffAcceptCookies = async (page) => {

    
   
    await page.waitForSelector('.gg-c-checkbox__pseudo-checkbox', { timeout: 5000 });
    await page.evaluate(() => {
        document.querySelectorAll(".gg-c-checkbox__pseudo-checkbox")[2].click();
    });

    console.log("Cookies accepted");

    return true;

}

module.exports = {
    giffgaffAcceptCookies
}