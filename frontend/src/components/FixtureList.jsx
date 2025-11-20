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
      
      {fixtures.length === 0 ? (
        <div className="empty-state">
          <h3>No fixtures scheduled</h3>
          <p>Create your first fixture using the form above!</p>
        </div>
      ) : (
        <div className="fixtures-container">
          {fixtures.map((fixture) => (
            <div key={fixture.id} className="fixture-card">
              <div className="fixture-header">
                <h3 className="fixture-opposition">{fixture.opposition}</h3>
                <span className="fixture-type">{fixture.competition_type}</span>
              </div>

              <div className="fixture-datetime">
                <div className="fixture-date">
                  📅 {new Date(fixture.match_date).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                <div className="fixture-time">
                  🕐 {fixture.match_time}
                </div>
              </div>

              <div className="fixture-details">
                <div className="fixture-detail">
                  <strong>Venue:</strong>
                  <span>{fixture.venue}</span>
                </div>
                <div className="fixture-detail">
                  <strong>Status:</strong>
                  <span className={`status-badge status-${fixture.status}`}>
                    {fixture.status}
                  </span>
                </div>
              </div>

              <div className="fixture-actions">
                <button className="btn-edit">Edit</button>
                <button className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FixtureList;