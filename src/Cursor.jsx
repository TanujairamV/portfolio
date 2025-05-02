import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const hoverCursor = () => {
      gsap.to(cursorRef.current, { scale: 1.5, opacity: 0.8 });
    };

    const unhoverCursor = () => {
      gsap.to(cursorRef.current, { scale: 1, opacity: 0.7 });
    };

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', hoverCursor);
      el.addEventListener('mouseleave', unhoverCursor);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseenter', hoverCursor);
        el.removeEventListener('mouseleave', unhoverCursor);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed cursor-glass"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}

export default Cursor;
