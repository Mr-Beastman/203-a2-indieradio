import React, { useState, useRef, useEffect } from 'react';
import { useShows } from '../../hooks/useShows';
import { useAuth } from '../../context/UserContext';
import './AudioPlayer.css';

export default function AudioPlayer() {
  const { currentShow } = useShows();
  const { user } = useAuth();

  console.log('AudioPlayer currentShow:', currentShow);
  console.log('AudioPlayer stream_url:', currentShow?.stream_url);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Maximum number of reconnection attempts
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_INTERVAL = 5000; // 5 seconds
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  // Function to check stream availability
  const checkStreamAvailability = async (url) => {
    try {
      const response = await fetch(url, { 
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      // Accept any successful response from Icecast
      if (response.ok || response.status === 200) {
        console.log('Stream check response:', response);
        console.log('Content-Type:', response.headers.get('content-type'));
        return { available: true, url };
      }
      throw new Error('Stream not available or invalid content type');
    } catch (error) {
      console.error('Stream check failed:', error);
      return { available: false, url };
    }
  };

  useEffect(() => {
    let reconnectTimer;

    const initializeStream = async () => {
      if (!currentShow?.stream_url) return;

      setErrorMessage(null);
      setIsLoading(true);
      setReconnectAttempts(0);

      try {
        const { available, url } = await checkStreamAvailability(currentShow.stream_url);
        if (!available) {
          throw new Error('Stream unavailable');
        }

        if (audioRef.current) {
          audioRef.current.src = url;
          await audioRef.current.load();
        }
      } catch (error) {
        console.error('Stream initialization failed:', error);
        setErrorMessage('Stream is currently offline. Please try again later.');
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    };

    const attemptReconnect = async () => {
      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        setErrorMessage('Unable to reconnect to stream after multiple attempts. Please try again later.');
        return;
      }

      console.log(`Reconnection attempt ${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS}`);
      setReconnectAttempts(prev => prev + 1);

      try {
        const { available, url } = await checkStreamAvailability(currentShow.stream_url);
        if (available && audioRef.current) {
          setErrorMessage(null);
          audioRef.current.src = url;
          await audioRef.current.load();
          if (isPlaying) {
            await audioRef.current.play();
          }
          setReconnectAttempts(0);
          return true;
        }
      } catch (error) {
        console.error('Reconnection attempt failed:', error);
      }
      return false;
    };

    initializeStream();

    // Set up reconnection attempts if there's an error
    if (errorMessage && currentShow?.stream_url) {
      reconnectTimer = setInterval(async () => {
        const success = await attemptReconnect();
        if (success) {
          clearInterval(reconnectTimer);
        }
      }, RECONNECT_INTERVAL);
    }

    return () => {
      if (reconnectTimer) {
        clearInterval(reconnectTimer);
      }
    };
  }, [currentShow?.stream_url, errorMessage, isPlaying, reconnectAttempts]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        const { available, url } = await checkStreamAvailability(currentShow.stream_url);
        if (!available) {
          throw new Error('Stream not available');
        }
        
        audioRef.current.src = url;
        await audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error('Playback failed:', error);
      setErrorMessage('Unable to play stream. Please try again.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
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
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="show-info">
            <h3>{currentShow.title}</h3>
            <p>with {currentShow.dj_username}</p>
          </div>
          <div className="controls">
            <button 
              onClick={togglePlay} 
              className={`play-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading || isBuffering ? '⏳' : isPlaying ? '⏸' : '▶'}
            </button>
            <div className="volume-control">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>
          </div>
          <audio
            ref={audioRef}
            crossOrigin="anonymous"
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => {
              setIsLoading(false);
              setIsBuffering(false);
            }}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
            onEnded={() => setIsPlaying(false)}
            onError={(e) => {
              console.error('Audio playback error:', e);
              console.log('Stream URL:', currentShow.stream_url);
              console.log('Audio element state:', audioRef.current?.error);
              setErrorMessage('Error playing audio stream. The stream may be unavailable or in an unsupported format.');
              setIsPlaying(false);
              setIsLoading(false);
              setIsBuffering(false);
            }}
          />
          {user?.role === 'dj' && currentShow?.dj_id === user.id && (
            <div className="dj-controls">
              <p className="live-indicator">LIVE</p>
            </div>
          )}
        </>
      ) : (
        <div className="no-show">
          <p>No show is currently live</p>
        </div>
      )}
    </div>
  );
}
