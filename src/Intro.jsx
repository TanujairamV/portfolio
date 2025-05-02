import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrambleTextPlugin);

function Intro({ onComplete }) {
  const nameRef = useRef(null);

  useEffect(() => {
    gsap.to(nameRef.current, {
      scrambleText: {
        text: 'Tanujairam',
        chars: '01ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        revealDelay: 0.5,
        speed: 0.3,
      },
      duration: 2,
      onComplete: () => {
        setTimeout(onComplete, 500);
      },
    });
  }, [onComplete]);

  return (
    <motion.div
      id="intro"
      className="min-h-screen flex items-center justify-center text-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 ref={nameRef} className="text-5xl font-montserrat"></h1>
    </motion.div>
  );
}

export default Intro;
