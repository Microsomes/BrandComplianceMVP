
//[] for the home page
const extractPhoneDetailsCatelogPage = async (page) => {
    return await page.evaluate(()=>{
        const phones = [];
        document.querySelectorAll('.phone-card').forEach(phone => {
            const name = phone.querySelector('h2').innerText;
            const img = phone.querySelector('img').src;
            const price = phone.querySelector('.phone-price-price').innerText
            const term = phone.querySelector('.PhoneCardMonthlyPrice__FadedText-sc-qkdig5-0').innerText
            phones.push({name,img,price,term, condition:"new"});
        });
        return phones;
    });
}


module.exports = {
    extractPhoneDetailsCatelogPage
}