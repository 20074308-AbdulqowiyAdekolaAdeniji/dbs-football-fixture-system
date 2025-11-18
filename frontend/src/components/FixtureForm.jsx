import { useState } from 'react';
import './FixtureForm.css';

function FixtureForm() {
  // State to store the opposition team name
  const [opposition, setOpposition] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [venue, setVenue] = useState('');

  return (
    <div className="fixture-form">
      <h2>Add New Fixture</h2>
      <form>
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
      </form>
    </div>
  );
}

export default FixtureForm;