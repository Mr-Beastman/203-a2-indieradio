import React, { useState, useRef, useEffect } from 'react';
import { useShows } from '../../hooks/useShows';
import './AudioPlayer.css';

export default function AudioPlayer() {
  const { currentShow } = useShows();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="audio-player">
      {currentShow ? (
        <>
          <div className="show-info">
            <h3>{currentShow.title}</h3>
            <p>with {currentShow.dj_username}</p>
          </div>
          <div className="controls">
            <button onClick={togglePlay} className="play-button">
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div className="volume-control">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
          <audio
            ref={audioRef}
            src={currentShow.stream_url}
            onEnded={() => setIsPlaying(false)}
          />
        </>
      ) : (
        <div className="no-show">
          <p>No show is currently live</p>
        </div>
      )}
    </div>
  );
}
