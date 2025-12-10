// Weather Routes
const express = require('express');
const router = express.Router();
const { getWeather, getMatchDayWeather } = require('../services/weatherService');

// GET /api/weather?location=Dublin
router.get('/', async (req, res) => {
  const { location } = req.query;
  
  if (!location) {
    return res.status(400).json({
      error: 'Location parameter is required',
      example: '/api/weather?location=Dublin'
    });
  }
  
  const result = await getWeather(location);
  
  if (result.success) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

module.exports = router;