import './styles.scss';

interface PaintBucketsProps {
  pickedColor: string;
  setPickedColor: React.Dispatch<React.SetStateAction<string>>;
}

const PaintBuckets: React.FC<PaintBucketsProps> = (props) => {
  const { pickedColor, setPickedColor } = props;

  const palette = [
    { name: 'white', hex: '#FFFFFF' },
    { name: 'red', hex: '#FFC1C1' },
    { name: 'blue', hex: '#99E2FA' },
    { name: 'green', hex: '#9ED095' },
    { name: 'black', hex: '#474747' },
  ];

  const pickColor = (color: string) => {
    setPickedColor(color);
  };

  return (
    <div className="paint-container">
      <ul>
        {palette.map((color) => (
          <li key={color.name}>
            <button
              className={`paint-bucket ${
                pickedColor === color.hex ? 'active' : 'inactive'
              }`}
              style={{ backgroundColor: color.hex }}
              name={color.hex}
              onClick={() => pickColor(color.hex)}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaintBuckets;
