import { motion } from 'framer-motion';

function Intro({ onComplete }) {
  return (
    <motion.div
      id="intro"
      className="fixed inset-0 flex items-center justify-center bg-dark z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, delay: 1.5 }}
      onAnimationComplete={onComplete}
    >
      <motion.h1
        className="text-5xl font-cabinet-grotesk text-heading"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Tanujairam
      </motion.h1>
    </motion.div>
  );
}

export default Intro;
