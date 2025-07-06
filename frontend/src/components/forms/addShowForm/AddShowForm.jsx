import { React, useState } from 'react'

// style
import "./addShowFormStyle.css"

export default function AddShowForm({ stationId, onShowAdded }) {
const [title, setTitle] = useState('');
  // setting form inputs
  const [artistUsername, setArtistUsername] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // submit form function
  const submitForm = async (input) => {
    input.preventDefault();

    const newShow = {
      stationId,
      title,
      artistUsername,
      description,
      startTime,
      endTime,
    };

    try {
      const res = await fetch('http://localhost:5001/shows/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newShow),
      });

      if (res.ok) {
        const createdShow = await res.json();
        onShowAdded(createdShow);
        setTitle('');
        setArtistUsername('');
        setDescription('');
        setStartTime('');
        setEndTime('');
      } else {
        console.error('Failed to add show');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // visual elements
  return (
    <div className="formContent">
      <form onSubmit={submitForm} className="addShowForm">
        <h3>Add a New Show</h3>
        <input
          type="text"
          placeholder="Show Title"
          value={title}
          onChange={(input) => setTitle(input.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Host"
          value={artistUsername}
          onChange={(input) => setArtistUsername(input.target.value)}
          required
        />
        <textarea
          placeholder="Show Description (Optional)"
          value={description}
          onChange={(input) => setDescription(input.target.value)}
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(input) => setStartTime(input.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(input) => setEndTime(input.target.value)}
          required
        />
        <button type="submit">Create Show</button>
      </form>
    </div>
  );
}