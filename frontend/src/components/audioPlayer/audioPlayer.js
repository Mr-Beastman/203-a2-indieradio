// AudioPlayer.jsx
import React, { useState, useEffect } from 'react';
import './audioPlayer.css'; // Ensure the correct path to the CSS file

const AudioPlayer = () => {
  const [stations, setStations] = useState([]);
  const [currentStation, setCurrentStation] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/nowPlaying')
      .then(res => res.json())
      .then(setStations)
      .catch(err => console.error('Failed to fetch stations:', err));
  }, []);

  return (
    <div className="audio-player p-4">  {}
      <h1 className="text-xl font-bold mb-4">Audio Player</h1>
      
      <ul className="space-y-2">
        {stations.map((station, index) => (
          <li key={index} className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <img src={station.logo} alt={station.name} className="w-12 h-12 rounded shadow" /> {}
            <div className="flex-1">
              <a href={station.homepage} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                {station.name}
              </a>
              <div className="text-sm text-gray-600">{station.genre}</div>
              <div className="text-xs text-gray-400">Language: {station.language} | Location: {station.location?.subdivision}, {station.location?.country}</div>
            </div>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => setCurrentStation(station)}
            >
              Play
            </button>
          </li>
        ))}
      </ul>

      {currentStation && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">{currentStation.name}</h2>
          <audio controls autoPlay src={currentStation.stream_url} className="w-full mt-2" />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
