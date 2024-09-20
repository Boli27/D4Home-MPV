const { Property } = require('../models/Property');
const moment = require('moment');

const getVisualizationData = async (req, res) => {
    try {
        const properties = await Property.findAll();

        // Crear un array de objetos con ciudad y precio
        const rentals = properties.map(p => ({
            city: p.city,
            price: p.price
        }));

        // Devolver los datos en formato JSON
        res.json(rentals);
    } catch (error) {
        res.status(500).send('Error fetching data: ' + error.message);
    }
};

module.exports = { getVisualizationData };
