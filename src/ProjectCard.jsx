import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

function ProjectCard({ name, url, tech, description, image }) {
  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3} glareColor="#FFD700">
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <img src={image} alt={name} className="project-card-image" />
          <div className="project-card-overlay"></div>
        </div>
        <div className="project-card-content">
          <h3 className="text-2xl font-cabinet-grotesk text-heading">{name}</h3>
          <p className="mt-2 text-sm font-inter text-white dark:text-white light:text-black line-clamp-3">
            {description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="project-card-tech">
                {t}
              </span>
            ))}
          </div>
          <a
            href={url}
            className="mt-4 inline-block btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </div>
      </motion.div>
    </Tilt>
  );
}

export default ProjectCard;
