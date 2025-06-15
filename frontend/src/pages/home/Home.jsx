import { React, useEffect, useState }  from 'react'
import { NavLink } from 'react-router-dom';


// importing style sheet and images
import './HomeStyle.css'

// import components 
import StationCarousel from '../../components/browsers/station/stationCarousel/StationCarousel';
import AudioPlayer from '../../components/media/audioPlayer/AudioPlayer';

export default function Home() {


  // pulling live stations from database
  const[liveStations, setLiveStations] = useState([])


  // varibales for text elemenets
  const welcomeTitle = 'Welcome to Indie Radio'
  const welcomeIntro = 'Your gateway to underground sound. Discover, listen, and support independent radio stations from around the world.'
  const homePlayer = 'Hot right now'
  const homeCarousel = 'Stations Currently Live'

  useEffect(() => {
     fetch('http://localhost:5001/station/getLiveStations')
    .then(response => response.json())
    .then(data => setLiveStations(data))
    .catch(err => console.error("Issue fetching stations", err));
  }, []);

  //hardcode for testing
  const toPlay = 10

  // visual elements
  return (
    <div className="homePage">

      <div className="twoColumnSection">
        <div className="leftColumn">
          <div className="tagline">
            <h1>{welcomeTitle}</h1>
            <h2>{welcomeIntro}</h2>
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
          <h1>{homePlayer}</h1>
          <AudioPlayer 
            stationId={toPlay}
          />
        </div>
      </div>

      <div className="stationDisplay">
        <StationCarousel displayName={homeCarousel} stationList={liveStations}/>
      </div>
      
    </div>
  );
}
