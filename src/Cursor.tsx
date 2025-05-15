import { useEffect, useRef, useState } from 'react';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHoveringInvertElement = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen width is less than 768px (Tailwind's md breakpoint)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip cursor logic on mobile

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.opacity = '1';
      }
    };

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('.invert-on-hover')) {
        isHoveringInvertElement.current = true;
        if (cursorRef.current) {
          cursorRef.current.style.mixBlendMode = 'difference';
          cursorRef.current.style.filter = 'invert(1) brightness(1.2)';
          cursorRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        }
      }
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('.invert-on-hover')) {
        isHoveringInvertElement.current = false;
        if (cursorRef.current) {
          cursorRef.current.style.mixBlendMode = 'normal';
          cursorRef.current.style.filter = 'invert(0)';
          cursorRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="hidden md:block fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-white/20 backdrop-invert backdrop-blur-md border border-white/30 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
    />
  );
};

export default Cursor;
