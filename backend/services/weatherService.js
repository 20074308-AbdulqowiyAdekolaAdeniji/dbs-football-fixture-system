// Weather Service - OpenWeatherMap API Integration
const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get weather for a location
async function getWeather(location) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric' // Celsius
      }
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Weather API Error:', error.message);
    return {
      success: false,
      error: 'Failed to fetch weather data'
    };
  }
}

module.exports = { getWeather };