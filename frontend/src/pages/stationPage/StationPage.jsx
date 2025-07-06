import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//import contexts
import { useAuth } from '../../contexts/AuthenticationContext';

// importing style sheet
import './StationPageStyle.css'

// importing components
import AudioPlayer from '../../components/media/audioPlayer/AudioPlayer'
import Subscribe from '../../components/subscribe/Subscribe';
import ChatWindow from '../../components/chatWindow/ChatWindow'
import WeeklyCalender from '../../components/calendars/weeklyCalendar/WeeklyCalendar'


export default function StationPage() {
  //set up navigate
  const navigate = useNavigate();

  // grab id from url
  const { id } = useParams();

  // getting site context
  const { isLoggedIn, username, userType } = useAuth();

  // retrieve and set station data
  const[stationData, setStationData] = useState({})
  
  useEffect(() => {
    fetch(`http://localhost:5001/station/${id}`)
    .then(response => response.json())
    .then(data => setStationData(data))
    .catch(err => console.error("Couldn't fetch station data", err))
  }, [id])

  //retrieve and set weeks shows
  const [weeklyShows, setWeeklyShows] = useState([]);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    fetch(`http://localhost:5001/shows/weekly?stationId=${id}&day=${day}&month=${month}&year=${year}`)
      .then(response => response.json())
      .then(data => setWeeklyShows(data))
      .catch(err => console.error("Couldn't fetch weekly shows", err));
  }, [id]);

  // visual elements
  return (
    <div className="StationPage">
      <div className="stationDetails">
        <h1>{stationData.channelName}</h1>
        <h2>{stationData.tag}</h2>
      </div>
      
      <div className="twoColumnSection">
        <div className="leftContent">
          <div className="section">
            <AudioPlayer 
              stationId={id}
              showName = {false}
              showTag = {false}
              showBio = {true}
            />
            {/* show listner subscribe option if logged in */}
            { isLoggedIn && userType === 'listener' && ( <Subscribe stationId={id}/>)}
          </div>

        </div>
        <div className="rightContent">
          <div className="section">
            { !isLoggedIn ? (
              <div className="loginOverlay">
                <p>Sign in to join the discussion!</p>
                <button onClick={() => navigate('/login')}> Sign in </button>
              </div>
            ) : (
              <ChatWindow stationId={id} username={username}/>
            )}
          </div>
        </div>
      </div>
    <div className="bottom">
      <section className="section">
        <WeeklyCalender shows = {weeklyShows}/>
      </section>
    </div>

  </div>
);
}
