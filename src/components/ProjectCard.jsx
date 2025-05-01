import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Parallax } from 'react-scroll-parallax';

export default function ProjectCard({ title, description, link, image, isDarkMode }) {
  return (
    <Parallax y={[-20, 20]} tagOuter="figure">
      <Tilt>
        <motion.div
          className="glassmorphic p-6 rounded-xl project-card cursor-pointer"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-lg mb-4"
            loading="lazy"
          />
          <h3 className="text-xl font-bold font-poppins mb-2 text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-base font-inter text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-purple-500 font-inter hover:underline"
            aria-label={`View ${title} on GitHub`}
          >
            View on GitHub
          </a>
        </motion.div>
      </Tilt>
    </Parallax>
  );
}
