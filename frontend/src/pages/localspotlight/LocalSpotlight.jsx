import React from 'react';
import './LocalSpotlight.css';

export default function LocalSpotlight() {
  return (
    <div className="localSpotlight">
      <div className="spotlightHeader">
      </div>

      <div className="spotlightBanner">
        <img 
          src="/local-spotlight-banner.png" 
          alt="Local Artists Banner"
          loading="lazy"
        />
      </div>

      <div className="spotlightContent">
        <div className="artistGrid">
          {/* Artist grid content will go here */}
        </div>
      </div>
    </div>
  );
}
