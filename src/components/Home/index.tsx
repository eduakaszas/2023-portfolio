import React from 'react';
import About from '../About';
import Canvas from '../Canvas';
import './styles.scss';

export default function Home() {
  return (
    <div className="container">
      <About />
      <Canvas />
    </div>
  );
}
