import { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

function ProjectCard({ name, url, tech, description, image }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.5} glareColor="#FFD700">
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        whileHover={{ scale: 1.08, boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)' }}
        whileTap={{ scale: 0.92 }}
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
          <h3 className="text-3xl font-cabinet-grotesk text-heading">{name}</h3>
          <p className="mt-4 text-base font-inter text-white dark:text-white light:text-black line-clamp-2">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {tech.map((t) => (
              <span key={t} className="project-card-tech">
                {t}
              </span>
            ))}
          </div>
          <a
            href={url}
            className="mt-6 inline-block btn"
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
