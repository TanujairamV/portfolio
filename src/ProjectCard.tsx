import { motion } from 'framer-motion';
import { Project } from './types';
import React from 'react';

interface ProjectCardProps {
  project: Project;
}

// Utility class for consistent gradient text styling
const gradientTextClass =
  'bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover';

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { name, url, tech, description } = project;

  return (
    <motion.div
      className="material-card bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className={`text-2xl font-space-grotesk mb-2 ${gradientTextClass}`}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent"
          aria-label={`Visit ${name}`}
          title={`Visit ${name}`}
        >
          {name}
        </a>
      </h3>

      <p className={`text-base mb-4 font-light ${gradientTextClass}`}>
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className={`inline-block bg-foreground/10 text-foreground px-3 py-1 rounded-full text-base font-space-grotesk ${gradientTextClass}`}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
