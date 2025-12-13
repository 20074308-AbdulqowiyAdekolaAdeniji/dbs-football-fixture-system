// DBS Football Fixture Management System
// Backend API Server

// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import database connection
const fs = require('fs');

// Auto-initialize database if empty (for deployment)
db.get('SELECT COUNT(*) as count FROM fixtures', [], (err, row) => {
  if (err || row.count === 0) {
    console.log('📊 Database is empty, initializing with sample data...');
    
    // Read and execute schema
    const schema = fs.readFileSync('./database-schema.sql', 'utf8');
    db.exec(schema, (err) => {
      if (err) {
        console.error('Error creating tables:', err);
      } else {
        console.log('✅ Tables created');
        
        // Insert sample data
        const sampleFixtures = [
          ['UCD', '2025-11-15', '19:00', 'Belfield Sports Ground', null, null, 'scheduled', 'League', 'Opening match'],
          ['Trinity College', '2025-11-22', '15:00', 'College Park', null, null, 'scheduled', 'League', null],
          ['DCU', '2025-11-29', '19:30', 'DCU Sports Complex', null, null, 'scheduled', 'Cup', 'Quarter final'],
          ['IT Tallaght', '2025-12-06', '18:00', 'DBS Sports Ground', null, null, 'scheduled', 'League', null],
          ['Maynooth University', '2025-12-13', '14:00', 'Maynooth Campus', null, null, 'scheduled', 'Friendly', null]
        ];

        const insertSQL = `INSERT INTO fixtures (opposition, match_date, match_time, venue, home_score, away_score, status, competition_type, notes) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        sampleFixtures.forEach((fixture) => {
          db.run(insertSQL, fixture, (err) => {
            if (err) console.error('Error inserting:', err);
          });
        });
        
        console.log('✅ Sample data loaded');
      }
    });
  } else {
    console.log('✅ Database already initialized with', row.count, 'fixtures');
  }
});

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