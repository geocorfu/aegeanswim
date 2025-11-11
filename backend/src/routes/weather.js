const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get weather forecast for specific location
router.get('/forecast', weatherController.getWeatherForecast);

// Get beach recommendations based on weather
router.get('/recommendations', weatherController.getBeachRecommendations);

module.exports = router;
