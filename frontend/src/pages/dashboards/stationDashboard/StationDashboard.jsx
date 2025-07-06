import { React, useEffect, useState } from 'react'

//import contexts
import { useAuth } from '../../../contexts/AuthenticationContext';

// components
import AudioPlayer from '../../../components/media/audioPlayer/AudioPlayer';
import ChatWindow from '../../../components/chatWindow/ChatWindow';
import MonthlyCalendar from '../../../components/calendars/monthlyCalendar/MonthlyCalendar';

// style
import './StationDashboardStyle.css'




export default function StationDashboard() {

  //retrieve context
  const { username } = useAuth();

  // pulling userdata from stored token
  const[stationData, setStationData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5001/station/${username}`)
    .then(response => response.json())
    .then(data => setStationData(data))
    .catch(err => console.error("Couldn't fetch data", err))
  }, [username]);

  // set current show
  const [currentShow, setCurrentShow] = useState(null);

    useEffect(() => {
    if (!stationData.id) return;

    fetch(`http://localhost:5001/shows/current?stationId=${stationData.id}`)
      .then(res => res.json())
      .then(data => setCurrentShow(data || null))
      .catch(err => console.error('Current show fetch error:', err));
  }, [stationData.id]);

  // set next show
  const [nextShow, setNextShow] = useState(null);

  useEffect(() => {
    if (!stationData.id) return;

    fetch(`http://localhost:5001/shows/next?stationId=${stationData.id}`)
      .then(res => res.json())
      .then(data => setNextShow(data || null))
      .catch(error => console.error('Next show fetch error:', error));
  }, [stationData.id]);

  const toggleLiveStatus = () => {
  fetch('http://localhost:5001/station/setLive', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: stationData.id }),
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.message);
    setStationData(prev => ({ ...prev, live: prev.live === 1 ? 0 : 1 }));
  })
  .catch(error => console.error("Failed to toggle live status", error));
  };

  // visual elements
  return (
    <div className="stationDashboard">
      

      <section className="pageTop">

        {/* left side */}
        <div className="leftSide">
          {/* on air status */}
          <div className="statusTools">
            <h2>On-Air Controls</h2>
            
            {stationData.live ? 
              <button className="onAirButton" onClick={toggleLiveStatus}>End Stream</button>
              :
              <button className="onAirButton" onClick={toggleLiveStatus}>Start Stream</button>
            }


          </div>

          {/* session details */}
          <div className="stationDetails">
            <h2>Station Details</h2>
            <div className="showLive">
              <strong>Stream Status: </strong>
              <span className="statusLive">
                {stationData.live ? (
                  'LIVE'
                ):(
                  'OFFLINE'
                )}
                </span>
            </div>

            <div className="currentShow">
              <strong>Current Show: </strong>
              {currentShow?.title ? (
                <span>{currentShow.title}</span>
              ) : (
                <span>No Current Show</span>
              )}
            </div>
            
            <div className="nextShow">
              <strong>Next Show: </strong>
              {nextShow?.title ? (
                <strong>{nextShow.title}</strong>
              ) : (
                <strong>No Show Scheduled</strong>
              )}
            </div>


          </div>
          
          <div className="audio">
            < AudioPlayer
              stationId={stationData.id} 
              showLogo={false} 
              showName={false} 
              showTag={false}
              showPlayer ={false}/>
          </div>

        </div>

        {/* right side */}
        <div className="rightSide">
          <ChatWindow 
          stationId={stationData.id}
          username={'Host'}/>
        </div>
      </section>

      {/* scheduling features */}
      <section className="pageBottom">
        <MonthlyCalendar stationId={stationData.id}/>
      </section>

    </div>
  );
}
