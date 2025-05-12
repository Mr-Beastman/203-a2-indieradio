import React from 'react';
import AudioPlayer from './components/audioPlayer/audioPlayer'; // Correct import path

// importing components
import NavigationBar from './components/navigationBar/NavigationBar';

// Importing CSS files
import './style.css';
import './globalStyle.css';

function App() {
  return (
    <>
      <NavigationBar />

      <section className="hero" id="stream">
        <h2>Live from the Underground</h2>
        <p>Streaming the freshest independent music, 24/7. Powered by real artists, not algorithms.</p>

        <AudioPlayer />
      </section>

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

      <section className="section" id="archive">
        <h3>On Demand</h3>
        <div className="card-grid">
          <div className="card">
            <h4>Replay: Indie Vibes</h4>
            <p><a href="#">Listen Now</a></p>
          </div>
          <div className="card">
            <h4>Replay: Chill Sessions</h4>
            <p><a href="#">Listen Now</a></p>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <h3>Get in Touch</h3>
        <p>
          Text your requests to: 022-123-4567<br />
          Follow us on <a href="https://facebook.com">Facebook</a>
        </p>
      </section>

      <footer>
        &copy; 2025 Indie Radio — Built by Shav Narayan & Benjamin Eastman
      </footer>
    </>
  );
}

export default App;
