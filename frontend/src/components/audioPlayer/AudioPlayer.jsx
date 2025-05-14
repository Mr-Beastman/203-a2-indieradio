import React from 'react';
import useStationData from '../../hooks/useStationData';
import './AudioPlayer.css';

export default function AudioPlayer() {
  const station = useStationData();

  return (
    <div className="audioPlayer">
      {station ? (
        <>
          <img src={station.logo} alt={`${station.name} logo`} className="station-logo" />
          <h2>{station.name}</h2>
          <p><strong>Now Playing:</strong> {station.current_song}</p>

          <audio controls>
            <source src={station.stream_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <p>
            <a href={station.homepage} target="_blank" rel="noopener noreferrer">
              Visit Station Homepage
            </a>
          </p>

          <p><em>{station.genre} — {station.language}</em></p>

          {/* Embedded YouTube Video */}
          <div className="card video-container">
            <iframe
              src="https://www.youtube.com/embed/36YnV9STBqc?autoplay=1"
              title="The Good Life Radio"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </>
      ) : (
        <p>Loading station data...</p>
      )}
    </div>
  );
}
