import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StationCarouselStyle.css';


// display browser with change title/contents
// parameters : str "displayName" and list "stationList" 
// returns : display code for stationBroweser
export default function StationCarousel({displayName = "stations", stationList = []}) {
    const navigate = useNavigate();

    // passing station id on navigate to build page
    function naviagteToArtist(stationId) {
        navigate(`/station/${stationId}`);
    }

    return (
        <div className="carouselComponent">
        <h1 className="displayName">{displayName}</h1>
        <div className="carouselDisplay">
            {stationList.map(station => (
            <div key={station.id} className="card" onClick={() => naviagteToArtist(station.id)}>
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
