import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Scrambler({ text }) {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ' '));
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let interval;
    let glitchInterval;

    const scramble = () => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText((prev) =>
          prev.map((_, index) =>
            index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)]
          )
        );
        iteration += 0.5;
        if (iteration >= text.length) clearInterval(interval);
      }, 60);
    };

    glitchInterval = setInterval(() => {
      setGlitch((prev) => !prev);
    }, 200);

    scramble();
    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, [text]);

  return (
    <motion.div
      className={`text-5xl md:text-7xl font-bold font-poppins text-white ${glitch ? 'glitch' : ''}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {displayText.join('')}
    </motion.div>
  );
}
