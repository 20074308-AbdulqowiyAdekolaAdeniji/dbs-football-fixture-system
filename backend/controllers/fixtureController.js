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

// Create new fixture (we'll implement this next session)
const createFixture = (req, res) => {
  res.status(501).json({ message: 'Create fixture - coming soon!' });
};

// Update fixture (we'll implement this next session)
const updateFixture = (req, res) => {
  res.status(501).json({ message: 'Update fixture - coming soon!' });
};

// Delete fixture (we'll implement this next session)
const deleteFixture = (req, res) => {
  res.status(501).json({ message: 'Delete fixture - coming soon!' });
};

// Export all controller functions
module.exports = {
  getAllFixtures,
  getFixtureById,
  createFixture,
  updateFixture,
  deleteFixture
};