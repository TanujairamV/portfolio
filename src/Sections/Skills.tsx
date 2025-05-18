import { motion } from 'framer-motion';
import React from 'react';
import {
  FaReact, FaJs, FaPython, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub, FaDatabase,
  FaFigma, FaJava, FaLinux, FaDocker, FaSwift
} from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiCplusplus, SiMongodb, SiRedux } from 'react-icons/si';

// List your skills here as strings
const skills = [
  "React",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "TailwindCSS",
  "NextJS",
  "NodeJS",
  "Python",
  "Git",
  "GitHub",
  "MongoDB",
  "SQL",
  "Figma",
  "Java",
  "Linux",
  "Docker",
  "Swift",
  "C++",
  "Redux",
];

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

const gradientTextClass =
  'bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover';

const Skillchip: React.FC = () => {
  // Duplicate skills to enable smooth infinite scrolling
  const scrollingSkills = [...skills, ...skills];

  return (
    <section className="w-full py-8 md:py-14">
      <h2
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
        style={{
          background: "linear-gradient(90deg, #fff, #b0b0b0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        My Skills
      </h2>
      <div className="overflow-x-auto scrollbar-hide w-full">
        <div
          className="flex flex-nowrap gap-3 px-2 py-3"
          style={{
            animation: "scroll-left 40s linear infinite",
            minWidth: "100%",
            whiteSpace: "nowrap",
          }}
        >
          {scrollingSkills.map((skill, idx) => {
            const icon = skillIconMap[skill] || null;
            return (
              <motion.span
                className={`inline-flex items-center gap-2 bg-foreground/10 text-foreground px-3 py-1 rounded-full text-base font-space-grotesk ${gradientTextClass} mr-2 mb-2`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                aria-label={skill}
                title={skill}
                key={skill + idx}
              >
                {icon}
                <span>{skill}</span>
              </motion.span>
            );
          })}
        </div>
      </div>
      {/* Add this keyframes style globally or here */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default React.memo(Skillchip);
