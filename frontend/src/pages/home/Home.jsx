import React from 'react'

// importing style sheet and images
import './HomeStyle.css'

// import components 
import StationCarousel from '../../components/stationCarousel/StationCarousel';

export default function Home() {
  
  // temp test for showBrowser
  const placeHolders = [
    {
      id: 1,
      name: 'a station',
      streamUrl: 'www.test.com',
      logoUrl: 'https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill'
    },
    {
      id: 2,
      name: 'another station',
      streamUrl: 'www.test.com',
      logoUrl: 'https://via.assets.so/album.png?id=1&q=95&w=360&h=360&fit=fill'
    },
    {
      id: 3,
      name: 'Last station',
      streamUrl: 'www.test.com',
      logoUrl: 'https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=fill'
    }
  ];

    const newHolders = [
    {
      id: 1,
      name: 'a station',
      streamUrl: 'www.test.com',
      logoUrl: 'https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill'
    },
    {
      id: 2,
      name: 'another station',
      streamUrl: 'www.test.com',
      logoUrl: 'https://via.assets.so/album.png?id=1&q=95&w=360&h=360&fit=fill'
    }
  ];

  return (

    
    <div className="homePage">
      
      <div className="media">
        <StationCarousel displayName='Live Now' stationList={placeHolders}/>
        <StationCarousel displayName='New to Air' stationList={newHolders}/>
      </div>
      
    </div>
  );
}
