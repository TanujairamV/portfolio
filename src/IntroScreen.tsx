import { useEffect, useState } from 'react';

const IntroScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const finalText = 'Welcome to My Portfolio';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const duration = 3000;

  useEffect(() => {
    let iteration = 0;
    const maxIterations = 30;
    const interval = duration / maxIterations;

    const scrambleInterval = setInterval(() => {
      setDisplayText(
        finalText
          .split('')
          .map((char, index) => {
            if (index < iteration / maxIterations * finalText.length) {
              return char;
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration > maxIterations) {
        clearInterval(scrambleInterval);
        setDisplayText(finalText);
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }
    }, interval);

    return () => clearInterval(scrambleInterval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-[10000]">
      <h1 className="text-5xl md:text-7xl font-space-grotesk text-foreground animate-pulse">
        {displayText}
      </h1>
    </div>
  );
};

export default IntroScreen;
