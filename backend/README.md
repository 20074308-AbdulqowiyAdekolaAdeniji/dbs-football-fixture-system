# Backend - DBS Football Fixture System

## Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Middleware:** CORS, body-parser

---

## Project Structure
```
backend/
├── server.js              # Main server file
├── routes/                # API route definitions
│   └── fixtures.js        # Fixture endpoints
├── controllers/           # Business logic
│   └── fixtureController.js
├── database-schema.sql    # Database schema
├── setup-database.js      # DB initialization
├── test-database.js       # DB test queries
├── football-fixtures.db   # SQLite database
└── package.json           # Dependencies
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database
```bash
node setup-database.js
```

### 3. Start Server
```bash
npm start
```

Server will run on `http://localhost:3000`

---

## API Endpoints

### Base URL
`http://localhost:3000/api`

### Fixtures

#### Get All Fixtures
```
GET /api/fixtures
```

**Response:**
```json
[
  {
    "id": 1,
    "opposition": "UCD",
    "match_date": "2025-11-15",
    "match_time": "19:00",
    "venue": "Belfield Sports Ground",
    "status": "scheduled",
    "competition_type": "League"
  }
]
```

#### Get Single Fixture
```
GET /api/fixtures/:id
```

#### Create Fixture
```
POST /api/fixtures
Content-Type: application/json

{
  "opposition": "UCD",
  "match_date": "2025-11-15",
  "match_time": "19:00",
  "venue": "Belfield Sports Ground",
  "competition_type": "League"
}
```

#### Update Fixture
```
PUT /api/fixtures/:id
Content-Type: application/json

{
  "opposition": "UCD Updated",
  "match_date": "2025-11-16"
}
```

#### Delete Fixture
```
DELETE /api/fixtures/:id
```

---

## Testing

### Test Server is Running
```bash
curl http://localhost:3000/
```

### Test Health Endpoint
```bash
curl http://localhost:3000/api/health
```

---

## Database

### Schema
See `database-schema.sql` for complete schema.

### Sample Data
5 fixtures pre-loaded:
1. UCD - League
2. Trinity College - League
3. DCU - Cup
4. IT Tallaght - League
5. Maynooth University - Friendly

---

## Development

### Start Development Server
```bash
npm run dev
```

### View Database
Use DB Browser for SQLite or:
```bash
node test-database.js
```

---

## Next Steps
- [ ] Implement fixture routes
- [ ] Create controllers with CRUD logic
- [ ] Connect to frontend
- [ ] Add validation
- [ ] Write tests