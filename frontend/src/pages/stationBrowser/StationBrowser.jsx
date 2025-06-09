import {React, useState, useEffect} from 'react'

//import style
import './StationBrowserStyle.css'

// import components 
import StationCarousel from '../../components/browsers/station/stationCarousel/StationCarousel';
import StationGrid from '../../components/browsers/station/stationGrid/StationGrid';

export default function ShowBrowser() {

  //variable for browser text
  const liveTitle = 'Checkout these stations streaming now!'
  const allTitle = 'Or find  a new favourite and see when they are next on!'

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
          <StationCarousel displayName={liveTitle} stationList={liveStations}/>
        </div>

       <div className="allDisplay">
        <StationGrid displayName={allTitle} stationList={allStations}/>
      </div>
             
      </div>
  )
}
