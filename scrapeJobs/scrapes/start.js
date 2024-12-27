const { BrowserScraper } = require("./utills/scraper");
const {

    extractPhoneDetailsCatelogPage

} = require("./extractors/gifffgaff_phonedetails")

const {
    giffgaffAcceptCookies
} = require("./behaviors/acceptCookies")

const giffgaff = new BrowserScraper(
    "https://www.giffgaff.com/mobile-phones",
    "giffgaff",
    "phone",
    ".cbot-btn__switch",
    [giffgaffAcceptCookies],
    [extractPhoneDetailsCatelogPage],
)

giffgaff.scrape().then(()=>{
    giffgaff.save();
})  