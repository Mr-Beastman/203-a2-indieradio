import { useState, useEffect, useCallback } from 'react';

export function useShows() {
  const [shows, setShows] = useState([]);
  const [currentShow, setCurrentShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShows = useCallback(async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:5001/api/shows?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch shows');
      }
      
      const data = await response.json();
      setShows(data.shows || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching shows:', err);
      setError('Failed to load shows');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrentShow = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5001/api/shows/current');
      
      if (response.ok) {
        const data = await response.json();
        setCurrentShow(data);
      } else if (response.status !== 404) {
        // 404 means no current show, which is normal
        throw new Error('Failed to fetch current show');
      }
    } catch (err) {
      console.error('Error fetching current show:', err);
      setError('Failed to load current show');
    }
  }, []);

  const createShow = async (showData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/shows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(showData)
      });

      const data = await response.json();

      if (response.ok) {
        setShows(prevShows => [...prevShows, data.show]);
        return { success: true, show: data.show };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error('Error creating show:', err);
      return { success: false, error: 'Network error' };
    }
  };

  const updateShow = async (showId, updates) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/shows/${showId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (response.ok) {
        setShows(prevShows => 
          prevShows.map(show => 
            show.id === showId ? data.show : show
          )
        );
        return { success: true, show: data.show };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error('Error updating show:', err);
      return { success: false, error: 'Network error' };
    }
  };

  const deleteShow = async (showId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/shows/${showId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setShows(prevShows => prevShows.filter(show => show.id !== showId));
        return { success: true };
      } else {
        const data = await response.json();
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error('Error deleting show:', err);
      return { success: false, error: 'Network error' };
    }
  };

  // Fetch shows on mount
  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  // Poll for current show every minute
  useEffect(() => {
    fetchCurrentShow();
    const interval = setInterval(fetchCurrentShow, 60000);
    return () => clearInterval(interval);
  }, [fetchCurrentShow]);

  return {
    shows,
    currentShow,
    loading,
    error,
    fetchShows,
    createShow,
    updateShow,
    deleteShow
  };
}
