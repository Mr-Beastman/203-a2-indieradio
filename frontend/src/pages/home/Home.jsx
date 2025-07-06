import { React, useMemo, useEffect, useState }  from 'react'
import { NavLink } from 'react-router-dom';


// importing style sheet and images
import './HomeStyle.css'

// import components 
import StationCarousel from '../../components/browsers/station/stationCarousel/StationCarousel';
import AudioPlayer from '../../components/media/audioPlayer/AudioPlayer';

//import ultilities
import { useAuth } from '../../contexts/AuthenticationContext';

export default function Home() {
  
  // varibales for text elemenets
  // allow for quick text modification on page
  const welcomeTitle = 'Welcome to Indie Radio'
  const welcomeIntro = 'Your gateway to underground sound. Discover, listen, and support independent radio stations from around the world.'
  const homePlayer = 'Hot right now'
  const homeCarousel = 'Stations Currently Live'

  // getting auth context
  const { isLoggedIn } = useAuth();

  // pulling live stations from database
  const[liveStations, setLiveStations] = useState([])

  useEffect(() => {
     fetch('http://localhost:5001/station/getLiveStations')
    .then(response => response.json())
    .then(data => setLiveStations(data))
    .catch(err => console.error("Issue fetching stations :", err));
  }, []);

  //set random station from live list
  // using memo to avoid changing on every render (strict mode causing missmacthed data)
  const toPlay = useMemo(() => {
    return liveStations[Math.floor(Math.random() * liveStations.length)];
  }, [liveStations]);


  // visual elements
  return (
    <div className="homePage">
        <div className="twoColumnSection">
          <div className="leftColumn">
            <div className="section">
              <div className="tagline">
                <h1>{welcomeTitle}</h1>
                <h3>{welcomeIntro}</h3>
              </div>
              { !isLoggedIn && (
                <div className="getStarted">
                  <NavLink to="/login">
                    <button> Sign In </button>
                  </NavLink>
                  <NavLink to='/register'>
                    <button>Register</button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          <div className="rightColumn">
            <div className="section">
              <h1>{homePlayer}</h1>
              {toPlay ? (
                <AudioPlayer stationId={toPlay?.id}/>
              ) : (
                <h3>No station currently live! Please Check back later</h3>
              )}
            </div>
          </div>
        </div>

      <div className="section">
        <StationCarousel displayName={homeCarousel} stationList={liveStations}/>
      </div>
      
    </div>
  );
}
