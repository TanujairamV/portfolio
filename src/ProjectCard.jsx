import { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

function ProjectCard({ name, url, tech, description, image, aosDelay }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.6} glareColor="#FFD700">
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.06, boxShadow: '0 20px 40px rgba(107, 70, 193, 0.5)' }}
        whileTap={{ scale: 0.9 }}
        data-aos="zoom-in"
        data-aos-delay={aosDelay}
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
          <h3 className="text-2xl font-cabinet-grotesk text-heading">{name}</h3>
          <p className="mt-2 text-sm font-inter text-subheading line-clamp-2">
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
            className="mt-4 inline-block btn glass-btn"
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
