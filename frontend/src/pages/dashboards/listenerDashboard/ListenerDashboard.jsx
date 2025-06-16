import React from 'react';
import './ListenerDashboardStyle.css';

// import components
import StationCarousel from '../../../components/browsers/station/stationCarousel/StationCarousel';


export default function DJDashboard() {
  return (
    <div className="pageContent">
    <div className="library">
      <StationCarousel displayName='Your Library'/>
    </div>

    <div className="upComing">
      <h1>Show Schedule</h1>
    </div>

    </div>

  );
}
