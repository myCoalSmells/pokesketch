import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { ChromePicker, ColorResult } from 'react-color';
import { PiPencilDuotone } from 'react-icons/pi';
import { CgColorBucket } from 'react-icons/cg';
import { BsTrash } from 'react-icons/bs';
import { BiUndo } from 'react-icons/bi';
// import Timer from './Timer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function Game() {
  const canvasRef = useRef<any>(null);
  const [color, setColor] = useState('#000');

  const handleColorChange = (newColor: ColorResult) => {
    setColor(newColor.hex);
  };

  const handleEraseAll = () => {
    canvasRef.current?.eraseAll();
  };

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CountdownCircleTimer
        isPlaying
        duration={120}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            border: '3px solid black',
            backgroundColor: '#D9D9D9',
            height: 600,
            width: 400,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '1rem',
          }}
        >
          <span>Players</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              border: '3px solid black',
              width: 1000,
              height: 600,
              marginLeft: 100,
            }}
          >
            <CanvasDraw
              ref={canvasRef}
              hideGrid
              canvasWidth={1000}
              canvasHeight={600}
              brushColor={color}
            />

            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}>
                <BiUndo
                  style={{ fontSize: '48px', marginRight: '1rem' }}
                  onClick={handleUndo}
                />
                <PiPencilDuotone style={{ fontSize: '48px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}>
                <BsTrash
                  style={{ fontSize: '48px', marginRight: '1rem' }}
                  onClick={handleEraseAll}
                />
                <CgColorBucket style={{ fontSize: '48px' }} />
              </div>
            </div>
            <ChromePicker color={color} onChange={handleColorChange} />

          </div>

        </div>
      </div>
    </div>
  );
}

export default Game;
