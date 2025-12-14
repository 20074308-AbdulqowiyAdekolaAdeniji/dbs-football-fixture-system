# DBS Football Fixture Management System

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tests](https://img.shields.io/badge/Tests-10%20Passing-brightgreen)
![Commits](https://img.shields.io/badge/Commits-100%2B-blue)

**Live Application:** [https://dbs-football-fixtures.netlify.app](https://dbs-football-fixtures.netlify.app)
**Requirement Specification:** [https://docs.google.com/document/d/118S8r6Teu9A87EKdZkcFwhAulvkk9nqm--q4GVgw58o/edit?usp=sharing](https://docs.google.com/document/d/118S8r6Teu9A87EKdZkcFwhAulvkk9nqm--q4GVgw58o/edit?usp=sharing)

**Claude AI Doc:** [https://claude.ai/share/298f1f63-8872-4b54-9e75-519e79b29afc](https://claude.ai/share/298f1f63-8872-4b54-9e75-519e79b29afc)
**Gemini Doc:** [https://gemini.google.com/share/95f913bdb0c2](https://gemini.google.com/share/95f913bdb0c2)
**ChatGPT Doc:** [https://chatgpt.com/share/693eabc4-f688-8001-bbca-e27d6afa9411](https://chatgpt.com/share/693eabc4-f688-8001-bbca-e27d6afa9411)

**Express Tutorial:** [https://www.youtube.com/watch?v=CnH3kAXSrmU](https://www.youtube.com/watch?v=CnH3kAXSrmU)
**OpenWeatherMap API Tutorial:** [https://www.youtube.com/watch?v=MnpLJCuvUuk](https://www.youtube.com/watch?v=MnpLJCuvUuk)

---

## 📋 Project Information

**Student Name:** Abdulqowiy Adekola Adeniji  
**Student Number:** 20074308  
**Programme:** MSc Information Systems with Computing  
**Module:** B9IS123 - Programming for Information Systems  
**Lecturer:** Paul Laird  
**Submission Date:** 14 December 2025

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation & Setup](#installation--setup)
5. [API Documentation](#api-documentation)
6. [Deployment](#deployment)
7. [Attribution & Sources](#attribution--sources)

---

## 🎯 Overview

The DBS Football Fixture Management System is a full-stack web application designed to streamline match scheduling, team coordination, and fixture management for Dublin Business School's football team. The system implements complete CRUD operations through an API-first architecture, integrates external weather data for match planning, and provides an intuitive user interface for managing fixtures.

---

## ✨ Features

### Core Functionality (CRUD Operations)

- ✅ **Create Fixtures:** Add new matches with date, time, venue, and competition type
- ✅ **Read Fixtures:** View all fixtures with filtering by competition type
- ✅ **Update Fixtures:** Edit match details via intuitive form interface
- ✅ **Delete Fixtures:** Remove fixtures with confirmation dialog

### Additional Features

- 🌤️ **Weather Integration:** Real-time weather forecasts for match venues
- ⚠️ **Smart Alerts:** Warnings for adverse weather conditions (cold, rain, wind)
- 🎨 **Professional Design:** Sporting Lagos-inspired color scheme and UI
- 🔍 **Filtering System:** Filter fixtures by competition type (League, Cup, Friendly)
- ✅ **Form Validation:** Client and server-side validation for data integrity
- 📱 **Responsive Design:** Works on desktop and mobile devices
- 🔄 **Live Updates:** No page reloads - dynamic content updates

### Technical Features

- 🧪 **Comprehensive Testing:** Automated tests (9 unit + 1 integration)
- 🌍 **Cloud Deployment:** Live on Netlify (frontend) and Render (backend)
- 🔐 **Environment Variables:** Secure API key management
- 📊 **Error Handling:** Graceful error messages and user feedback
- 🔄 **RESTful API:** Standard HTTP methods and status codes

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 with Vite
- **Language:** JavaScript (ES6+)
- **Styling:** Custom CSS3
- **HTTP Client:** Fetch API
- **Deployment:** Netlify

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Middleware:** CORS, body-parser
- **Deployment:** Render.com

### External Services
- **Weather API:** OpenWeatherMap (free tier)
- **Testing:** Jest + Supertest

### Development Tools
- **Version Control:** Git + GitHub
- **Package Manager:** npm
- **Environment:** dotenv for configuration

---

## 💻 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Local Development Setup

**1. Clone Repository**
```bash
git clone https://github.com/20074308-AbdulqowiyAdekolaAdeniji/dbs-football-fixture-system.git
cd dbs-football-fixture-system
```

**2. Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```
OPENWEATHER_API_KEY=your_api_key_here
PORT=3000
```

Initialize database:
```bash
node setup-database.js
```

Start backend:
```bash
npm start
```

Backend runs on: `http://localhost:3000`

**3. Frontend Setup**

In a new terminal:
```bash
cd frontend
npm install
```

Create `.env.development`:
```
VITE_API_URL=http://localhost:3000
```

Start frontend:
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📡 API Documentation

### Base URL (Local)
```
http://localhost:3000/api
```

### Base URL (Production)
```
https://dbs-football-backend.onrender.com/api
```

### Endpoints

#### Fixtures

**GET /api/fixtures**
- Returns all fixtures
- Response: `{ success: true, count: number, data: [...] }`

**GET /api/fixtures/:id**
- Returns single fixture
- Response: `{ success: true, data: {...} }`
- Error: `404` if not found

**POST /api/fixtures**
- Creates new fixture
- Body: `{ opposition, match_date, match_time, venue, competition_type?, notes? }`
- Response: `{ success: true, message, data: {...} }`
- Error: `400` if validation fails

**PUT /api/fixtures/:id**
- Updates existing fixture
- Body: Same as POST
- Response: `{ success: true, message, data: {...} }`
- Error: `404` if not found

**DELETE /api/fixtures/:id**
- Deletes fixture
- Response: `{ success: true, message }`
- Error: `404` if not found

#### Weather

**GET /api/weather?location=Dublin**
- Returns weather forecast for location
- Response: `{ success: true, weather: {...}, alerts: [...] }`
- Error: `500` if API call fails

---

## 🌍 Deployment

### Live URLs

**Frontend:** https://dbs-football-fixtures.netlify.app  
**Backend API:** https://dbs-football-backend.onrender.com/

### Deployment Platforms

**Frontend (Netlify)**
- Automatic deployment from GitHub
- Environment variable: `VITE_API_URL`
- Build command: `npm run build`
- Publish directory: `frontend/dist`

**Backend (Render)**
- Automatic deployment from GitHub
- Environment variables: `OPENWEATHER_API_KEY`, `NODE_ENV`
- Start command: `npm start`
- Database: Persistent SQLite file

---

## 📚 Attribution & Sources

### AI Assistance

**Tools Used:** Claude AI (Anthropic), ChatGPT (OpenAI), Gemini (Google)

**How AI Was Used:**
- Code templates and patterns (Express routing, React hooks)
- Debugging assistance and error resolution
- Concept explanations (async/await, API design)
- Documentation templates

### External Libraries

**Backend:**
- `express` (v4.18+) - MIT License - Web framework
- `sqlite3` (v5.1+) - BSD License - Database driver
- `cors` (v2.8+) - MIT License - CORS middleware
- `axios` (v1.6+) - MIT License - HTTP client
- `dotenv` (v16.3+) - BSD License - Environment variables
- `jest` (v29+) - MIT License - Testing framework
- `supertest` (v6+) - MIT License - HTTP testing

**Frontend:**
- `react` (v18+) - MIT License - UI framework
- `react-dom` (v18+) - MIT License - React renderer
- `vite` (v5+) - MIT License - Build tool

### External APIs

**OpenWeatherMap API**
- Documentation: https://openweathermap.org/api
- Free tier: 1000 calls/day
- Used for: Weather forecasts and alerts

### Documentation Sources

- Express.js official documentation
- React official documentation
- SQLite documentation
- MDN Web Docs (JavaScript/HTTP)
- Jest testing documentation
- Vite documentation
- Render deployment guides
- Netlify deployment guides

### Student's Original Work

**Architecture & Design:**
- Database schema design
- API endpoint structure
- Component organization
- UI/UX design and styling choice

**Business Logic:**
- Weather alert thresholds and rules
- Fixture validation logic
- Form submission handling
- Error handling strategies

**Integration:**
- Frontend-backend communication
- State management patterns
- Event-driven updates
- Deployment configuration

**Testing:**
- Test case design
- Integration test scenarios
- Manual testing procedures

---

## 🏆 Project Achievements

- ✅ Complete CRUD operations (Create, Read, Update, Delete)
- ✅ Automated tests (100% passing)
- ✅ External API integration with business logic (OpenWeatherMap API)
- ✅ Professional UI/UX design with the aid of Claude AI
- ✅ Live cloud deployment
- ✅ API-first architecture
- ✅ Comprehensive documentation
- ✅ 100+ meaningful git commits
- ✅ Proper attribution and academic integrity

---

**Built with 💪 by Abdulqowiy Adeniji**  
**Dublin Business School - 2025**