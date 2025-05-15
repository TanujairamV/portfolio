import { motion } from 'framer-motion';
import { Project } from './types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { name, url, tech, description } = project;

  return (
    <motion.div
      className="material-card bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h3 className="text-2xl font-space-grotesk mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover" transition={{ duration: 0.3 }}>
        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          {name}
        </a>
      </motion.h3>
      <motion.p className="text-base bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4 invert-on-hover" transition={{ duration: 0.3 }}>
        {description}
      </motion.p>
      <motion.div className="flex flex-wrap gap-2" transition={{ duration: 0.3 }}>
        {tech.map((t: string) => (
          <motion.span
            key={t}
            className="inline-block bg-foreground/10 text-foreground px-3 py-1 rounded-full text-base font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            transition={{ duration: 0.3 }}
          >
            {t}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
