const { Property } = require('../models/Property');

const getVisualizationData = async (req, res) => {
    try {
        const properties = await Property.findAll();

        // Crear un array de objetos con ciudad, precio, habitaciones y source
        const rentals = properties.map(p => ({
            city: p.city,
            price: p.price,
            habs: p.habs, // Cambié 'habs' a 'rooms' para mayor claridad en la API
            source: p.source // Agregamos la fuente
        }));

        // Devolver los datos en formato JSON
        res.json(rentals);
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
};

module.exports = { getVisualizationData };

