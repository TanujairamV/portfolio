import { motion } from 'framer-motion';

function SkillBubble({ skill, proficiency, level }) {
  return (
    <motion.div
      className="skill-bubble my-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-sm font-inter">{skill}</span>
      <span className="text-xs font-inter">({proficiency})</span>
      <div className="progress-bar w-32">
        <div
          className="progress-bar-fill"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </motion.div>
  );
}

export default SkillBubble;
