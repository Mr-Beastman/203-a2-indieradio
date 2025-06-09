import {React, useState, useEffect } from 'react';

import './ArtistSpotlightStyle.css';
import DjGrid from '../../components/browsers/artist/artistGrid/ArtistGrid';

export default function ArtistSpotlight() {
  
  // text variables
  const pageIntro = 'Amazing artists from the stations you love!'
  const displayTitle = 'All Artists'


  // pulling current artsits from database
  const[currentArtists, setcurrentArtists] = useState([])

  useEffect(() => {
     fetch('http://localhost:5001/artist/getArtists')
    .then(response => response.json())
    .then(data => setcurrentArtists(data))
    .catch(err => console.error("Issue fetching stations", err));
  }, []);

  // visual elements
  return (
    <div className="localSpotlight">
      <div className="pageIntro">
        <h1>{pageIntro}</h1>
      </div>
      <div className="allGrid">
        <DjGrid displayName={displayTitle} djList={currentArtists}/>
      </div>
    </div>
  );
}
