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
            
            // Selección específica del <strong> que contiene "Habs"
            const roomsElement = Array.from(element.querySelectorAll('strong')).find(el => 
                el.innerText.includes('Habs')
            );
            const roomsText = roomsElement?.innerText.trim() || '';
            const habs = parseInt(roomsText.replace(/[^0-9]/g, '')) || 0;

            if (price!=0 && city) {
                data.push({ price, city, habs })
            };
        });
        return data;
    });
    
    await browser.close();
    return properties;
};

module.exports = scrapeFincaRaiz;
