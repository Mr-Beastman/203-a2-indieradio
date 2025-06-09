import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StationGridStyle.css';
import '../../globalStyle.css';

export default function StationGrid({ displayName = "stations", stationList = [] }) {
  const navigate = useNavigate();

  function navigateToStation(stationId) {
    navigate(`/station/${stationId}`);
  }

  return (
    <div className="gridComponent">
      <h1 className="displayName">{displayName}</h1>
      <div className="gridDisplay">
        {stationList.map(station => (
          <div key={station.id} className="card" onClick={() => navigateToStation(station.id)}>
            <img src={station.logoUrl} alt={station.name} />
            <div className="cardContents">
              <h3>{station.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}