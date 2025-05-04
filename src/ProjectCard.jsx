import { motion } from 'framer-motion';

function ProjectCard({ name, url, tech, description, aosDelay }) {
  return (
    <motion.div
      className="material-card p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      data-aos="slide-up"
      data-aos-delay={aosDelay}
    >
      <h3 className="text-sm font-cabinet-grotesk text-heading">{name}</h3>
      <p className="mt-0.5 text-xs font-inter text-subheading line-clamp-1">{description}</p>
      <div className="mt-0.5 flex flex-wrap gap-0.5">
        {tech.map((t) => (
          <span key={t} className="material-chip">{t}</span>
        ))}
      </div>
      <a
        href={url}
        className="mt-1 inline-block btn material-btn text-xs"
        target="_blank"
        rel="noopener noreferrer"
      >
        View
      </a>
    </motion.div>
  );
}

export default ProjectCard;
