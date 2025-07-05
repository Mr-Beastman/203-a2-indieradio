import React from 'react';

import AddShowForm from '../../addShowForm/AddShowForm';

export default function AddShowFormOverlay({ stationId, onClose, onShowAdded }) {
  if (!stationId) return null;

  return (
    <div className="addShowOverlay" onClick={onClose}>
      <div className="overlayContent" onClick={e => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>×</button>
        <AddShowForm 
          stationId={stationId} 
          onShowAdded={onShowAdded} 
          onClose={onClose} 
        />
      </div>
    </div>
  );
}