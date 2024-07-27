import React, { useState } from 'react';
import axios from 'axios';

const FetchLyrics = ({ artist, song }) => {
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');

  const fetchLyrics = async () => {
    

const options = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/search/',
  params: {
    q: 'shiva',
    type: 'track',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5'
  },
  headers: {
    'x-rapidapi-key': '668e4e6125msh357dbbbdac4c743p14a163jsn6293b4349ba7',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com'
  }
};


try {
	const response = await axios.request(options);
	console.log(response.data.tracks);
} catch (error) {
	console.error(error);
}
  };


const fetch2 = async() =>{



  const option2 = {
    method: 'GET',
    url: 'https://spotify23.p.rapidapi.com/track_lyrics/',
    params: {
      id: '5klXT8EMMeQtlOkhpcXJmn'
    },
    headers: {
      'x-rapidapi-key': '668e4e6125msh357dbbbdac4c743p14a163jsn6293b4349ba7',
      'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
  };
  
  try {
      const response = await axios.request();
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }
}

  return (
    <div>
      <button
        className="bg-white text-black rounded-full p-4 font-semibold"
        onClick={fetchLyrics}
      >
        Get Lyrics
      </button>
      {lyrics && <pre>{lyrics}</pre>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FetchLyrics;
