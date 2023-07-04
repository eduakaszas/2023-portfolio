export const setupCanvas = (
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null,
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>
) => {
  if (!canvas) return;
  if (!context) return;

  canvas.width = canvas.offsetWidth * 2;
  canvas.height = canvas.offsetHeight * 2;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  context.scale(2, 2);
  context.lineCap = 'round';
  context.lineWidth = 3;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  contextRef.current = context;
};
