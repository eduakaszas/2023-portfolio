import React, { useEffect } from 'react';
import './styles.scss';

interface PaintBucketsProps {
  pickedColor: string;
  setPickedColor: React.Dispatch<React.SetStateAction<string>>;
}

const PaintBuckets: React.FC<PaintBucketsProps> = (props) => {
  const palette = [
    { name: 'white', hex: '#FFFFFF' },
    { name: 'red', hex: '#FFC1C1' },
    { name: 'blue', hex: '#99E2FA' },
    { name: 'green', hex: '#9ED095' },
    { name: 'black', hex: '#474747' },
  ];

  const pickColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;

    palette.map((color) => {
      if (color.name === name) {
        props.setPickedColor(color.hex);
      }
    });
  };

  return (
    <div className="paint-container">
      <ul>
        {palette.map((color) => (
          <li>
            <button
              className="paint-bucket"
              style={{ backgroundColor: color.hex }}
              name={color.name}
              onClick={pickColor}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaintBuckets;
