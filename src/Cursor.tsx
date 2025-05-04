import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="cursor-material fixed"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.15 }}
    />
  );
};

export default Cursor;
