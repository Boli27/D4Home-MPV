const express = require('express');
const { getVisualizationData } = require('../controllers/vistaController');
const router = express.Router();

router.get('/ver', getVisualizationData);

module.exports = router;
