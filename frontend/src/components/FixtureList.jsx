import { useState, useEffect } from 'react';
import './FixtureList.css';

function FixtureList() {
  // State for fixtures (will be loaded from API)
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [weatherData, setWeatherData] = useState({});

   // Define API_URL once for the whole component
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch fixtures from backend API when component loads
  useEffect(() => {
    fetchFixtures();

    // Listen for fixture updates
    const handleFixtureUpdate = () => {
      fetchFixtures();
    };
    
    window.addEventListener('fixtureUpdated', handleFixtureUpdate);
    
    // Cleanup
    return () => {
      window.removeEventListener('fixtureUpdated', handleFixtureUpdate);
    };
  }, []);

  const fetchFixtures = async () => {
    try {
      const response = await fetch(`${API_URL}/api/fixtures`);
      const data = await response.json();
      
      if (data.success) {
        setFixtures(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching fixtures:', error);
      setLoading(false);
    }
  };

   // Fetch weather for a venue
  const fetchWeather = async (venue, fixtureId) => {
    try {
      // Extract city from venue (simple approach)
      const location = venue.split(' ')[0]; // i.e. "Belfield Sports Ground" → "Belfield"
      
      const response = await fetch(`${API_URL}/api/weather?location=${location}`);
      const data = await response.json();
      
      if (data.success) {
        setWeatherData(prev => ({
          ...prev,
          [fixtureId]: data
        }));
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleEdit = (fixture) => {
    // Call the global editFixture function in FixtureForm
    if (window.editFixture) {
      window.editFixture(fixture);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fixture?')) {
      try {
        const response = await fetch(`${API_URL}/api/fixtures/${id}`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        console.log('Delete response:', data);
        
        if (data.success) {
          // Remove from UI
          setFixtures(fixtures.filter(fixture => fixture.id !== id));
          console.log(`Fixture ${id} deleted successfully`);
        } else {
          alert('Failed to delete: ' + (data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting fixture:', error);
        alert('Could not connect to server. Please check backend is running.');
      }
    }
  };
  // Filter fixtures based on competition type
  const filteredFixtures = filterType === 'All' 
    ? fixtures 
    : fixtures.filter(f => f.competition_type === filterType);

  // Show loading message while fetching
  if (loading) {
    return (
      <div className="fixture-list">
        <h2>Loading fixtures...</h2>
      </div>
    );
  }

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

      <div className="fixture-summary">
        <p>Showing <strong>{filteredFixtures.length}</strong> of <strong>{fixtures.length}</strong> fixtures</p>
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

                {/* Weather Info */}
                {weatherData[fixture.id] ? (
                  <div className="weather-info">
                    <strong>Weather:</strong>
                    <span>
                      {weatherData[fixture.id].weather.temperature}°C - {weatherData[fixture.id].weather.description}
                      {weatherData[fixture.id].alerts.length > 0 && (
                        <div className="weather-alerts">
                          {weatherData[fixture.id].alerts.map((alert, idx) => (
                            <div key={idx} className={`alert alert-${alert.type}`}>
                              {alert.message}
                            </div>
                          ))}
                        </div>
                      )}
                    </span>
                  </div>
                ) : (
                  <button 
                    className="btn-weather"
                    onClick={() => fetchWeather(fixture.venue, fixture.id)}
                  >
                    🌤️ Check Weather
                  </button>
                )}

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