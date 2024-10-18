import React, { useState } from 'react';
import axios from 'axios';

const Kundli = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your actual API key
  const API_KEY = 'b2cc7e3a-bff1-5455-aa0d-10194b005082';
  // Replace with your actual API endpoint if different
  const API_URL = 'https://app.vedicastroapi.com/dashboard'; 

  const fetchKundliData = async (birthDetails) => {
    try {
      const response = await axios.post(API_URL, {
        params: {
          key: API_KEY,
          ...birthDetails
        }
      });
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch Kundli data');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const birthDetails = {
      name: e.target.name.value,
      dob: e.target.dob.value,
      time: e.target.time.value,
      place: e.target.place.value
    };
    fetchKundliData(birthDetails);
  };

  return (
    <div>
      <h1>Kundli Builder</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dob" required />
        </div>
        <div>
          <label>Time of Birth:</label>
          <input type="time" name="time" required />
        </div>
        <div>
          <label>Place of Birth:</label>
          <input type="text" name="place" required />
        </div>
        <button type="submit">Generate Kundli</button>
      </form>

      {data && (
        <div>
          <h2>Kundli Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Kundli;
