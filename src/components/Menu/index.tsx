import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
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
    <div className="menu-container">
      <div className="menu-bar">
        <PaintBuckets
          pickedColor={pickedColor}
          setPickedColor={setPickedColor}
        />
        <div className="button-container">
          <button onClick={clearCanvas}>
            <FontAwesomeIcon icon={faTrash} style={{ color: '#000000' }} />
          </button>
          <button onClick={downloadDrawing}>
            <FontAwesomeIcon icon={faDownload} style={{ color: '#000000' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
