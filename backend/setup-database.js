// Import sqlite3 library
const sqlite3 = require('sqlite3').verbose();

// Create/connect to database file
const db = new sqlite3.Database('./football-fixtures.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('✓ Connected to database successfully');
    }
});

// Read the schema file
const fs = require('fs');
const schema = fs.readFileSync('./database-schema.sql', 'utf8');

// Create tables
db.exec(schema, (err) => {
    if (err) {
        console.error('Error creating tables:', err.message);
    } else {
        console.log('✓ Tables created successfully');
    }
});

// Insert sample fixtures
const sampleFixtures = [
    ['UCD', '2025-11-15', '19:00', 'Belfield Sports Ground', null, null, 'scheduled', 'League', 'Opening match of season'],
    ['Trinity College', '2025-11-22', '15:00', 'College Park', null, null, 'scheduled', 'League', null],
    ['DCU', '2025-11-29', '19:30', 'DCU Sports Complex', null, null, 'scheduled', 'Cup', 'Quarter final'],
    ['IT Tallaght', '2025-12-06', '18:00', 'DBS Sports Ground', null, null, 'scheduled', 'League', null],
    ['Maynooth University', '2025-12-13', '14:00', 'Maynooth Campus', null, null, 'scheduled', 'Friendly', 'Pre-Christmas friendly']
];

const insertSQL = `INSERT INTO fixtures (opposition, match_date, match_time, venue, home_score, away_score, status, competition_type, notes) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

// Insert each fixture
sampleFixtures.forEach((fixture) => {
    db.run(insertSQL, fixture, (err) => {
        if (err) {
            console.error('Error inserting fixture:', err.message);
        }
    });
});

// Close database connection after all operations
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('✓ Database setup complete! 5 sample fixtures added.');
    }
});