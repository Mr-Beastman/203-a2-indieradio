import React from 'react';

import './ArtistPage.css';

import AudioPlayer from '../../components/audioPlayer/AudioPlayer.jsx';

export default function ArtistPage() {
  return (
    <div>

      <AudioPlayer />

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
    </div>
  )
}
