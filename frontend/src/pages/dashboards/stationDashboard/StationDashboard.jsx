import { React, useEffect, useState } from 'react'
import './StationDashboardStyle.css';


// components
import AudioPlayer from '../../../components/media/audioPlayer/AudioPlayer';
import ChatWindow from '../../../components/chatWindow/ChatWindow';
import MonthlyCalendar from '../../../components/calendars/MonthlyCalendar';

// style

// import ultilities
import * as utilities from '../../../utilities/utilities';



export default function StationDashboard() {

  // pulling userdata from stored token
  const currentUser = utilities.getCurrentUser();
  const[stationData, setStationData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5001/station/${currentUser.username}`)
    .then(response => response.json())
    .then(data => setStationData(data))
    .catch(err => console.error("Couldn't fetch lsitener data", err))
  }, [currentUser.username]);
  

  return (
    <div className="stationDashboard">

      <section className="pageTop">

        {/* left side */}
        <div className="leftSide">
          {/* on air status */}
          <div className="statusTools">
            <h2>On-Air Controls</h2>
            <button className="onAirButton">Live</button>
            <button className="onAirButton">Offline</button>
            <div className="status">
              <strong>Status: </strong>
              <span className="statusLive">LIVE</span>
            </div>
          </div>

          {/* scheduling tools */}
          <div className="schedulingTools">
            <h2>Scheduling</h2>
            <button className="button">Add / Edit Shows</button>
            <div className="nextShow">
              <strong>Next Show: </strong>
              Place Holder Show 3:00pm
            </div>    
          </div>
          {/* session details */}
          <h2>Station Details</h2>
          < AudioPlayer stationId={stationData.id} showLogo={false} showName={false} showTag={false}/>
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
