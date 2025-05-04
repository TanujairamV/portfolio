import { motion } from 'framer-motion';

function SkillChip({ skill, proficiency, icon, aosDelay }) {
  return (
    <motion.div
      className="material-chip p-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      data-aos="fade-in"
      data-aos-delay={aosDelay}
    >
      <div className="flex items-center gap-1">
        <i className={`${icon} text-sm`}></i>
        <span className="text-xs font-inter">{skill}</span>
      </div>
      <div className="mt-0.5 text-xs font-inter text-subheading">{proficiency}</div>
    </motion.div>
  );
}

export default SkillChip;
