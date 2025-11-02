# Backend - DBS Football Fixture System

## Database Setup

### Technology
- **Database**: SQLite3
- **Database File**: `football-fixtures.db`
- **Node Package**: sqlite3

### Database Schema

#### Fixtures Table
Stores all match information including:
- Match details (date, time, venue, opposition)
- Results (scores when match is completed)
- Status tracking (scheduled/completed/cancelled)
- Competition type (League/Cup/Friendly)

#### Sample Data
5 sample fixtures have been pre-loaded for testing purposes.

### Setup Instructions

1. Install dependencies:
```
   npm install
```

2. Create database and tables:
```
   node setup-database.js
```

3. Test database queries:
```
   node test-database.js
```

### Files
- `database-schema.sql` - SQL schema definition
- `setup-database.js` - Database initialization script
- `test-database.js` - Query testing script
- `football-fixtures.db` - SQLite database file (not in git)

### Next Steps
- Create Express API server
- Implement CRUD endpoints
- Connect frontend to backend