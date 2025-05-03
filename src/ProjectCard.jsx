import { motion } from 'framer-motion';

function ProjectCard({ name, url, tech, description, image }) {
  return (
    <motion.div
      className="glass-card"
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl font-cabinet-grotesk text-heading">{name}</h3>
        <p className="mt-2 text-sm font-inter text-white dark:text-white light:text-black">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs font-inter bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-300 text-white dark:text-white light:text-black rounded-full"
            >
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
  );
}

export default ProjectCard;
