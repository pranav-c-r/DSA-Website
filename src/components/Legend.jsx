import React from 'react';

const Legend = () => {
  return (
    <div className="legend-container">
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: '#6B46C1' }}></div>
        <span>Node</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ color: '#38B2AC' }}>BF</div>
        <span>Balance Factor</span>
      </div>
      <div className="legend-item">
        <div className="legend-line" style={{ backgroundColor: '#9F7AEA' }}></div>
        <span>Edge</span>
      </div>
    </div>
  );
};

export default Legend;