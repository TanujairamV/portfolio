import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .project-card');
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
    <motion.div
      className={`fixed pointer-events-none z-[99999] rounded-full transition-colors duration-200 ${
        isHovering ? 'w-10 h-10 border-2' : 'w-6 h-6 border'
      }`}
      style={{
        transform: `translate(${position.x - (isHovering ? 20 : 12)}px, ${position.y - (isHovering ? 20 : 12)}px)`,
        borderColor: isDarkMode ? '#ffffff' : '#000000',
        background: isHovering ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
      }}
      animate={{ scale: isHovering ? 1.2 : 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}
