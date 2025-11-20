import { useState } from 'react';
import './FixtureList.css';

function FixtureList() {
  // Hardcoded fixtures for now (will connect to API later)
  // Hardcoded Data was generated using ChatGPT to avoid time wasting
  const [fixtures, setFixtures] = useState([
    {
      id: 1,
      opposition: 'UCD',
      match_date: '2025-11-15',
      match_time: '19:00',
      venue: 'Belfield Sports Ground',
      status: 'scheduled',
      competition_type: 'League'
    },
    {
      id: 2,
      opposition: 'Trinity College',
      match_date: '2025-11-22',
      match_time: '15:00',
      venue: 'College Park',
      status: 'scheduled',
      competition_type: 'League'
    },
    {
      id: 3,
      opposition: 'DCU',
      match_date: '2025-11-29',
      match_time: '19:30',
      venue: 'DCU Sports Complex',
      status: 'scheduled',
      competition_type: 'Cup'
    },
    {
      id: 4,
      opposition: 'IT Tallaght',
      match_date: '2025-12-06',
      match_time: '18:00',
      venue: 'DBS Sports Ground',
      status: 'scheduled',
      competition_type: 'League'
    },
    {
      id: 5,
      opposition: 'Maynooth University',
      match_date: '2025-12-13',
      match_time: '14:00',
      venue: 'Maynooth Campus',
      status: 'scheduled',
      competition_type: 'Friendly'
    }
  ]);

  return (
    <div className="fixture-list">
      <h2>Upcoming Fixtures</h2>
      <p>Total fixtures: {fixtures.length}</p>
    </div>
  );
}

export default FixtureList;