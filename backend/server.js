// DBS Football Fixture Management System
// Backend API Server

// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import database connection

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;  // Made it dynamic

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON bodies

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Import routes
const fixtureRoutes = require('./routes/fixtures');
const weatherRoutes = require('./routes/weather');

// Use routes
app.use('/api/fixtures', fixtureRoutes);
app.use('/api/weather', weatherRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'DBS Football Fixture API',
    status: 'Server is running!',
    version: '1.0.0'
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API ready at http://localhost:${PORT}/api`);
});