import { motion } from 'framer-motion';

interface SkillChipProps {
  skill: string;
}

const SkillChip = ({ skill }: SkillChipProps) => {
  return (
    <motion.span
      className="inline-block bg-foreground/10 text-foreground px-3 py-1 rounded-full text-sm font-space-grotesk mr-2 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {skill}
    </motion.span>
  );
};

export default SkillChip;
