import { React, useEffect, useState }  from 'react'

// importing style sheet and images
import './HomeStyle.css'

// import components 
import StationCarousel from '../../components/stationCarousel/StationCarousel';

export default function Home() {

  // pulling all stations from database
  const[stations, setStations] = useState([])

  useEffect(() => {
    fetch('http://localhost:5001/station/getStations')
    .then(response => response.json())
    .then(data => setStations(data))
    .catch(err => console.error("Issue fetching stations", err));
  }, []);

  // pulling live stations from database
  const[liveStations, setLiveStations] = useState([])

  useEffect(() => {
     fetch('http://localhost:5001/station/getLiveStations')
    .then(response => response.json())
    .then(data => setLiveStations(data))
    .catch(err => console.error("Issue fetching stations", err));
  }, []);


  return (

    
    <div className="homePage">
      
      <div className="media">
        <StationCarousel displayName='Live Now' stationList={liveStations}/>
        <StationCarousel displayName='New to Air' stationList={stations}/>
      </div>
      
    </div>
  );
}
