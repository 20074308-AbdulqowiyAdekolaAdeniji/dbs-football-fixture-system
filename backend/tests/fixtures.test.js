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
  
  let createdFixtureId;

  // TEST 1: GET all fixtures
  test('GET /api/fixtures should return all fixtures', async () => {
    const response = await request(app).get('/api/fixtures');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  // TEST 2: GET single fixture (valid ID)
  test('GET /api/fixtures/:id should return single fixture', async () => {
    const response = await request(app).get('/api/fixtures/1');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('opposition');
  });

  // TEST 3: GET single fixture (invalid ID)
  test('GET /api/fixtures/:id should return 404 for non-existent fixture', async () => {
    const response = await request(app).get('/api/fixtures/9999');
    
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  // TEST 4: POST create fixture (valid data)
  test('POST /api/fixtures should create new fixture with valid data', async () => {
    const newFixture = {
      opposition: 'Test Team',
      match_date: '2025-12-25',
      match_time: '15:00',
      venue: 'Test Stadium',
      competition_type: 'Friendly'
    };

    const response = await request(app)
      .post('/api/fixtures')
      .send(newFixture);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    
    // Save ID for later tests
    createdFixtureId = response.body.data.id;
  });

  // TEST 5: POST create fixture (missing required fields)
  test('POST /api/fixtures should return 400 for missing required fields', async () => {
    const invalidFixture = {
      opposition: 'Test Team'
      // Missing required fields
    };

    const response = await request(app)
      .post('/api/fixtures')
      .send(invalidFixture);
    
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  // TEST 6: PUT update fixture (valid data)
  test('PUT /api/fixtures/:id should update existing fixture', async () => {
    const updateData = {
      opposition: 'Updated Test Team',
      match_date: '2025-12-26',
      match_time: '16:00',
      venue: 'Updated Stadium',
      competition_type: 'League'
    };

    const response = await request(app)
      .put('/api/fixtures/1')
      .send(updateData);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // TEST 7: PUT update fixture (non-existent ID)
  test('PUT /api/fixtures/:id should return 404 for non-existent fixture', async () => {
    const updateData = {
      opposition: 'Test',
      match_date: '2025-12-26',
      match_time: '16:00',
      venue: 'Test Stadium',
      competition_type: 'League'
    };

    const response = await request(app)
      .put('/api/fixtures/9999')
      .send(updateData);
    
    expect(response.statusCode).toBe(404);
  });

  // TEST 8: DELETE fixture (valid ID)
  test('DELETE /api/fixtures/:id should delete existing fixture', async () => {
    // Use the fixture we created earlier
    if (createdFixtureId) {
      const response = await request(app).delete(`/api/fixtures/${createdFixtureId}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    }
  });

  // TEST 9: DELETE fixture (non-existent ID)
  test('DELETE /api/fixtures/:id should return 404 for non-existent fixture', async () => {
    const response = await request(app).delete('/api/fixtures/9999');
    
    expect(response.statusCode).toBe(404);
  });

});