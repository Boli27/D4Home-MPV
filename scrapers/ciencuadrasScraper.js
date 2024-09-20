const puppeteer = require('puppeteer');

const scrapeCc = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.ciencuadras.com/arriendo', { waitUntil: 'networkidle0' });
        const properties = await page.evaluate(() => {
            const data = [];
            const elements = document.querySelectorAll('.card');
            elements.forEach(element => {
                const priceText = element.querySelector('.card__price-big')?.innerText.trim() || '';
                const city = element.querySelector('.city')?.innerText.trim() || '';
                const price = parseFloat(priceText.replace(/[^0-9]/g, '')); 
                if (price!=0 && city) {
                    data.push({ price, city });
                }
            });
            return data;
        });
        await browser.close();
        console.log(properties);
        return properties;
    } catch (error) {
        console.error('Error al hacer scraping en CienCuadras:', error);
    }
};

module.exports = scrapeCc;
