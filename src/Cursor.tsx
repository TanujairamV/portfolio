import { useEffect, useRef, useState } from 'react';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isHoveringInvertElement = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updateCursorPosition = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
      cursorRef.current.style.opacity = '1';
    };

    const applyInvertStyles = () => {
      if (!cursorRef.current) return;
      cursorRef.current.style.mixBlendMode = 'difference';
      cursorRef.current.style.filter = 'invert(1) brightness(1.2)';
      cursorRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    };

    const resetStyles = () => {
      if (!cursorRef.current) return;
      cursorRef.current.style.mixBlendMode = 'normal';
      cursorRef.current.style.filter = 'invert(0)';
      cursorRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    };

    const onMouseOver = (e: Event) => {
      if ((e.target as HTMLElement).closest('.invert-on-hover')) {
        isHoveringInvertElement.current = true;
        applyInvertStyles();
      }
    };

    const onMouseOut = (e: Event) => {
      if ((e.target as HTMLElement).closest('.invert-on-hover')) {
        isHoveringInvertElement.current = false;
        resetStyles();
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="
        fixed z-50 w-8 h-8 rounded-full
        bg-white/20 backdrop-invert backdrop-blur-md border border-white/30
        pointer-events-none
        transform -translate-x-1/2 -translate-y-1/2
        transition-opacity duration-200
        hidden md:block
      "
    />
  );
};

export default Cursor;
