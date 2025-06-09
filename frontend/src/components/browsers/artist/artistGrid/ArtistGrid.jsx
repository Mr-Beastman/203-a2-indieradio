import { React, useState } from 'react';
import './ArtistGridStyle.css'

// import components
import ArtistOverlay from '../artistOverlay/ArtistOverlay';

export default function ArtistGrid({ displayName = "Artists", djList = [] }) {
  const [selectedArtist, setSelectedArtist] = useState(null)


  return (
    <>
    <div className="gridComponent">
      <h2 className="displayName">{displayName}</h2>
      <div className="gridDisplay">
        {djList.map(dj => (
          <div key={dj.id} className="card" onClick={() => setSelectedArtist(dj)}>
            <img src={dj.display} alt={dj.name} />
            <div className="cardContents">
              <h3>{dj.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>

    <ArtistOverlay artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
  </>
  );
}