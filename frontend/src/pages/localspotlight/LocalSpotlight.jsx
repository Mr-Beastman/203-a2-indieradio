import {React, useState, useEffect } from 'react';

import './LocalSpotlight.css';
import DjGrid from '../../components/artistGrid/ArtistGrid';

export default function LocalSpotlight() {
  
  // pulling current artsits from database
  const[currentArtists, setcurrentArtists] = useState([])

  useEffect(() => {
     fetch('http://localhost:5001/artist/getArtists')
    .then(response => response.json())
    .then(data => setcurrentArtists(data))
    .catch(err => console.error("Issue fetching stations", err));
  }, []);

  console.log({currentArtists})
  return (
    <div className="localSpotlight">
      <DjGrid displayName='All Artists' djList={currentArtists}/>
    </div>
  );
}
