import { motion } from 'framer-motion';

function ProjectCard({ name, url, tech, description, image }) {
  return (
    <motion.div
      className="glass-card"
      whileHover={{ scale: 1.08, rotate: 1.5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <img src={image} alt={name} className="w-full h-56 object-cover rounded-t-xl" />
      <div className="p-6">
        <h3 className="text-2xl font-cabinet-grotesk text-heading">{name}</h3>
        <p className="mt-3 text-base font-inter text-white dark:text-white light:text-black leading-relaxed">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-sm font-inter bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-300 text-white dark:text-white light:text-black rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={url}
          className="mt-5 inline-block btn"
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
