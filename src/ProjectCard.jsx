import { motion } from 'framer-motion';

function ProjectCard({ name, url, tech }) {
  return (
    <motion.div
      className="glass-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-clash-grotesk text-heading">{name}</h3>
      <p className="mt-2 text-[#D1D1D1] font-chillax">{tech.join(', ')}</p>
      <a
        href={url}
        className="mt-4 inline-block btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Project
      </a>
    </motion.div>
  );
}

export default ProjectCard;
