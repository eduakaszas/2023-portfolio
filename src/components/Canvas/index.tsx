import { useEffect, useState, useRef } from 'react';
import './styles.scss';

interface CanvasProps {
  pickedColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.RefObject<CanvasRenderingContext2D | null> | any;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { pickedColor, canvasRef, contextRef } = props;

  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  // const [points, setPoints] = useState<any[]>([]);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);

  // This useEffect hook will run once when the component mounts.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.scale(2, 2);
    context.lineCap = 'round';
    context.lineWidth = 3;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    contextRef.current = context;
  }, []);

  // This useEffect hook will run when the pickedColor changes.
  useEffect(() => {
    if (!contextRef.current) return;

    contextRef.current.strokeStyle = pickedColor;
  }, [pickedColor, contextRef]);

  // This function runs when the drawing starts.
  const handleCanvasPointerDown = ({
    nativeEvent,
  }: React.PointerEvent<HTMLElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;

    if (!context) return;

    context.beginPath();
    context.moveTo(offsetX, offsetY);

    setIsPointerDown(true);
  };

  const handleCanvasPointerMove = ({
    nativeEvent,
  }: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDown) return;

    const { offsetX, offsetY } = nativeEvent;
    const currentPos = { x: offsetX, y: offsetY };
    const points = pointsRef.current;
    const context = contextRef.current;

    if (!context) return;
    if (!canvasRef.current) return;

    // store all the points in an array
    points.push(currentPos);

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    // draw a smooth path using Bezier curves
    // excluding last two points because we don't count the start and end points of the line
    for (let i = 1; i < points.length - 2; i++) {
      // calculate the control points for the Bezier curve
      const controlPointX = (points[i].x + points[i + 1].x) / 2;
      const controlPointY = (points[i].y + points[i + 1].y) / 2;

      context.quadraticCurveTo(
        points[i].x,
        points[i].y,
        controlPointX,
        controlPointY
      );
    }

    context.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    context.stroke();
  };

  // This function runs when the drawing ends.
  const handleCanvasPointerUp = () => {
    contextRef.current?.closePath();
    setIsPointerDown(false);
    pointsRef.current = []; // Reset the points array
  };

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handleCanvasPointerMove}
      onPointerUp={handleCanvasPointerUp}
    />
  );
};

export default Canvas;
