import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useShows } from '../../hooks/useShows';
import './DJDashboard.css';

export default function DJDashboard() {
  const { user } = useAuth();
  const { shows, createShow, updateShow, deleteShow } = useShows();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    schedule_time: '',
    duration: 60,
    stream_url: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await createShow(formData);
      if (result.success) {
        setShowForm(false);
        setFormData({
          title: '',
          description: '',
          genre: '',
          schedule_time: '',
          duration: 60,
          stream_url: ''
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to create show');
    }
  };

  const handleDelete = async (showId) => {
    if (window.confirm('Are you sure you want to delete this show?')) {
      const result = await deleteShow(showId);
      if (!result.success) {
        setError(result.error);
      }
    }
  };

  const toggleLive = async (show) => {
    const result = await updateShow(show.id, { is_live: !show.is_live });
    if (!result.success) {
      setError(result.error);
    }
  };

  const myShows = shows.filter(show => show.dj_id === user?.id);

  return (
    <div className="dj-dashboard">
      <h1>DJ Dashboard</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        className="create-show-button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Create New Show'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="show-form">
          <div className="form-group">
            <label htmlFor="title">Show Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="schedule_time">Schedule Time</label>
            <input
              type="datetime-local"
              id="schedule_time"
              name="schedule_time"
              value={formData.schedule_time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              min="30"
              max="240"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stream_url">Stream URL</label>
            <input
              type="url"
              id="stream_url"
              name="stream_url"
              value={formData.stream_url}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Create Show
          </button>
        </form>
      )}

      <div className="shows-list">
        <h2>My Shows</h2>
        {myShows.length === 0 ? (
          <p>No shows scheduled yet.</p>
        ) : (
          myShows.map(show => (
            <div key={show.id} className="show-card">
              <div className="show-info">
                <h3>{show.title}</h3>
                <p>{show.description}</p>
                <p>Genre: {show.genre}</p>
                <p>Scheduled: {new Date(show.schedule_time).toLocaleString()}</p>
                <p>Duration: {show.duration} minutes</p>
              </div>
              <div className="show-actions">
                <button
                  className={`live-button ${show.is_live ? 'active' : ''}`}
                  onClick={() => toggleLive(show)}
                >
                  {show.is_live ? 'End Stream' : 'Go Live'}
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(show.id)}
                >
                  Delete Show
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
