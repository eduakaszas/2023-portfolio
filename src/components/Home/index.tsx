import { useState, useRef } from 'react';
import About from '../About';
import Canvas from '../Canvas';
import Menu from '../Menu';
import './styles.scss';

const Home = () => {
  const [pickedColor, setPickedColor] = useState<string>('black');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // This function will clear the canvas.
  const clearCanvas = () => {
    if (!contextRef.current) return;

    contextRef.current.clearRect(
      0,
      0,
      window.innerWidth * 2,
      window.innerHeight * 2
    );
  };

  // This function will download the drawing as a PNG file.
  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'creation.png';
    link.click();
  };

  return (
    <div>
      <Canvas
        pickedColor={pickedColor}
        canvasRef={canvasRef}
        contextRef={contextRef}
      />
      <About />
      <Menu
        pickedColor={pickedColor}
        setPickedColor={setPickedColor}
        clearCanvas={clearCanvas}
        downloadDrawing={downloadDrawing}
      />
    </div>
  );
};

export default Home;
