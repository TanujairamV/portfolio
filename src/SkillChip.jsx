import { motion } from 'framer-motion';

function SkillChip({ skill, proficiency, icon, aosDelay }) {
  return (
    <motion.div
      className="material-chip p-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      data-aos="fade-in"
      data-aos-delay={aosDelay}
    >
      <div className="flex items-center gap-0.5 justify-center">
        <i className={`${icon} text-[0.65rem]`}></i>
        <span className="text-[0.65rem] font-inter">{skill}</span>
      </div>
      <div className="mt-0.5 text-[0.65rem] font-inter text-subheading text-center">{proficiency}</div>
    </motion.div>
  );
}

export default SkillChip;
