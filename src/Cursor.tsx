import { useEffect, useRef } from 'react';
import { useMousePosition } from './util/mouse';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();

  // Hide cursor on mobile devices
  const isTouchDevice = 'ontouchstart' in window;
  if (isTouchDevice) return null;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Update cursor position (center the 32px cursor: w-8 h-8)
    cursor.style.transform = `translate(${x - 16}px, ${y - 16}px)`;

    // Check if cursor is off-screen
    const isOffScreen =
      x <= 0 ||
      y <= 0 ||
      x >= window.innerWidth ||
      y >= window.innerHeight;

    cursor.style.visibility = isOffScreen ? 'hidden' : 'visible';
  }, [x, y]);

  useEffect(() => {
    // Handle mouse leave event to hide cursor when mouse leaves viewport
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.visibility = 'hidden';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.visibility = 'visible';
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
};

export default Cursor;
