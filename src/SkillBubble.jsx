import { motion } from 'framer-motion';

function SkillBubble({ skill }) {
  return (
    <motion.div
      className="glass-card px-4 py-2 text-sm font-medium"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      {skill}
    </motion.div>
  );
}

export default SkillBubble;
