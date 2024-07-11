import React, { useEffect } from 'react'

export default function Test1() {
  
    const getMusic = async () => {
        const url = 'https://spotify23.p.rapidapi.com/search/?type=multi&offset=0&limit=10&numberOfTopResults=5';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '668e4e6125msh357dbbbdac4c743p14a163jsn6293b4349ba7',
		'x-rapidapi-host': 'spotify23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}
    }

    
    // <div>test</div>
    getMusic();
  
}
