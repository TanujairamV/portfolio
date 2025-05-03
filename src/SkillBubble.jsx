import { motion } from 'framer-motion';

function SkillBubble({ skill, proficiency, level }) {
  return (
    <motion.div
      className="skill-bubble"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <span className="text-base font-inter">{skill}</span>
      <span className="text-sm font-inter text-subheading">({proficiency})</span>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </motion.div>
  );
}

export default SkillBubble;
