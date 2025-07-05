// Monthly calender display used for stations to plan shows

import { React, useState, useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

// import componets
import AddShowFormOverlay from '../forms/overlays/addShowFormOverlay/AddShowFormOverlay';


// import style
import './MonthlyCalendarStyle.css'


export default function MonthlyCalendar( {stationId} ) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shows, setShows] = useState([]);

  const month = dayjs(selectedDate).format('MM');
  const year = dayjs(selectedDate).format('YYYY');

  useEffect(() => {
    if (!stationId) return

    fetch(`http://localhost:5001/shows/monthly?stationId=${stationId}&month=${month}&year=${year}`)
      .then(res => res.json())
      .then(setShows)
      .catch(err => console.error('Fetch error:', err));
  }, [stationId, month, year]);

  const selectedShows = shows.filter(show =>
    dayjs(show.startTime).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD')
  );  

  // adding new show
  const [isAdding, setIsAdding] = useState(false);

  const handleShowAdded = (newShow) => {
    setShows(prev => [...prev, newShow]);
  };

  // delete show 
  const deleteShow = async (showId) => {
    if (!window.confirm("Are you sure you want to delete this show?")) return;

    try {
      const res = await fetch(`http://localhost:5001/shows/delete/${showId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setShows(prev => prev.filter(show => show.id !== showId));
      } else {
        console.error('Failed to delete show');
      }
    } catch (err) {
      console.error('Error deleting show:', err);
  }
};

  return (
    <div className='calendarContent'>
      <h2 >Schedule</h2>
      <button onClick={() => setIsAdding(true)} className="addShowBtn">Add New Show</button>

      {isAdding && (
        <AddShowFormOverlay
          stationId={stationId}
          onClose={() => setIsAdding(false)}
          onShowAdded={(newShow) => {
            handleShowAdded(newShow);
            setIsAdding(false);
          }}
        />
      )}
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date }) => {
          const dateStr = dayjs(date).format('YYYY-MM-DD');
          const showOnThisDay = shows.filter(show => dayjs(show.startTime).format('YYYY-MM-DD') === dateStr);
          return showOnThisDay.length > 0 ? (
            <div className="calendarDot" />
          ) : null;
        }}
      />
      <div className="calendarShows">
        <h1>Shows on {dayjs(selectedDate).format('DD/MM/YYYY')}</h1>
        {selectedShows.length === 0 ? (
          <p className="noShows">No shows scheduled for this day.</p>
        ) : (
          <div className="calendarShowList">
            {selectedShows.map(show => (
              <div key={show.id} className="calendarShowCard">
                <div className="leftSide">
                  <h2 className="showTitle">{show.title}</h2>
                  <h3 className="showInfo">
                    {dayjs(show.startTime).format('HH:mm')} — by {show.artistUsername}
                  </h3>
                  {show.description && <h3 className="showDescription">{show.description}</h3>}                  
                </div>
                <div className="rightSide">
                  <button onClick={() => deleteShow(show.id)}>Delete Show</button>                  
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}