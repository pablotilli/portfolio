import { useState } from 'react';
import Draggable from 'react-draggable';
import './styles.css';

const Slider = ({
  handleTurnOn,
  visible,
  color,
  text,
  translucent,
}: {
  handleTurnOn: (lightState: boolean) => void;
  visible: boolean;
  color?: string;
  text: string;
  translucent: boolean;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: any, data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: 0 });
  };

  const handleStop = () => {
    if (position.x >= 150) {
      handleTurnOn(false);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div
      className={`slider-container ${
        visible
          ? translucent
            ? 'slider-visible-with-translucent'
            : 'slider-visible'
          : ''
      }`}
      style={{
        backgroundImage: color
          ? `linear-gradient(to right, ${color}, ${color})`
          : 'linear-gradient(to right, #4caf50, #81c784)',
      }}
    >
      <Draggable
        axis="x"
        bounds="parent"
        position={position}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div
          className="slider-thumb"
          style={{ opacity: translucent ? '0.6' : '1' }}
        >
          <img src="/images/power-icon.png" alt="Power Icon" />
        </div>
      </Draggable>
      <div className="slider-track">
        <span className="slider-label">{text}</span>
      </div>
    </div>
  );
};

export default Slider;
