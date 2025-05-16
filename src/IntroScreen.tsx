import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScreen = () => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const finalText = 'Tanujairam V';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  useEffect(() => {
    let charIndex = 0;
    let animationFrame: number;

    const scramble = () => {
      if (charIndex < finalText.length) {
        let displayedText = finalText.slice(0, charIndex);
        for (let i = charIndex; i < finalText.length; i++) {
          displayedText += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setText(displayedText);
        charIndex++;
        animationFrame = window.setTimeout(scramble, 50);
      } else {
        setText(finalText);
        setTimeout(() => setIsVisible(false), 1000);
      }
    };

    scramble();

    return () => {
      clearTimeout(animationFrame);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <h1 className="text-4xl md:text-6xl font-space-grotesk text-white select-none">{text}</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
