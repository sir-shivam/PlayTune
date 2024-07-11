import React, { useState, useEffect } from 'react';

function MyMusicSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const url = 'https://spotify23.p.rapidapi.com/search/?type=multi&offset=0&limit=10&numberOfTopResults=5';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'YOUR_API_KEY', // Replace with your actual key
      'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setSearchResults(data);
        
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  // ... rest of your component logic to display search results or handle errors

  return (
    <div>
      {/* Display search results or error message here */}
    </div>
  );
}

export default MyMusicSearch;
