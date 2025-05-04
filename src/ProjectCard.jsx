import { motion } from 'framer-motion';

function ProjectCard({ name, url, tech, description, aosDelay }) {
  return (
    <motion.div
      className="material-card p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      data-aos="slide-up"
      data-aos-delay={aosDelay}
    >
      <h3 className="text-xs font-cabinet-grotesk text-heading text-center">{name}</h3>
      <p className="mt-0.5 text-[0.65rem] font-inter text-subheading text-center line-clamp-1">{description}</p>
      <div className="mt-0.5 flex flex-wrap gap-0.5 justify-center">
        {tech.map((t) => (
          <span key={t} className="material-chip">{t}</span>
        ))}
      </div>
      <div className="mt-1 flex justify-center">
        <a
          href={url}
          className="btn material-btn text-[0.65rem]"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
