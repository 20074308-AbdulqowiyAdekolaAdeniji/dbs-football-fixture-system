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
  const [filterType, setFilterType] = useState('All');

  const handleEdit = (fixture) => {
    console.log('Edit fixture:', fixture);
    alert(`Edit functionality coming soon!\n\nFixture: ${fixture.opposition}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this fixture?')) {
      setFixtures(fixtures.filter(fixture => fixture.id !== id));
      console.log(`Fixture ${id} deleted`);
    }
  };

  // Filter fixtures based on competition type
  const filteredFixtures = filterType === 'All' 
    ? fixtures 
    : fixtures.filter(f => f.competition_type === filterType);

   return (
    <div className="fixture-list">
      <h2>Upcoming Fixtures</h2>
      
      <div className="filter-buttons">
        <button 
          className={filterType === 'All' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilterType('All')}
        >
          All ({fixtures.length})
        </button>
        <button 
          className={filterType === 'League' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilterType('League')}
        >
          League ({fixtures.filter(f => f.competition_type === 'League').length})
        </button>
        <button 
          className={filterType === 'Cup' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilterType('Cup')}
        >
          Cup ({fixtures.filter(f => f.competition_type === 'Cup').length})
        </button>
        <button 
          className={filterType === 'Friendly' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilterType('Friendly')}
        >
          Friendly ({fixtures.filter(f => f.competition_type === 'Friendly').length})
        </button>
      </div>
      
      {filteredFixtures.length === 0 ? (
        <div className="empty-state">
          <h3>No fixtures scheduled</h3>
          <p>Create your first fixture using the form above!</p>
        </div>
      ) : (
        <div className="fixtures-container">
          {filteredFixtures.map((fixture) => (
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
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(fixture)}
                >
                  Edit
                </button>

                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(fixture.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FixtureList;