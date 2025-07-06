import React from 'react';

import './WeeklyCalendarStyle.css'

function groupShowsByDay(shows) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const grouped = {};
  daysOfWeek.forEach(day => {
    grouped[day] = [];
  });

  shows.forEach(show => {
    const date = new Date(show.startTime);
    const day = date.toLocaleDateString('en-NZ', { weekday: 'long', timeZone: 'Pacific/Auckland' });
    if (grouped[day]) {
      grouped[day].push(show);
    }
  });

  daysOfWeek.forEach(day => {
    grouped[day].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  });

  return grouped;
}

export default function WeeklyCalendar({ shows = [] }) {
  const formatDateTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleTimeString('en-NZ', {
      timeZone: 'Pacific/Auckland',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const groupedShows = groupShowsByDay(shows);

  return (
    <div>
      <h1>Weekly Schedule</h1>

      {shows.length === 0 ? (
        <h3>Nothing has been scheduled this week</h3>
      ) : (
        <div className="cardGridWeekView">
          {Object.entries(groupedShows).map(([dayName, shows]) => (
            <div className="dayCard" key={dayName}>
              <h2>{dayName}</h2>
              {shows.length > 0 ? (
                shows.map(show => (
                  <div className="weeklyShowCard" key={show.id}>
                    {shows.length >= 1 && <h3 className='channelName'>{show.channelName}</h3>}
                    <h4 className='showTitle'><strong>{show.title}</strong></h4>
                    <h5>{show.artistUsername}</h5>
                    <h5>{formatDateTime(show.startTime)} – {formatDateTime(show.endTime)}</h5>
                  </div>
                ))
              ) : (
                <p>No shows</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
