import { React, useEffect, useState }  from 'react'
import { NavLink } from 'react-router-dom';


// importing style sheet and images
import './HomeStyle.css'

// import components 
import StationCarousel from '../../components/stationCarousel/StationCarousel';
import AudioPlayer from '../../components/media/audioPlayer/AudioPlayer';

export default function Home() {


  // pulling live stations from database
  const[liveStations, setLiveStations] = useState([])

  useEffect(() => {
     fetch('http://localhost:5001/station/getLiveStations')
    .then(response => response.json())
    .then(data => setLiveStations(data))
    .catch(err => console.error("Issue fetching stations", err));
  }, []);

  //hardcode for testing
  const toPlay = 'https://icecast.walmradio.com:8443/classic'
  const logo = 'https://icecast.walmradio.com:8443/classic.jpg'

  return (

    
    <div className="homePage">

      <div className="twoColumnSection">
        <div className="leftColumn">
          <div className="tagline">
            <h1>Welcome to Indie Radio</h1>
            <h2>Your gateway to underground sound. Discover, listen, and support independent radio stations from around the world.</h2>
          </div>
          <div className="getStarted">
            <NavLink to="/login">
              <button> Sign In </button>
            </NavLink>
            <NavLink to='/register'>
              <button>Register</button>
            </NavLink>
          </div>
        </div>
        <div className="rightColumn">
          <h1>Hot right now</h1>
          <AudioPlayer 
            streamUrl={toPlay}
            streamLogo={logo}
          />
        </div>
      </div>

      <div className="stationDisplay">
        <StationCarousel displayName='Currently Live' stationList={liveStations}/>
      </div>
      
    </div>
  );
}
