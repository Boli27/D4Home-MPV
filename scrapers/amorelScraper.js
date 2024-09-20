const puppeteer = require('puppeteer');

const scrapeAmorel = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navegar a la página de arriendos con mayor tiempo de espera
        await page.goto('https://amorelpasto.com/clasificados/web/app.php/resultados/Finca%20Raiz/Apartamentos%20Arriendo', { waitUntil: 'networkidle0' });
        // await page.screenshot({ path: 'amorel.png', fullPage: true });
        // Aumentar el tiempo de espera para el selector
        const properties = await page.evaluate(() => {
            const data = [];
            const elements = document.querySelectorAll('.item-list');

            elements.forEach(element => {
                const priceText = element.querySelector('.item-price')?.innerText.trim() || '';
                const city = "Pasto";
                // Convertir el precio a número
                const price = parseFloat(priceText.replace(/[^0-9]/g, '')); // Eliminar caracteres no numéricos y convertir a número

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
        console.error('Error al hacer scraping en Amorel:', error);
    }
};

module.exports = scrapeAmorel;
