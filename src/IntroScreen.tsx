import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const IntroScreen = () => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const finalText = 'Tanujairam V';

  useEffect(() => {
    let currentText = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charIndex = 0;

    const scramble = () => {
      if (charIndex < finalText.length) {
        currentText = finalText.slice(0, charIndex);
        for (let i = charIndex; i < finalText.length; i++) {
          currentText += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setText(currentText);
        charIndex++;
      } else {
        setText(finalText);
        setTimeout(() => {
          setIsVisible(false);
        }, 1000);
      }
    };

    const interval = setInterval(scramble, 50); // Reduced from typical 100ms to 50ms for faster scrambling
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl md:text-6xl font-space-grotesk text-white">{text}</h1>
    </motion.div>
  );
};

export default IntroScreen;
