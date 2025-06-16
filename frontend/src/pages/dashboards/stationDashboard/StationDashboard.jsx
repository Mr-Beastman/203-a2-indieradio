import { React, useState } from 'react';
import './StationDashboardStyle.css';
import Calendar from 'react-calendar'


// components
import AudioPlayer from '../../../components/media/audioPlayer/AudioPlayer';

// style

export default function StationDashboard() {
  // hardcoded station for testing
  const stationID = 13
  
  const [selectedDate, setSelectedDate] = useState(new Date());

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
          < AudioPlayer stationId={stationID} showLogo={false} showName={false} showTag={false}/>
        </div>

        {/* right side */}
        <div className="rightSide">
          <div className="chatWindow">
            <div className="loginOverlay">
              <p>Chat Window Heres</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pageBottom">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />
      </section>

    </div>
  );
}
