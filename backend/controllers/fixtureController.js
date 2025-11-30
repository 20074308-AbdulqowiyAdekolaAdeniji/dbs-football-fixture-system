// Fixture Controller
// Handles all fixture-related business logic

const db = require('../db');

// Get all fixtures
const getAllFixtures = (req, res) => {
  const sql = 'SELECT * FROM fixtures ORDER BY match_date, match_time';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching fixtures:', err.message);
      return res.status(500).json({ error: 'Failed to fetch fixtures' });
    }
    
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  });
};

// Get single fixture by ID
const getFixtureById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM fixtures WHERE id = ?';
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Error fetching fixture:', err.message);
      return res.status(500).json({ error: 'Failed to fetch fixture' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Fixture not found' });
    }
    
    res.json({
      success: true,
      data: row
    });
  });
};

// Create new fixture
const createFixture = (req, res) => {
  const { opposition, match_date, match_time, venue, competition_type, notes } = req.body;
  
  // Validation
  if (!opposition || !match_date || !match_time || !venue) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['opposition', 'match_date', 'match_time', 'venue']
    });
  }
  
  // SQL Insert statement
  const sql = `INSERT INTO fixtures (opposition, match_date, match_time, venue, competition_type, notes, status) 
               VALUES (?, ?, ?, ?, ?, ?, 'scheduled')`;
  
  const values = [
    opposition, 
    match_date, 
    match_time, 
    venue, 
    competition_type || 'League',  // Default to League if not provided
    notes || null
  ];
  
  db.run(sql, values, function(err) {
    if (err) {
      console.error('Error creating fixture:', err.message);
      return res.status(500).json({ 
        error: 'Failed to create fixture',
        details: err.message 
      });
    }
    
    // Return the newly created fixture
    res.status(201).json({
      success: true,
      message: 'Fixture created successfully',
      data: {
        id: this.lastID,
        opposition,
        match_date,
        match_time,
        venue,
        competition_type: competition_type || 'League',
        notes,
        status: 'scheduled'
      }
    });
  });
};

// Update fixture
const updateFixture = (req, res) => {
  res.status(501).json({ message: 'Update fixture - coming soon!' });
};

// Delete fixture
const deleteFixture = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM fixtures WHERE id = ?';
  
  db.run(sql, [id], function(err) {
    if (err) {
      console.error('Error deleting fixture:', err.message);
      return res.status(500).json({ 
        error: 'Failed to delete fixture',
        details: err.message 
      });
    }
    
    res.json({
      success: true,
      message: 'Fixture deleted successfully',
      id: parseInt(id)
    });
  });
};

// Export all controller functions
module.exports = {
  getAllFixtures,
  getFixtureById,
  createFixture,
  updateFixture,
  deleteFixture
};