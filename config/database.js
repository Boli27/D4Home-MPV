const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME || 'ScrapingWeb', process.env.DB_USER||'root', process.env.DB_PASS||'', {
  host: process.env.DB_HOST||'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
