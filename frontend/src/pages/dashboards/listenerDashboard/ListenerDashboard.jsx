import { React, useEffect, useState } from 'react'
import './ListenerDashboardStyle.css';

//import context
import { useAuth } from '../../../contexts/AuthenticationContext';

// import components
import StationCarousel from '../../../components/browsers/station/stationCarousel/StationCarousel';
import { captializeWord } from '../../../utilities/utilities';
import WeeklyCalendar from '../../../components/calendars/weeklyCalendar/WeeklyCalendar';


export default function ListenerDashboard() {

  // get details from context
  const { username } = useAuth();

  // retrieve and set subscibitions 
  
  const[subscriptions, setSubscriptions] = useState([]);
  
  useEffect(() => {
    if (!username) return; 
    fetch(`http://localhost:5001/subscriptions/getUserSubscriptions?username=${username}`)
    .then(response => response.json())
    .then(data => setSubscriptions(data))
    .catch(err => console.error("Couldn't fetch lsitener data", err))
  }, [username]);

  // get show info for all subscibed stattions
  const [weeklyShows, setWeeklyShows] = useState([]);

  useEffect(() => {
  if (!subscriptions.length) return;

  const today = new Date();
  const payload = {
    stations: subscriptions,
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };

  fetch('http://localhost:5001/shows/weeklySubscribed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(data => setWeeklyShows(data))
    .catch(err => console.error("Couldn't fetch weekly shows", err));
}, [subscriptions]);

  // visual elements
  return (

    <div className="pageContent">
      { subscriptions.length > 0 ? (
        <>
          <div className="section">
            <StationCarousel 
              displayName={`${captializeWord(username)}'s Library`}
              stationList={subscriptions}
            />
          </div>
          
          <div className="section">
            <WeeklyCalendar shows={weeklyShows}/>
          </div>
        </>
        ) : (
          <div className="section">
            <h1>Looks like there's nothing here!</h1>
            <h2>
              Check out the stations tab to find and follow your favourites to get updated on shows and
              more!
            </h2>
          </div>
        )}
      </div>
    )
}
