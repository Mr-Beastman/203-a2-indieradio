import { React, useEffect, useState } from 'react'
import './ListenerDashboardStyle.css';

//import context
import { useAuth } from '../../../contexts/AuthenticationContext';

// import components
import StationCarousel from '../../../components/browsers/station/stationCarousel/StationCarousel';
import { captializeWord } from '../../../utilities/utilities';


export default function ListenerDashboard() {

  const[subscriptions, setSubscriptions] = useState([]);

  const { username } = useAuth();

  useEffect(() => {
    if (!username) return; 
    fetch(`http://localhost:5001/subscriptions/getUserSubscriptions?username=${username}`)
    .then(response => response.json())
    .then(data => setSubscriptions(data))
    .catch(err => console.error("Couldn't fetch lsitener data", err))
  }, [username]);


  return (

    <div className="pageContent">

      { subscriptions.length > 0 &&
        <div className="stationDisplay">
          <StationCarousel 
            displayName={`${captializeWord(username)}'s Library`}
            stationList={subscriptions}/>
        </div>
      }

      <div className="upComing">
        <h1>Show Schedule</h1>
      </div>
    </div>

  );
}
