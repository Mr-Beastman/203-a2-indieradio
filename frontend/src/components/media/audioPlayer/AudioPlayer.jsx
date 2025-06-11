import { React, useEffect, useState }  from 'react';
import useGetCurrentSong from '../../../hooks/useGetCurrentSong';
import './AudioPlayerStyle.css';

// 
export default function AudioPlayer({stationId, showName = true, showTag = true, showBio = false}) {
  const [stationData, setStationData] = useState({});
  const nowPlaying = useGetCurrentSong(stationData.streamUrl)

    useEffect(() => {
      if (stationId) {
        fetch(`http://localhost:5001/station/${stationId}`)
          .then(response => response.json())
          .then(data => setStationData(data))
          .catch(err => console.error("Couldn't fetch station data", err));
      }
    }, [stationId]);

  return (
    <div className="audioPlayer">
      <div className="topContent">
        <div className="leftColumn">
          <img src={stationData.logo} alt="playingLogo" className="stationLogo" />
        </div>
        <div className="rightColumn">

          {/* diplay only if params are true */}
          {showName && <h2>{stationData.channelName}</h2> }
          {showTag && <h2>{stationData.tagLine}</h2> }


          {/* conditonal check to handle rendering before the stream is ready */}
          {stationData.live ? (
            stationData.streamUrl ? (
              <>
                <audio controls preload='auto'>
                  <source src={stationData.streamUrl} type="audio/mpeg" />
                </audio>

                <h3>Now Playing</h3>
                <h3>{nowPlaying ? nowPlaying : "No song info provided"}</h3>
              </>
            ) : (
              <p>Loading Stream</p>
            )
          ) : (
            <div className="notLive">
              <h2>Stream not live</h2>
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
