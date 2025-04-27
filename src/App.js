import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import Portfolio from './components/Portfolio';
import Navbar from './components/Navbar';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {!showIntro && <Navbar />}
      <AnimatePresence>
        {showIntro ? (
          <IntroScreen onComplete={handleIntroComplete} />
        ) : (
          <Portfolio />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
