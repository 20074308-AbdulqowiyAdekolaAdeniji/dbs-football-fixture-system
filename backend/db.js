// Database connection helper
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use absolute path for production
const dbPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, 'football-fixtures.db')
  : path.join(__dirname, 'football-fixtures.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    console.log('📁 Database path:', dbPath);
  }
});

// Export database connection
module.exports = db;