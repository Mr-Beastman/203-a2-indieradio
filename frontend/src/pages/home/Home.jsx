import React from 'react';
import { Link } from 'react-router-dom';
import { useShows } from '../../hooks/useShows';
import './Home.css';
import heroImage from './Hero.png';

export default function Home() {
  const { shows, currentShow } = useShows();

  return (
    <div className="homePage">
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1 className="hero-title">IndieRadio</h1>
          <p className="hero-subtitle">
            Your Gateway to Independent Music and Culture
          </p>
          {currentShow ? (
            <div className="current-show">
              <p>Now Playing</p>
              <h2>{currentShow.title}</h2>
              <p>with {currentShow.dj_username}</p>
            </div>
          ) : (
            <Link to="/schedule" className="cta-button">
              View Schedule
            </Link>
          )}
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">Featured Shows</h2>
        <div className="shows-grid">
          {shows.slice(0, 3).map(show => (
            <div key={show.id} className="show-card">
              <div className="show-info">
                <h3 className="show-title">{show.title}</h3>
                <p className="show-dj">with {show.dj_username}</p>
                <p className="show-time">
                  {new Date(show.schedule_time).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">Our DJs</h2>
        <div className="shows-grid">
          <div className="show-card">
            <div className="show-info">
              <h3 className="show-title">DJ Seduction</h3>
              <p className="show-dj">Deep House & Electronic</p>
            </div>
          </div>
          <div className="show-card">
            <div className="show-info">
              <h3 className="show-title">Midnight Groove</h3>
              <p className="show-dj">R&B & Soul</p>
            </div>
          </div>
          <div className="show-card">
            <div className="show-info">
              <h3 className="show-title">Velvet Dreams</h3>
              <p className="show-dj">Jazz & Neo-Soul</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
