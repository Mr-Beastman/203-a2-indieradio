import React from 'react'

// importing style sheet
import './ArtistPageStyle.css'

// importing components
import AudioPlayer from '../../components/media/audioPlayer/AudioPlayer'
import YoutubePlayer from '../../components/media/youtubePlayer/YoutubePlayer';

export default function ArtistPage() {
  return (
    <div className="artistPage">
      <AudioPlayer />
      <YoutubePlayer />

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
      </section>

      <section className="section" id="contact">
        <h3>Get in Touch</h3>
        <p>
          Text your requests to: 022-123-4567<br />
          Follow us on <a href="https://facebook.com">Facebook</a>
        </p>
      </section>
    </div>
  );
}
