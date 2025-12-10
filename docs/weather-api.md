# Weather API Integration

## Overview
Integrated OpenWeatherMap API to provide weather forecasts for match venues, helping team managers plan for match conditions.

---

## Implementation

### API Source
- **Service:** OpenWeatherMap API
- **Documentation:** https://openweathermap.org/api
- **Plan:** Free tier (1000 calls/day)

### Technology
- **HTTP Client:** Axios
- **Environment:** dotenv for API key security
- **Custom Logic:** Weather alerts based on conditions

---

## Business Logic

### Weather Alerts

**Cold Warning (< 5°C):**
- ⚠️ "Very cold conditions expected. Ensure players dress warmly."

**Rain Warning:**
- 🌧️ "Rain expected. Bring extra towels and consider pitch conditions."

**Wind Alert (> 10 m/s):**
- 💨 "Strong winds expected. May affect gameplay."

**Heat Advisory (> 25°C):**
- ☀️ "Hot weather. Ensure adequate hydration for players."

---

## Features

### Backend
- Weather service with error handling
- Location-based weather queries
- Alert generation based on conditions
- RESTful API endpoint: `/api/weather?location=Dublin`

### Frontend
- Weather check button on each fixture
- Temperature and condition display
- Visual alerts for adverse conditions
- Color-coded warning system

---

## Testing

**Manual Testing:**
- ✅ Weather fetches correctly for various locations
- ✅ Alerts display for cold weather
- ✅ Alerts display for rain
- ✅ Error handling works for invalid locations

**Locations Tested:**
- Dublin, Ireland
- Waterford, Ireland
- Galway, Ireland

---

## Future Enhancements

- Forecast API for future match dates
- Automatic weather check on fixture creation
- Historical weather data
- Weather-based match rescheduling suggestions

---

## Attribution

**Sources:**
- OpenWeatherMap API documentation
- Axios HTTP library documentation
- Styling generated using Claude AI
- Generated documentation using API

**My Original Work:**
- Alert logic and thresholds
- Frontend integration