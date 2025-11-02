// Simple script to test database queries
const sqlite3 = require('sqlite3').verbose();

// Connect to database
const db = new sqlite3.Database('./football-fixtures.db');

console.log('📊 Testing Database Queries\n');

// Query 1: Get all fixtures
console.log('--- All Fixtures ---');
db.all('SELECT * FROM fixtures', [], (err, rows) => {
    if (err) {
        console.error('Error:', err.message);
        return;
    }
    
    rows.forEach((row) => {
        console.log(`${row.id}. ${row.opposition} - ${row.match_date} at ${row.match_time}`);
        console.log(`   Venue: ${row.venue}`);
        console.log(`   Status: ${row.status} | Type: ${row.competition_type}\n`);
    });
    
    console.log(`Total fixtures: ${rows.length}\n`);
});

// Query 2: Get only scheduled fixtures
db.all('SELECT * FROM fixtures WHERE status = "scheduled"', [], (err, rows) => {
    if (err) {
        console.error('Error:', err.message);
        return;
    }
    
    console.log('--- Upcoming Fixtures ---');
    rows.forEach((row) => {
        console.log(`- ${row.opposition} on ${row.match_date}`);
    });
});

// Query 3: Get matches in November only
db.all('SELECT * FROM fixtures WHERE match_date LIKE "2025-11%"', [], (err, rows) => {
    if (err) {
        console.error('Error:', err.message);
        return;
    }
    
    console.log('\n--- November Fixtures ---');
    rows.forEach((row) => {
        console.log(`- ${row.opposition} on ${row.match_date}`);
    });
});

// Close connection
db.close();