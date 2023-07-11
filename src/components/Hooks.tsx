import { useRef, useEffect } from 'react';

export interface Point {
  x: number,
  y: number
}

function useOnDraw(onDraw: Function) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const prevPointRef = useRef<Point | null>(null);

  const mouseMoveRef = useRef<((event: MouseEvent) => void) | null>(null);
  const mouseUpRef = useRef<((event: MouseEvent) => void) | null>(null);

  useEffect(() => {
    function calculateCanvasPosition(clientX: number, clientY: number): Point | null {
      if (canvasRef.current) {
        const canvasOutline = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - canvasOutline.left,
          y: clientY - canvasOutline.top,
        };
      }
      return null;
    }
    function createMouseUpListener() {
      const mouseUpListener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
      };
      mouseUpRef.current = mouseUpListener;
      window.addEventListener('mouseup', mouseUpListener);
    }
    function createMouseMoveListener() {
      const mouseListener = (event: MouseEvent) => {
        if (isDrawingRef.current) {
          const point = calculateCanvasPosition(event.clientX, event.clientY);
          const context = canvasRef.current?.getContext('2d');
          if (onDraw) onDraw(context, point, prevPointRef.current);
          prevPointRef.current = point;
        }
      };
      mouseMoveRef.current = mouseListener;
      window.addEventListener('mousemove', mouseListener);
    }
    function removeMouseListeners() {
      if (mouseMoveRef.current) {
        window.removeEventListener('mousemove', mouseMoveRef.current);
      }
      if (mouseUpRef.current) {
        window.removeEventListener('mouseup', mouseUpRef.current);
      }
    }
    createMouseMoveListener();
    createMouseUpListener();
    return () => {
      removeMouseListeners();
    };
  }, [onDraw]);

  function setCanvasRef(ref: any) {
    canvasRef.current = ref;
  }

  function handleMouseDown() {
    isDrawingRef.current = true;
  }

  return {
    setCanvasRef,
    handleMouseDown,
  };
}

export default useOnDraw;
