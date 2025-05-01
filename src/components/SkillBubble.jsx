import { motion } from 'framer-motion';

export default function SkillBubble({ skill }) {
  return (
    <motion.div
      className="glassmorphic px-4 py-2 rounded-full text-base font-inter text-gray-600 dark:text-gray-300 cursor-default"
      whileHover={{ scale: 1.2, rotate: 10, backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {skill}
    </motion.div>
  );
}
