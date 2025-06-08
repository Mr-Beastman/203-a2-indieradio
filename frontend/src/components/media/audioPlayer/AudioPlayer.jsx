import React from 'react';
import './AudioPlayer.css';

import { CiHeart } from "react-icons/ci";


export default function AudioPlayer({streamUrl, streamLogo, streamBio, showName = true, showTag = true, showBio = false}) {

  return (
    <div className="audioPlayer">
      <div className="topContent">
        <div className="leftColumn">
          <img src={streamLogo} alt="playingLogo" className="stationLogo" />
        </div>
        <div className="rightColumn">

          {/* diplay only if params are true */}
          {showName && <h2>Station Name</h2> }
          {showTag && <h2>Station Tag</h2> }


          {/* conditonal check to handle rendering before the stream is ready */}
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
      
      {/* display only if showBio true */}
      <div className="botContent">
          { showBio && (<p>{streamBio}</p>)}
          <CiHeart />
      </div>
    </div>
  );
}
