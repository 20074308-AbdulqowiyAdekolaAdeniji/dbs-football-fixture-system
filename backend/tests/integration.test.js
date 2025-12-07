// Integration test - Complete flow from frontend to database
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const fixtureRoutes = require('../routes/fixtures');

// Create test app (simulates full backend)
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/fixtures', fixtureRoutes);

describe('Integration Test: Complete Fixture Lifecycle', () => {
  
  let testFixtureId;

  test('Complete CRUD flow: Create → Read → Update → Delete', async () => {
    
    // STEP 1: CREATE - User fills form and submits
    console.log('STEP 1: Creating fixture...');
    const newFixture = {
      opposition: 'Integration Test FC',
      match_date: '2025-12-30',
      match_time: '19:00',
      venue: 'Integration Test Stadium',
      competition_type: 'Friendly',
      notes: 'Integration test fixture'
    };

    const createResponse = await request(app)
      .post('/api/fixtures')
      .send(newFixture);

    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.body.success).toBe(true);
    expect(createResponse.body.data.opposition).toBe('Integration Test FC');
    
    testFixtureId = createResponse.body.data.id;
    console.log(`✓ Fixture created with ID: ${testFixtureId}`);

    // STEP 2: READ - Fixture appears in list
    console.log('STEP 2: Reading fixture from database...');
    const readResponse = await request(app)
      .get(`/api/fixtures/${testFixtureId}`);

    expect(readResponse.statusCode).toBe(200);
    expect(readResponse.body.success).toBe(true);
    expect(readResponse.body.data.id).toBe(testFixtureId);
    expect(readResponse.body.data.opposition).toBe('Integration Test FC');
    console.log('✓ Fixture read successfully');

    // STEP 3: UPDATE - User clicks edit and changes data
    console.log('STEP 3: Updating fixture...');
    const updateData = {
      opposition: 'Integration Test FC UPDATED',
      match_date: '2025-12-31',
      match_time: '20:00',
      venue: 'Updated Stadium',
      competition_type: 'League'
    };

    const updateResponse = await request(app)
      .put(`/api/fixtures/${testFixtureId}`)
      .send(updateData);

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.success).toBe(true);
    console.log('✓ Fixture updated successfully');

    // STEP 4: READ AGAIN - Verify update persisted
    console.log('STEP 4: Verifying update persisted...');
    const verifyResponse = await request(app)
      .get(`/api/fixtures/${testFixtureId}`);

    expect(verifyResponse.statusCode).toBe(200);
    expect(verifyResponse.body.data.opposition).toBe('Integration Test FC UPDATED');
    expect(verifyResponse.body.data.match_date).toBe('2025-12-31');
    console.log('✓ Update verified in database');

    // STEP 5: DELETE - User deletes fixture
    console.log('STEP 5: Deleting fixture...');
    const deleteResponse = await request(app)
      .delete(`/api/fixtures/${testFixtureId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.success).toBe(true);
    console.log('✓ Fixture deleted successfully');

    // STEP 6: VERIFY DELETION - Fixture should not exist
    console.log('STEP 6: Verifying deletion...');
    const verifyDeleteResponse = await request(app)
      .get(`/api/fixtures/${testFixtureId}`);

    expect(verifyDeleteResponse.statusCode).toBe(404);
    console.log('✓ Deletion verified - fixture no longer exists');

    console.log('\n🎉 INTEGRATION TEST COMPLETE - All steps passed!');
  });

});