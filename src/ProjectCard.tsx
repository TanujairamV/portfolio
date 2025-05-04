import { motion } from 'framer-motion';
import { Project } from './types';

interface ProjectCardProps extends Project {
  aosDelay: number;
}

const ProjectCard = ({ name, url, tech, description, aosDelay }: ProjectCardProps) => {
  return (
    <motion.div
      className="material-card p-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      data-aos="slide-up"
      data-aos-delay={aosDelay}
    >
      <h3 className="text-[0.65rem] font-cabinet-grotesk text-heading text-center">{name}</h3>
      <p className="mt-0.25 text-[0.6rem] font-inter text-subheading text-center line-clamp-1">{description}</p>
      <div className="mt-0.25 flex flex-wrap gap-0.25 justify-center">
        {tech.map((t) => (
          <span key={t} className="material-chip">{t}</span>
        ))}
      </div>
      <div className="mt-0.5 flex justify-center">
        <a
          href={url}
          className="btn material-btn text-[0.6rem]"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
