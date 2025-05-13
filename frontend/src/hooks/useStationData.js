import { useState, useEffect } from 'react';

export default function useStationData(pollInterval = 15000) {
  const [station, setStation] = useState(null);

  useEffect(() => {
    const fetchStation = () => {
      fetch('http://localhost:5000/nowPlaying')
        .then(response => response.json())
        .then(data => setStation(data))
        .catch(error => console.error('Error fetching station data:', error));
    };

    fetchStation(); // initial fetch
    const interval = setInterval(fetchStation, pollInterval);
    return () => clearInterval(interval);
  }, [pollInterval]);

  return station;
}
