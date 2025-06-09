import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// importing style sheet
import './StationPageStyle.css'

// importing components
import AudioPlayer from '../../components/media/audioPlayer/AudioPlayer'

export default function StationPage() {
  // grab id from url
  const { id } = useParams();
  const[stationData, setStationData] = useState({})

  useEffect(() => {
    fetch(`http://localhost:5001/station/${id}`)
    .then(response => response.json())
    .then(data => setStationData(data))
    .catch(err => console.error("Couldn't fetch station data", err))
  }, [id])


  return (
    <div className="StationPage">

      <div className="stationDetials">
        <h1>{stationData.channelName}</h1>
        <p>{stationData.tag}</p>
      </div>

      
      <div className="stationMedia">
        <div className="leftContent">
          <AudioPlayer 
            stationId={id}
            showName = {false}
            showTag = {false}
            showBio = {true}
          />
        </div>
        <div className="rightContent">
          <div className="chatWindow">
            <div className="loginOverlay">
              <p>Sign in to join the discussion!</p>
              <button onClick = {()=>alert("Will redirect to sign in")}> Sign in </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* hardcoded for display, will populate when atrits tools built */}
      <section className="section" id="schedule">
        <h3>Weekly Schedule</h3>
        <div className="card-grid">
          <div className="card">
            <h4>Monday: Indie Vibes</h4>
            <p>DJ Kora - 4PM to 6PM</p>
          </div>
          <div className="card">
            <h4>Wednesday: Lo-Fi Break</h4>
            <p>DJ Chill - 6PM to 8PM</p>
          </div>
          <div className="card">
            <h4>Friday: Live Sets</h4>
            <p>DJ Aura - 9PM to Midnight</p>
          </div>
        </div>
      </section>

      {/* temporaily removed as archive has not been set up in database */}
      {/* <section className="section" id="archive">
        <h3>On Demand</h3>
        <div className="card-grid">
          <div className="card">
            <h4>Replay: Indie Vibes</h4>
            <p>
              <button className="link-button" onClick={() => alert('Coming soon')}>
                Listen Now
              </button>
            </p>
          </div>
          <div className="card">
            <h4>Replay: Chill Sessions</h4>
            <p>
              <button className="link-button" onClick={() => alert('Coming soon')}>
                Listen Now
              </button>
            </p>
          </div>
        </div>
      </section> */}
      
    </div>
  );
}
