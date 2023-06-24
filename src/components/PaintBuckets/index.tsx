import React from 'react';
import './styles.scss';

export default function PaintBuckets() {
  const colors = [
    { color: 'white', hex: '#FFFFFF' },
    { color: 'red', hex: '#FFC1C1' },
    { color: 'blue', hex: '#99E2FA' },
    { color: 'green', hex: '#9ED095' },
    { color: 'black', hex: '#474747' },
  ];

  return (
    <div className="paint-container">
      <ul>
        {colors.map((color) => (
          <li
            className="paint-bucket"
            style={{ backgroundColor: color.hex }}
          ></li>
        ))}
      </ul>
    </div>
  );
}
