import React from 'react';
// import './ArtistOverlayStyle.css';

export default function ArtistOverlay({ artist, onClose }) {
  if (!artist) return null;

  return (
    <div className="artistOverlay" onClick={onClose}>
      <div className="overlayContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>×</button>
        <img src={artist.display} alt={artist.name} className="overlayImage" />
        <h2>{artist.name}</h2>
        <p>{artist.bio}</p>

        {artist.demo && (
          <iframe
            width="100%"
            height="315"
            src={artist.demoVideo}
            title="Demo Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
