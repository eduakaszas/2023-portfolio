import { useEffect, useState } from 'react';
import './styles.scss';

interface CanvasProps {
  pickedColor: string;
  canvasRef: any;
  contextRef: any;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { pickedColor, canvasRef, contextRef } = props;

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // This useEffect hook will run once when the component mounts.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.scale(2, 2);
    context.lineCap = 'round';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  // This useEffect hook will run when the pickedColor changes.
  useEffect(() => {
    if (!contextRef.current) return;

    contextRef.current.strokeStyle = pickedColor;
  }, [pickedColor, contextRef]);

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);

    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
    />
  );
};

export default Canvas;
