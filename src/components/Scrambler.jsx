import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Scrambler({ text }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambleChar, setScrambleChar] = useState('');

  useEffect(() => {
    console.log('Scrambler: Starting animation for text:', text);

    if (currentIndex >= text.length) {
      console.log('Scrambler: Animation complete');
      return;
    }

    // Scramble for the current letter
    let iteration = 0;
    const maxIterations = 6; // ~0.3s at 50ms per iteration

    const scrambleInterval = setInterval(() => {
      if (iteration >= maxIterations) {
        // Reveal the correct letter
        setDisplayedText((prev) => prev + text[currentIndex]);
        setScrambleChar('');
        setCurrentIndex((prev) => prev + 1);
        console.log('Scrambler: Revealed letter:', text[currentIndex], 'at index:', currentIndex);
        clearInterval(scrambleInterval);
      } else {
        // Show random character
        setScrambleChar(chars[Math.floor(Math.random() * chars.length)]);
        iteration++;
      }
    }, 50);

    return () => clearInterval(scrambleInterval);
  }, [currentIndex, text]);

  return (
    <motion.h1
      className="text-6xl font-poppins font-bold text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      {scrambleChar && (
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {scrambleChar}
        </motion.span>
      )}
    </motion.h1>
  );
}
