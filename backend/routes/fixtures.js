// Fixture Routes
// Defines API endpoints for fixtures

const express = require('express');
const router = express.Router();
const fixtureController = require('../controllers/fixtureController');

// GET /api/fixtures - Get all fixtures
router.get('/', fixtureController.getAllFixtures);

// GET /api/fixtures/:id - Get single fixture
router.get('/:id', fixtureController.getFixtureById);

// POST /api/fixtures - Create new fixture
router.post('/', fixtureController.createFixture);

// PUT /api/fixtures/:id - Update fixture
router.put('/:id', fixtureController.updateFixture);

// DELETE /api/fixtures/:id - Delete fixture
router.delete('/:id', fixtureController.deleteFixture);

module.exports = router;