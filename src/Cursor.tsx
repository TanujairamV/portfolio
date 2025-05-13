import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from './util/mouse';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();
  const [isVisible, setIsVisible] = useState(true);

  // Hide cursor on mobile devices
  const isTouchDevice = 'ontouchstart' in window;
  if (isTouchDevice) return null;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Update cursor position
    cursor.style.transform = `translate(${x - 12}px, ${y - 12}px)`; // Center the 24px cursor (w-6 h-6)

    // Check if cursor is off-screen
    const isOffScreen =
      x <= 0 ||
      y <= 0 ||
      x >= window.innerWidth ||
      y >= window.innerHeight;

    setIsVisible(!isOffScreen);
    cursor.style.visibility = isOffScreen ? 'hidden' : 'visible';
  }, [x, y]);

  useEffect(() => {
    // Handle mouse leave event to hide cursor when mouse leaves viewport
    const handleMouseLeave = () => {
      setIsVisible(false);
      if (cursorRef.current) {
        cursorRef.current.style.visibility = 'hidden';
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
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
