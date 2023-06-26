import PaintBuckets from '../PaintBuckets';
import './styles.scss';

interface PaintBucketsProps {
  pickedColor: string;
  setPickedColor: React.Dispatch<React.SetStateAction<string>>;
  clearCanvas: () => void;
  downloadDrawing: () => void;
}

const Menu: React.FC<PaintBucketsProps> = (props) => {
  const { pickedColor, setPickedColor, clearCanvas, downloadDrawing } = props;

  return (
    <div className="menubar">
      <PaintBuckets pickedColor={pickedColor} setPickedColor={setPickedColor} />
      <button onClick={clearCanvas}>Clear</button>
      <button onClick={downloadDrawing}>Save</button>
    </div>
  );
};

export default Menu;
