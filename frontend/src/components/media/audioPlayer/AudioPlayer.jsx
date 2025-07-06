import { React, useEffect, useState }  from 'react';
import useGetCurrentSong from '../../../hooks/useGetCurrentSong';
import './AudioPlayerStyle.css';


export default function AudioPlayer({stationId, showLogo = true, showName = true, showTag = true, showPlayer =true, showSong = true, showBio = false}) {
  // retrieve station data
  const [stationData, setStationData] = useState({});
  useEffect(() => {
    if (stationId) {
      fetch(`http://localhost:5001/station/${stationId}`)
        .then(response => response.json())
        .then(data => setStationData(data))
        .catch(err => console.error("Couldn't fetch station data", err));
    }
  }, [stationId]);

  // set current song if applicable
  const nowPlaying = useGetCurrentSong(stationData.streamUrl)

  // visual elements
  return (
    <div className="audioPlayer">
      <div className="topContent">
        {showLogo &&
        <div className="leftColumn">
           <img src={stationData.logo} alt="playingLogo" className="stationLogo" />
        </div>
        }
        <div className="rightColumn">

          <div className="titleTag">
            {/* diplay only if params are true */}
            {showName && <h2>{stationData.channelName}</h2> }
            {showTag && <p>{stationData.tag}</p> }
          </div>

          {/* display only if showPlayer true */}
          {showPlayer && (
            stationData.live ? (
              stationData.streamUrl ? (
                <>
                  <audio controls preload='auto' className='audioControls'>
                    <source src={stationData.streamUrl} type="audio/mpeg" />
                  </audio>
                </>
              ) : (
                <p>Loading Stream</p>
              )
            ) : (
              <div className="notLive">
                <h2>Stream not live</h2>
              </div>
            )
          )}
          {/* display only if showSong true */}
          {showSong && (
            <div className="playingInfo">
              <h3>Now Playing</h3>
              <p>{nowPlaying ? nowPlaying : "No song info provided"}</p>
            </div>
          )}
        
        </div>
      </div>
      
      {/* display only if showBio true */}
      <div className="botContent">
          { showBio && (<p>{stationData.bio}</p>)}
      </div>
    </div>
  );
}
