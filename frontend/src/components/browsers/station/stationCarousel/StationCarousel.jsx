import React from 'react';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import './StationCarouselStyle.css';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// display browser with change title/contents
// parameters : str "displayName" and list "stationList" 
// returns : display code for stationBroweser
export default function StationCarousel({displayName = "stations", stationList = []}) {
    const navigate = useNavigate();

    // passing station id on navigate to build page
    function navigateToStation(stationId) {
        navigate(`/station/${stationId}`);
    }


    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, 
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 2,
            },
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            },
        },
        ],
    };


    return (
    <div className="carouselComponent">
        <h1 className="carouselDisplay">{displayName}</h1>

        {stationList.length === 1 ? (
            <div className="singleCard" onClick={() => navigateToStation(stationList[0].id)}>
                <img src={stationList[0].logoUrl} alt={stationList[0].name} />
                <div className="carouselCardContents">
                    <h3>{stationList[0].name}</h3>
                </div>
            </div>
        ) : (        
            <Slider {...sliderSettings}>
                {stationList.map((station) => (
                <div key={station.id} className="card" onClick={() => navigateToStation(station.id)}>
                    <img src={station.logoUrl} alt={station.name} />
                    <div className="carouselCardContents">
                    <h3>{station.name}</h3>
                    </div>
                </div>
                ))}
            </Slider>
            )}
        </div>
    );
}
