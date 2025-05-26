import React from 'react';
import './LocalSpotlight.css';

export default function LocalSpotlight() {
  return (
    <div className="localSpotlight">
      <h1>Local Spotlight</h1>
      <p>Showcasing the finest underground talent from Aotearoa.</p>

      <div className="spotlightBanner">
        <img src="/images/local-spotlight-banner.png" alt="Local Artists Banner" />
      </div>
    </div>
  );
}
