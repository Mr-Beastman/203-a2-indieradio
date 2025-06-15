import { useState, useEffect } from 'react';

// reruns every 15 secs to check for new song info
export default function useGetCurrentSong(streamUrl) {
  
  const [currentSong, setCurrentSong ] = useState(null)

  useEffect(() => {
    if (!streamUrl) return;

        const controller = new AbortController()

        const fetchNowPlaying = async () => {
          try {
            const response = await fetch(
              `http://localhost:5001/nowPlaying?streamUrl=${encodeURIComponent(streamUrl)}`, 
              {signal: controller.signal}
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            setCurrentSong(data?.title || null)
          } catch (error) {
            if (error.name !== 'AbortError') {
              console.error('Error fetching now playing info:', error)
            }
          }
        };

        fetchNowPlaying()
        const intervalId = setInterval(fetchNowPlaying, 30000)

        return () => {
          controller.abort()
          clearInterval(intervalId)
        };
      }, [streamUrl])

  return currentSong
}