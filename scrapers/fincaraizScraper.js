const puppeteer = require('puppeteer');

const scrapeFincaRaiz = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.fincaraiz.com.co/arriendo', { waitUntil: 'networkidle0' });
    
    const properties = await page.evaluate(() => {
        const data = [];
        const elements = document.querySelectorAll('.listingCard');
        elements.forEach(element => {
            const priceText = element.querySelector('.price')?.innerText.trim() || '';
            const location = element.querySelector('.lc-location')?.innerText.trim() || '';
            const parts = location.split(', ');
            const city = parts.length >= 2 ? parts[1] : '';
            const price = parseFloat(priceText.replace(/[^0-9]/g, ''));
            if (price!=0 && city) {
                data.push({ price, city })
            };
        });
        return data;
    });
    
    await browser.close();
    return properties;
};

module.exports = scrapeFincaRaiz;
