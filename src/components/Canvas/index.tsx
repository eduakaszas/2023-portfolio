import { useEffect, useState } from 'react';
import { setupCanvas } from '../../utils/setupCanvas';
import './styles.scss';

interface CanvasProps {
  pickedColor: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.RefObject<CanvasRenderingContext2D | null> | any;
  linesRef: React.RefObject<{ x: number; y: number; color: string }[][]>;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const { pickedColor, canvasRef, contextRef, linesRef } = props;

  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);

  // Listen to the window resize event and call the handleResize function
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    setupCanvas(canvas, context, contextRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, contextRef]);

  // This useEffect hook will run when the pickedColor changes.
  useEffect(() => {
    if (!contextRef.current) return;

    contextRef.current.strokeStyle = pickedColor;
  }, [pickedColor, contextRef]);

  // This function runs when the user starts drawing aka onPointerDown.
  const handleCanvasPointerDown = ({
    nativeEvent,
  }: React.PointerEvent<HTMLElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = contextRef.current;
    const lines = linesRef.current;

    if (!context || !lines) return;

    context.beginPath();
    context.moveTo(offsetX, offsetY);

    setIsPointerDown(true);

    // Create a new line array if linesRef.current is empty or the last line array is not empty aka a line was already drawn
    if (lines.length === 0 || lines[lines.length - 1].length > 0) {
      lines.push([]);
    }

    // Add the current point to the last line array
    lines[lines.length - 1].push({
      x: offsetX,
      y: offsetY,
      color: pickedColor,
    });
  };

  // This function runs while the user is drawing on the canvas aka onPointerMove
  const handleCanvasPointerMove = ({
    nativeEvent,
  }: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDown || !linesRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    const lines = linesRef.current;
    const context = contextRef.current;
    const canvas = canvasRef.current;

    if (!context || !canvas) return;

    // clear the canvas after each line drawn for the lines to be better quality - otherwise the lines are pixelated
    context.clearRect(0, 0, canvas.width, canvas.height);

    // iterate over the lines array and draw them on the canvas
    for (const line of lines) {
      // Skip the incomplete lines
      if (line.length < 2) continue;

      const lineColor = line[0].color; // Get the color of the line

      context.beginPath();
      context.moveTo(line[0].x, line[0].y);
      context.strokeStyle = lineColor; // apply the color to the current line

      // use Bezier curves to draw the lines for smoother lines
      // we need to skip the first and last point of the line array because we already drew them with moveTo and lineTo hence the line.length - 2
      for (let i = 1; i < line.length - 2; i++) {
        const controlPointX = (line[i].x + line[i + 1].x) / 2;
        const controlPointY = (line[i].y + line[i + 1].y) / 2;

        context.quadraticCurveTo(
          line[i].x,
          line[i].y,
          controlPointX,
          controlPointY
        );
      }

      context.stroke();
    }

    // Add the current point to the last line array
    lines[lines.length - 1].push({
      x: offsetX,
      y: offsetY,
      color: pickedColor,
    });
  };

  const handleCanvasPointerUp = () => {
    if (!linesRef.current) return;

    contextRef.current?.closePath();
    setIsPointerDown(false);
  };

  return (
    <canvas
      ref={canvasRef}
      className="canvas"
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handleCanvasPointerMove}
      onPointerUp={handleCanvasPointerUp}
      style={{ width: window.innerWidth, height: window.innerHeight }}
    />
  );
};

export default Canvas;
