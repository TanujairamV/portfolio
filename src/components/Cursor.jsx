import { useState, useEffect } from 'react';

export default function Cursor({ isMobile, isDarkMode }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorHovering, setIsCursorHovering] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    if (isMobile) {
      console.log('Cursor: Mobile detected, hiding cursor. Window width:', window.innerWidth);
      return;
    }

    console.log('Cursor: Setting up cursor movement');
    let rafId = null;

    const handleMouseMove = (e) => {
      const newX = e.clientX;
      const newY = e.clientY;
      setCursorPosition({ x: newX, y: newY });
      console.log('Cursor: Mouse moved:', { x: newX, y: newY, isVisible: isCursorVisible });
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
      console.log('Cursor: Mouse entered document');
    };

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
      console.log('Cursor: Mouse left document');
    };

    const handleHoverEnter = () => setIsCursorHovering(true);
    const handleHoverLeave = () => setIsCursorHovering(false);

    const updateCursor = () => {
      rafId = requestAnimationFrame(updateCursor);
    };

    // Debounce mousemove
    let timeoutId;
    const debouncedMouseMove = (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handleMouseMove(e), 10);
    };

    document.addEventListener('mousemove', debouncedMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    const hoverElements = document.querySelectorAll('a, button, input, textarea');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    updateCursor();

    return () => {
      console.log('Cursor: Cleaning up cursor movement');
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', debouncedMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  if (isMobile || !isCursorVisible) return null;

  return (
    <div
      className={`follow fixed top-0 left-0 pointer-events-none z-[99999] rounded-full transition-all duration-100 ease-out will-change-transform ${
        isCursorHovering ? 'w-16 h-16 border-[3px]' : 'w-12 h-12 border-2'
      }`}
      style={{
        transform: `translate(${cursorPosition.x - (isCursorHovering ? 32 : 24)}px, ${cursorPosition.y - (isCursorHovering ? 32 : 24)}px)`,
        mixBlendMode: 'difference',
        borderColor: '#FFFFFF',
        background: 'white',
        outline: '1px solid red', // Debug outline
      }}
    />
  );
}
