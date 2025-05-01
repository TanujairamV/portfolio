import { useState, useEffect } from 'react';

export default function Cursor({ isMobile, isDarkMode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isMobile) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleHoverEnter = () => setIsHovering(true);
    const handleHoverLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    const hoverElements = document.querySelectorAll('a, button, input, textarea');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, [isMobile]);

  if (!isVisible || isMobile) return null;

  return (
    <div
      className={`fixed pointer-events-none z-[99999] rounded-full transition-all duration-200 ${
        isHovering ? 'w-12 h-12 border-4' : 'w-8 h-8 border-2'
      }`}
      style={{
        transform: `translate(${position.x - (isHovering ? 24 : 16)}px, ${position.y - (isHovering ? 24 : 16)}px)`,
        borderColor: isDarkMode ? '#ffffff' : '#000000',
        background: isHovering ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
      }}
    />
  );
}
