import { motion } from 'framer-motion';

interface SkillChipProps {
  skill: string;
  proficiency: string;
  icon: string;
  aosDelay: number;
}

const SkillChip = ({ skill, proficiency, icon, aosDelay }: SkillChipProps) => {
  return (
    <motion.div
      className="material-chip p-0.75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      data-aos="fade-in"
      data-aos-delay={aosDelay}
    >
      <div className="flex items-center gap-0.25 justify-center">
        <i className={`${icon} text-[0.6rem]`}></i>
        <span className="text-[0.6rem] font-inter">{skill}</span>
      </div>
      <div className="mt-0.25 text-[0.6rem] font-inter text-subheading text-center">{proficiency}</div>
    </motion.div>
  );
};

export default SkillChip;
