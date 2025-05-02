import { motion } from 'framer-motion';

function SkillBubble({ skill }) {
  const iconMap = {
    Python: 'devicon-python-plain',
    Bash: 'devicon-bash-plain',
    Shell: 'devicon-bash-plain',
    Selenium: 'devicon-selenium-original',
    Git: 'devicon-git-plain',
    GitHub: 'devicon-github-original',
    WSL: 'devicon-linux-plain',
  };

  return (
    <motion.div
      className="skill-bubble"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <i className={`${iconMap[skill]} text-xl`}></i>
      <span>{skill}</span>
    </motion.div>
  );
}

export default SkillBubble;
