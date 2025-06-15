import React from 'react';
import { CalendarDays, Settings, Clock4 } from 'lucide-react';
import './StationDashboardStyle.css';




export default function StationDashboard() {
  return (
    <div className="grid">
      {/* DJ Section */}
      <div className="card">
        <div className="card-content">
          <h2 className="flex items-center gap-2">
            <Settings /> Show Settings
          </h2>
          <p>Manage your show title, description, and genre tags.</p>
          <button className="button">Update Show</button>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2 className="flex items-center gap-2">
            <CalendarDays /> Scheduler
          </h2>
          <p>Schedule your live broadcasts and upload pre-recorded content.</p>
          <button className="button">Open Scheduler</button>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h2 className="flex items-center gap-2">
            <Clock4 /> Analytics
          </h2>
          <p>Track listeners, peak times, and location metrics.</p>
          <button className="button">View Analytics</button>
        </div>
      </div>

      {/* DJ Account Options */}
      <div className="card">
        <div className="card-content">
          <h2>DJ Account Settings</h2>
          <ul>
            <li>Edit profile</li>
            <li>Change password</li>
            <li>Upload profile picture</li>
            <li>Connect social media</li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}
