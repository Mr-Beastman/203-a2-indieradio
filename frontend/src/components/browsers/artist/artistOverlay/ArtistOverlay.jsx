import React from 'react';
import './ArtistOverlayStyle.css';
import YoutubePlayer from '../../../media/youtubePlayer/YoutubePlayer'

export default function ArtistOverlay({ artist, onClose }) {
  if (!artist) return null;

  return (
    <div className="artistOverlay" onClick={onClose}>
      <div className="overlayContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>×</button>
        <img src={artist.display} alt={artist.name} className="overlayImage" />
        <h2>{artist.name}</h2>
        <p>{artist.bio}</p>
        <h2>See them in action!</h2>
        <YoutubePlayer url={artist.demo}/>
      </div>
    </div>
  );
}
