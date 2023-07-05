import React, { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import useOnDraw, { Point } from './Hooks';

function Canvas({ width, height }: { width: number, height: number }) {
  const [color, setColor] = useState<string>('#fefefe');
  const canvasStyle = {
    border: '5px solid black',
  };

  const handleChangeColor = () => {
    console.log('hadnling');
    setColor('#FF0000');
  };

  function drawLine(
    start: Point,
    end: Point,
    context: CanvasRenderingContext2D,
    lineColor: string,
    lineWidth: number,
  ) {
    start = start ?? end;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();

    context.fillStyle = lineColor;
    context.beginPath();
    context.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    context.fill();
  }

  function onDraw(context: CanvasRenderingContext2D, point: Point, prevPoint: Point) {
    drawLine(prevPoint, point, context, color, 5);
  }

  const {
    setCanvasRef,
    handleMouseDown,
  } = useOnDraw(onDraw);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        <ChromePicker color={color} onChange={(e: ColorResult) => setColor(e.hex)} />
        <button type="button" className="p-2 rounded-md border border-black" onClick={() => handleChangeColor}>
          Clear canvas
        </button>
      </div>
      <canvas
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        style={canvasStyle}
        ref={setCanvasRef}
      />
    </div>
  );
}

export default Canvas;
