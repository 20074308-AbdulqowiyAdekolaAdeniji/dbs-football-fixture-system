// Unit tests for fixture API endpoints
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const fixtureRoutes = require('../routes/fixtures');

// Create test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/fixtures', fixtureRoutes);

describe('Fixture API Endpoints', () => {
  
  // Test GET all fixtures
  test('GET /api/fixtures should return all fixtures', async () => {
    const response = await request(app).get('/api/fixtures');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

});