import { motion } from 'framer-motion';
import React from 'react';
// Example: Add more icons as needed for your skills!
import {
  FaReact, FaJs, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub, FaDatabase,
  FaFigma, FaJava, FaLinux, FaDocker, FaSwift
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiCplusplus, SiMongodb, SiRedux } from 'react-icons/si';

interface SkillChipProps {
  skill: string;
}

const gradientTextClass =
  'bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover';

// Map skills to icons (add/edit as you wish)
const skillIconMap: Record<string, React.ReactNode> = {
  React: <FaReact className="text-sky-400" />,
  JavaScript: <FaJs className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-300" />,
  HTML: <FaHtml5 className="text-orange-400" />,
  CSS: <FaCss3Alt className="text-blue-400" />,
  TailwindCSS: <SiTailwindcss className="text-cyan-300" />,
  NextJS: <SiNextdotjs className="text-black dark:text-white" />,
  NodeJS: <FaNodeJs className="text-green-600" />,
  Python: <FaPython className="text-yellow-300" />,
  Git: <FaGitAlt className="text-orange-500" />,
  GitHub: <FaGithub />,
  MongoDB: <SiMongodb className="text-green-500" />,
  SQL: <FaDatabase className="text-blue-500" />,
  Figma: <FaFigma className="text-pink-500" />,
  Java: <FaJava className="text-red-500" />,
  Linux: <FaLinux className="text-gray-300" />,
  Docker: <FaDocker className="text-blue-400" />,
  Swift: <FaSwift className="text-orange-400" />,
  "C++": <SiCplusplus className="text-blue-400" />,
  Redux: <SiRedux className="text-purple-400" />,
};

const SkillChip = ({ skill }: SkillChipProps) => {
  const icon = skillIconMap[skill] || null;

  return (
    <motion.span
      className={`inline-flex items-center gap-2 bg-foreground/10 text-foreground px-3 py-1 rounded-full text-base font-space-grotesk ${gradientTextClass} mr-2 mb-2`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      aria-label={skill}
      title={skill}
    >
      {icon}
      <span>{skill}</span>
    </motion.span>
  );
};

export default React.memo(SkillChip);
