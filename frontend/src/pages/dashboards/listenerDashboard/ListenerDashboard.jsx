import React from 'react';
import { PlayCircle, Search } from 'lucide-react';
import './ListenerDashboardStyle.css';




export default function DJDashboard() {
  return (
    <div className="grid">

      {/* Listener Section */}
      <div className="card">
        <div className="card-content">
          <h2 className="flex items-center gap-2">
            <PlayCircle /> Now Playing
          </h2>
          <p>Stream currently live shows or recent uploads.</p>
          <button className="button">Listen Live</button>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2 className="flex items-center gap-2">
            <Search /> Browse Shows
          </h2>
          <p>Search and discover shows by genre, DJ, or schedule.</p>
          <button className="button">Browse Shows</button>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2>Listener Account Settings</h2>
          <ul>
            <li>Manage subscriptions</li>
            <li>Update listening preferences</li>
            <li>Save favorite shows</li>
            <li>Change account details</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
