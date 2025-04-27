import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IntroScreen = ({ onComplete }) => {
  const fullText = "Hello, I am Tanujairam.";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [index, fullText, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="intro-screen"
    >
      {displayedText}
      <span className="blinking-cursor">|</span>
    </motion.div>
  );
};

export default IntroScreen;
