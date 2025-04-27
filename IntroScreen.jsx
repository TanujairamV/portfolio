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
      }, 100); // typing speed (ms)
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        onComplete();
      }, 1000); // Wait 1s after typing finishes
    }
  }, [index, fullText, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="intro-screen"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {displayedText}
    </motion.div>
  );
};

export default IntroScreen;
