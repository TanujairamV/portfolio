import { motion } from 'framer-motion';

function SkillBubble({ skill, proficiency, level, aosDelay }) {
  return (
    <motion.div
      className="skill-bubble"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
      data-aos-delay={aosDelay}
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
