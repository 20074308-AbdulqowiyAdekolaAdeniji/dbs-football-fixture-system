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
        units: 'metric'
      }
    });

    const weatherData = response.data;
    
    // Extract relevant info
    const weather = {
      temperature: Math.round(weatherData.main.temp),
      condition: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed
    };

    // Business Logic: Generate alerts
    const alerts = [];
    
    if (weather.temperature < 5) {
      alerts.push({
        type: 'warning',
        message: '⚠️ Very cold conditions expected. Ensure players dress warmly.'
      });
    }
    
    if (weather.condition === 'Rain' || weather.description.includes('rain')) {
      alerts.push({
        type: 'warning',
        message: '🌧️ Rain expected. Bring extra towels and consider pitch conditions.'
      });
    }
    
    if (weather.windSpeed > 10) {
      alerts.push({
        type: 'info',
        message: '💨 Strong winds expected. May affect gameplay.'
      });
    }
    
    if (weather.temperature > 25) {
      alerts.push({
        type: 'info',
        message: '☀️ Hot weather. Ensure adequate hydration for players.'
      });
    }

    return {
      success: true,
      location: location,
      weather: weather,
      alerts: alerts
    };
  } catch (error) {
    console.error('Weather API Error:', error.message);
    return {
      success: false,
      error: 'Failed to fetch weather data'
    };
  }
}

// Get weather forecast for match day
async function getMatchDayWeather(venue, matchDate) {
  // For simplicity, getting current weather
  // In production, would use forecast API for future dates
  return await getWeather(venue);
}

module.exports = { 
  getWeather,
  getMatchDayWeather 
};