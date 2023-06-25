import { useState } from 'react';
import About from '../About';
import Canvas from '../Canvas';
import PaintBuckets from '../PaintBuckets';
import './styles.scss';

export default function Home() {
  const [pickedColor, setPickedColor] = useState<string>('black');

  return (
    <div>
      <About />
      <Canvas
        width={window.innerWidth}
        height={window.innerHeight}
        pickedColor={pickedColor}
      />
      <PaintBuckets pickedColor={pickedColor} setPickedColor={setPickedColor} />
    </div>
  );
}
