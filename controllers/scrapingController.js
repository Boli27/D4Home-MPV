const {Property} = require('../models/Property');
const scrapeFincaRaiz = require('../scrapers/fincaraizScraper');
const scrapeAmorel = require('../scrapers/amorelScraper');
const scrapeCienCuadras = require('../scrapers/ciencuadrasScraper');

const scrapeAndSave = async (req, res) => {
    try {
        // Scraping Finca Raíz
        const fincaRaizData = await scrapeFincaRaiz();
        await Promise.all(fincaRaizData.map(async (property) => {
            // Verificar si ya existe una propiedad con la misma ciudad y precio
            const existingProperty = await Property.findOne({ where: { city: property.city, price: property.price, habs: property.habs, source: 'Finca Raíz' } });
            if (!existingProperty) {
                await Property.create({ ...property, source: 'Finca Raíz' });
            }
        }));

        // Scraping Amorel
        const amorelData = await scrapeAmorel();
        await Promise.all(amorelData.map(async (property) => {
            const existingProperty = await Property.findOne({ where: { city: property.city, price: property.price, source: 'Amorel' } });
            if (!existingProperty) {
                await Property.create({ ...property, source: 'Amorel' });
            }
        }));

        // Scraping Cien Cuadras
        const cienCuadrasData = await scrapeCienCuadras();
        await Promise.all(cienCuadrasData.map(async (property) => {
            const existingProperty = await Property.findOne({ where: { city: property.city, price: property.price, habs: property.habs, source: 'Cien Cuadras' } });
            if (!existingProperty) {
                await Property.create({ ...property, source: 'Cien Cuadras' });
            }
        }));

        res.status(200).send("Scraping and saving completed.");
    } catch (error) {
        console.error('Error scraping and saving:', error);
        res.status(500).send("Error during scraping and saving.");
    }
};

module.exports = { scrapeAndSave };
