import React from 'react';
import './Home.css';
import heroImage from '../home/Hero.png';

export default function Home() {
  return (
    <div className="homePage">

      <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      </div>
    </div>
  );
}
