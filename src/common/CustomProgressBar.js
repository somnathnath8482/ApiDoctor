import React from 'react';
import '../css/CustomProgressBar.css'; // Import your CSS file for styling

const CustomProgressBar = ({ visible }) => {
  return (
    <div className={`circular-progress ${visible ? 'visible' : 'hidden'}`}>
      <div className="progress">
        <svg className="progress-circle" viewBox="0 0 100 100">
          <circle className="progress-circle-bg" cx="50" cy="50" r="45"></circle>
          <circle className="progress-circle-fill" cx="50" cy="50" r="45"></circle>
        </svg>
      </div>
    </div>
  );
};

export default CustomProgressBar;
