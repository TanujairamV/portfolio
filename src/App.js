import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import MainPage from './components/MainPage'; // Your existing main content

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <AnimatePresence>
      {showIntro ? (
        <IntroScreen onComplete={handleIntroComplete} />
      ) : (
        <MainPage />
      )}
    </AnimatePresence>
  );
}

export default App;
