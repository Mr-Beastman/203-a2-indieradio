import {React, useState, useEffect} from 'react'

//import style
import './StationBrowserStyle.css'

// import components 
import StationCarousel from '../../components/stationCarousel/StationCarousel';
import StationGrid from '../../components/stationGrid/StationGrid';

export default function ShowBrowser() {
  
  // pulling live stations from database
  const[liveStations, setLiveStations] = useState([])
  const[allStations, setAllStations] = useState([])

  //populating live staitons
  useEffect(() => {
     fetch('http://localhost:5001/station/getLiveStations')
    .then(response => response.json())
    .then(data => setLiveStations(data))
    .catch(err => console.error("Issue fetching stations", err));
  }, []);

  //populating all stations
    useEffect(() => {
     fetch('http://localhost:5001/station/getStations')
    .then(response => response.json())
    .then(data => setAllStations(data))
    .catch(err => console.error("Issue fetching stations", err));
  }, []);

  return (
      <div className="pageContent">
        <div className="liveDisplay">
          <h1>Checkout whos Currently airing right now!</h1>
          <StationCarousel displayName='Currently Live' stationList={liveStations}/>
        </div>

       <div className="allDisplay">
        <h1>Find a new favourite and see when they are next on!</h1>
        <StationGrid displayName='All Stations' stationList={allStations}/>
      </div>
             
      </div>
  )
}
