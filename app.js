const express = require('express');
const sequelize = require('./config/database');
const scrapingRoutes = require('./routes/scrapingRoutes');
const visualizationRoutes = require('./routes/verRoutes');

const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api', scrapingRoutes);
app.use('/api', visualizationRoutes);

// Sincronizar base de datos MySQL
sequelize.sync().then(() => {
    console.log('Base de datos MySQL sincronizada.');
}).catch(err => {
    console.error('Error al sincronizar la base de datos MySQL:', err);
});

// Iniciar servidor
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT} abrir: http://localhost:3000/api/ver`);
    });
  })
  .catch(error => console.error('Error al sincronizar la base de datos:', error));
