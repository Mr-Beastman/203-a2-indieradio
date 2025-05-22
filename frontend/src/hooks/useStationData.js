import { useState, useEffect } from 'react';

// reruns every 15 secs to check for new song info
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

      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching station data:', error);
        }
      }
    };

    const intervalId = setInterval(fetchStation, pollInterval);

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, [pollInterval]);

  return station;
}
