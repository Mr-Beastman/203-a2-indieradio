import React from 'react';

import './LocalSpotlight.css';
import bannerImage from './images/local-spotlight-banner.png';

export default function LocalSpotlight() {
  return (
    <div className="localSpotlight">
      <h1>Local Spotlight</h1>
      <p>Showcasing the finest underground talent from Aotearoa.</p>

      <div className="spotlightBanner">
        <img src={bannerImage} alt="Local Artists Banner" />
      </div>
    </div>
  );
}
