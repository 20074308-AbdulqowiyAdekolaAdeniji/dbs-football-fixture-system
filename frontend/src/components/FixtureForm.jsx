import { useState } from 'react';

function FixtureForm() {
  // State to store the opposition team name
  const [opposition, setOpposition] = useState('');

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
      </form>
    </div>
  );
}

export default FixtureForm;