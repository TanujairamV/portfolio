import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Scrambler from './Scrambler';
import Cursor from './Cursor';
import NavBar from './NavBar';
import ContactForm from './ContactForm';
import ParticlesBackground from './ParticlesBackground';
import Tilt from 'react-parallax-tilt';

export default function Portfolio() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const newMobile = window.innerWidth <= 768;
      setIsMobile(newMobile);
      console.log('Portfolio: Window resized, isMobile:', newMobile);
    };
    window.addEventListener('resize', handleResize);

    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    const savedMode = localStorage.getItem('darkMode');
    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedMode ? savedMode === 'true' : systemDarkMode;
    setIsDarkMode(initialDarkMode);
    document.documentElement.classList.toggle('dark', initialDarkMode);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  const projects = [
    {
      title: 'Workflow App',
      description: 'A React and Node.js web app to streamline user workflows.',
      link: 'https://github.com/tanujairam',
    },
    {
      title: 'Mobile App',
      description: 'A Flutter-based mobile app for cross-platform performance.',
      link: 'https://github.com/tanujairam',
    },
  ];

  const skills = ['React', 'Node.js', 'JavaScript', 'Tailwind CSS', 'Flutter', 'Git'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Particles Background */}
      <ParticlesBackground isDarkMode={isDarkMode} />

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-[10000]">
          <Scrambler text="Tanujairam" />
        </div>
      )}

      {/* Custom Cursor */}
      {!isLoading && <Cursor isMobile={isMobile} isDarkMode={isDarkMode} />}

      {/* Navigation Bar */}
      <NavBar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        time={time}
      />

      {/* Hero Section */}
      <motion.section
        id="home"
        className="min-h-screen flex items-center justify-center text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="glassmorphic-card p-8 rounded-2xl max-w-2xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Tanu Jairam
          </motion.h1>
          <p className="text-xl md:text-2xl mb-8">Student | Developer | Innovator</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/tanujairam"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49v-1.71c-2.78.6-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.564 9.564 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.56.84.56 1.69v2.5c0 .27.16.59.67.5A10.013 10.013 0 0022 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/tanujairam"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9.36h3.41v1.52h.05c.48-.91 1.65-1.87 3.39-1.87 3.62 0 4.29 2.38 4.29 5.48v6.96zM5.34 7.83c-1.15 0-2.08-.93-2.08-2.08s.93-2.08 2.08-2.08 2.08.93 2.08 2.08-.93 2.08-2.08 2.08zm1.78 12.62H3.56V9.36h3.56v11.09zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
              </svg>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Tilt key={index}>
              <motion.div
                className="glassmorphic-card p-6 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-lg mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:underline"
                >
                  View on GitHub
                </a>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="glassmorphic-card px-4 py-2 rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">About Me</h2>
        <div className="glassmorphic-card p-8 rounded-xl max-w-2xl mx-auto">
          <p className="text-lg">
            I'm a passionate developer focused on creating innovative web and mobile applications. With a strong foundation in modern technologies, I strive to build solutions that are both functional and visually stunning.
          </p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Contact</h2>
        <div className="glassmorphic-card p-8 rounded-xl max-w-lg mx-auto">
          <ContactForm isDarkMode={isDarkMode} />
        </div>
      </motion.section>
    </div>
  );
}
