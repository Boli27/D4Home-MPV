const express = require('express');
const { scrapeAndSave } = require('../controllers/scrapingController');
const router = express.Router();

router.get('/scrape', scrapeAndSave);

module.exports = router;
