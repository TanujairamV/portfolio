import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Scrambler({ text }) {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ' '));

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let interval;

    const scramble = () => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText((prev) =>
          prev.map((_, index) =>
            index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)],
          ),
        );
        iteration += 1 / 3;
        if (iteration >= text.length) clearInterval(interval);
      }, 50);
    };

    scramble();
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      className="text-6xl font-bold text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText.join('')}
    </motion.div>
  );
}
