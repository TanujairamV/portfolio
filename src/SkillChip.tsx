import { motion } from 'framer-motion';
import React from 'react';

interface SkillChipProps {
  skill: string;
}

const gradientTextClass =
  'bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover';

const SkillChip = ({ skill }: SkillChipProps) => {
  return (
    <motion.span
      className={`inline-block bg-foreground/10 text-foreground px-3 py-1 rounded-full text-base font-space-grotesk ${gradientTextClass} mr-2 mb-2`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      aria-label={skill}
      title={skill}
    >
      {skill}
    </motion.span>
  );
};

export default React.memo(SkillChip);
