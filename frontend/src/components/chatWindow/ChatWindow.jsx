// react
import React, { useEffect, useState } from 'react';

// socket
import io from 'socket.io-client';

// style sheet
import './ChatWindowStyle.css';

// constants
const socket = io('http://localhost:5001');

export default function ChatWindow({ stationId, username }) {

  // states
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState('');
  const [chatLoaded, setChatLoaded] = useState(false);
  const [chatError, setChatError] = useState(false);

  // load chat on mount
  useEffect(() => {
    // connect to specific chat
    socket.emit('joinStation', { stationId });

    // fetch chat history
    fetch(`http://localhost:5001/chat/${stationId}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load');
        return response.json();
      })
      .then(data => {
        setChatLog(data);
        setChatLoaded(true);
      })
      .catch(() => {
        setChatError(true);
        setChatLoaded(true);
      });

    // check for new messages
    socket.on('receiveMessage', (data) => {
      if (data.stationId === stationId) {
        setChatLog(previous => [...previous, data]);
      }
    });

    // clean up listener
    return () => {
      socket.off('receiveMessage');
    };
  }, [stationId]);

  // update text box input
  const onInputUpdate = (e) => {
    setMessage(e.target.value);
  };

  // submit message to server
  const onInputSubmit = (eSubmit) => {
    eSubmit.preventDefault();

    if (!message.trim()) return;

    socket.emit('sendMessage', {
      stationId,
      username,
      message
    });

    setMessage('');
  };

  // UI for component
  return (
    <div className="chatWindow">
      <h2>Live Chat</h2>
      <form onSubmit={onInputSubmit} className="display">
        <div className="chatMessages">
          {!chatLoaded ? (
            <p>Loading chat...</p>
          ) : chatError ? (
            <p>Chat could not be loaded.</p>
          ) : (
            chatLog.map((msg, index) => (
              <div key={index}>
                <strong>{msg.user}:</strong> {msg.message}
              </div>
            ))
          )}
        </div>

        <div className="inputSection">
            <input
            type="text"
            value={message}
            onChange={onInputUpdate}
            placeholder="Type a message..."
            disabled={chatError}
            />
            <button type="submit" disabled={chatError || !message.trim()}>
            Send
            </button>
        </div>
      </form>
    </div>
  );
}
