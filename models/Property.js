const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    source: { // De dónde viene el dato (Finca Raíz, Amorel, etc.)
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    habs: { // Cantidad de habitaciones
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
});

module.exports = {Property};
