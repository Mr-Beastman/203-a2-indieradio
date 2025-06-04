import React from 'react';
import './StationCarouselStyle.css';
import '../../globalStyle.css';


// display browser with change title/contents
// parameters : str "displayName" and list "stationList" 
// returns : display code for stationBroweser
export default function StationCarousel({displayName = "stations", stationList = []}) {

  return (
    <div className="carouselComponent">
      <h2 className="displayName">{displayName}</h2>
      <div className="carouselDisplay">
        {stationList.map(station => (
          <div key={station.id} className="card">
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
