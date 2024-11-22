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
                const price = parseFloat(priceText.replace(/[^0-9]/g, '')); 
                const location = element.querySelector('.card__location-label')?.innerText.trim() || '';
                const partsLocation = location.split(', ');
                const city = partsLocation.length >= 2 ? partsLocation[0] : '';

                // Buscar el <span> con información de habitaciones dentro del <p>
                const roomsSpan = Array.from(element.querySelectorAll('.ng-star-inserted span')).find(span => {
                    return span.innerText.includes('Habit.');
                });
                
                // Extraer las habitaciones (si existe)
                const roomsText = roomsSpan ? roomsSpan.innerText : '';
                console.log(roomsText ," " ,roomsSpan)
                const habs = parseInt(roomsText.replace(/[^0-9]/g, '')) || 0; // Extraer número
                if (price!=0 && city) {
                    data.push({ price, city, habs });
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
