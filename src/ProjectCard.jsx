import { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

function ProjectCard({ name, url, tech, description, image }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3} glareColor="#FFD700">
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <img
            src={imgError ? fallbackImage : image}
            alt={name}
            className="project-card-image"
            onError={() => setImgError(true)}
          />
          <div className="project-card-overlay"></div>
        </div>
        <div className="project-card-content">
          <h3 className="text-lg font-cabinet-grotesk text-heading">{name}</h3>
          <p className="mt-1 text-xs font-inter text-white dark:text-white light:text-black line-clamp-2">
            {description}
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {tech.map((t) => (
              <span key={t} className="project-card-tech">
                {t}
              </span>
            ))}
          </div>
          <a
            href={url}
            className="mt-2 inline-block btn"
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
