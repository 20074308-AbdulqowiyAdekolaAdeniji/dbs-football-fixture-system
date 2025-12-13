import { useState } from 'react';
import './FixtureForm.css';

function FixtureForm() {
  // State for all the form fields
  const [opposition, setOpposition] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [venue, setVenue] = useState('');
  const [competitionType, setCompetitionType] = useState('League');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Function to populate form with fixture data for editing
  window.editFixture = (fixture) => {
    setOpposition(fixture.opposition);
    setMatchDate(fixture.match_date);
    setMatchTime(fixture.match_time);
    setVenue(fixture.venue);
    setCompetitionType(fixture.competition_type);
    setEditMode(true);
    setEditingId(fixture.id);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  //Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fixtureData = {
      opposition,
      match_date: matchDate,
      match_time: matchTime,
      venue,
      competition_type: competitionType
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

      const url = editMode 
        ? `${API_URL}/api/fixtures/${editingId}`
        : `${API_URL}/api/fixtures`;
      
      const method = editMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fixtureData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log(editMode ? 'Fixture updated:' : 'Fixture created:', data);
        
        setShowSuccess(true);
        
        // Clear form and reset edit mode
        setOpposition('');
        setMatchDate('');
        setMatchTime('');
        setVenue('');
        setCompetitionType('League');
        setEditMode(false);
        setEditingId(null);

         // Trigger fixture list refresh via custom event
        window.dispatchEvent(new CustomEvent('fixtureUpdated'));
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        alert('Failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Could not connect to server!');
    }
  };

  return (
    <div className="fixture-form">
      <h2>{editMode ? 'Edit Fixture' : 'Add New Fixture'}</h2>
      
      {showSuccess && (
        <div className="success-message">
          ✅ Fixture {editMode ? 'updated' : 'created'} successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="opposition">Opposition Team:</label>
          <input
            type="text"
            id="opposition"
            value={opposition}
            onChange={(e) => setOpposition(e.target.value)}
            placeholder="e.g., UCD, Trinity College"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="matchDate">Match Date:</label>
          <input
            type="date"
            id="matchDate"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="matchTime">Match Time:</label>
          <input
            type="time"
            id="matchTime"
            value={matchTime}
            onChange={(e) => setMatchTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="e.g., DBS Sports Ground, Belfield"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="competitionType">Competition Type:</label>
          <select
            id="competitionType"
            value={competitionType}
            onChange={(e) => setCompetitionType(e.target.value)}
          >
            <option value="League">League</option>
            <option value="Cup">Cup</option>
            <option value="Friendly">Friendly</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          {editMode ? 'Update Fixture' : 'Create Fixture'}
        </button>
        
        {editMode && (
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => {
              setEditMode(false);
              setEditingId(null);
              setOpposition('');
              setMatchDate('');
              setMatchTime('');
              setVenue('');
              setCompetitionType('League');
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default FixtureForm;