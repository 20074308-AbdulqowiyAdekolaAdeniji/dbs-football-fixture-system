// DBS Football Fixture Management System
// Backend API Server

const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import database connection

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON bodies

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API ready at http://localhost:${PORT}/api`);
});