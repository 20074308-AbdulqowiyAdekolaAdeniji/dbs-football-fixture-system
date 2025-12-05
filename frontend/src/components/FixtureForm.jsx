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

  //Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for API
    const fixtureData = {
      opposition,
      match_date: matchDate,
      match_time: matchTime,
      venue,
      competition_type: competitionType
    };

    try {
      // Send POST request to backend API
      const response = await fetch('http://localhost:3000/api/fixtures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fixtureData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Fixture created:', data);
        
        // Show success message
        setShowSuccess(true);
        
        // Clear form
        setOpposition('');
        setMatchDate('');
        setMatchTime('');
        setVenue('');
        setCompetitionType('League');
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        console.error('Error:', data);
        alert('Failed to create fixture: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Could not connect to server. Make sure backend is running!');
    }
  };

  return (
    <div className="fixture-form">
      <h2>Add New Fixture</h2>
      
      {showSuccess && (
        <div className="success-message">
          ✅ Fixture created successfully!
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
          Create Fixture
        </button>
      </form>
    </div>
  );
}

export default FixtureForm;