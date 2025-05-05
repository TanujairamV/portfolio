import { useEffect, useRef } from 'react';
import { useMousePosition } from './util/mouse';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.transform = `translate(${x - 16}px, ${y - 16}px)`; // Center the 32px cursor
    }
  }, [x, y]);

  return <div ref={cursorRef} className="cursor" />;
};

export default Cursor;
