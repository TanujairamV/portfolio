import { motion } from 'framer-motion';

function ProjectCard({ name, url, tech }) {
  return (
    <motion.div
      className="glass-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-poppins">{name}</h3>
      <p className="mt-2 text-sm text-gray-400">
        Technologies: {tech.join(', ')}
      </p>
      <a
        href={url}
        className="mt-4 inline-block btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub
      </a>
    </motion.div>
  );
}

export default ProjectCard;
