import { useState, useEffect } from 'react';

export default function useStationData(pollInterval = 15000) {
  const [station, setStation] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStation = async () => {
      try {
        const response = await fetch('http://localhost:5000/nowPlaying', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStation(data);
        // console.debug('Fetched station data:', data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching station data:', error);
        }
      }
    };

    fetchStation(); // initial fetch
    const intervalId = setInterval(fetchStation, pollInterval);

    return () => {
      controller.abort(); // clean up on unmount
      clearInterval(intervalId);
    };
  }, [pollInterval]);

  return station;
}
