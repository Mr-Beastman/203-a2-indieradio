import React from 'react';
import './AudioPlayer.css';

export default function AudioPlayer({streamUrl, streamLogo}) {

  return (
    <div className="audioPlayer">
      <div className="leftColumn">
        <img src={streamLogo} alt="playingLogo" className="stationLogo" />
      </div>
      <div className="rightColumn">
        <h2>Station Name</h2>
        <h2>Station Tag</h2>

        {/* conditonal check to handle rendering before variable ready */}
        {streamUrl ? (
        <audio controls preload='auto'>
          <source src={streamUrl} type="audio/mpeg" />
        </audio>
        ) : (
          <p>Loading Stream</p>
        )}
        <h3>Now Playing</h3>
      </div>
    </div>
  );
}
