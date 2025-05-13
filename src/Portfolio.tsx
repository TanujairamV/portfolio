import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import IntroScreen from './IntroScreen';
import NavBar from './NavBar';
import Cursor from './Cursor';
import { ThemeProvider } from './context/ThemeContext';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const Portfolio = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <IntroScreen />
        <ParticlesBackground />
        <Cursor />
        <NavBar />
        <main className="container mx-auto px-4 py-12">
          <motion.section
            id="hero"
            className="text-center py-16"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h1 className="mb-4">Hi, I'm Tanuj</h1>
            <p className="text-subheading mb-6">A passionate developer building modern web experiences.</p>
            <div className="flex justify-center space-x-4 mb-6">
              <a href="https://github.com/TanujairamV" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaInstagram />
              </a>
              <a href="https://facebook.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200">
                <FaFacebook />
              </a>
            </div>
            <button className="material-btn mt-6">Get in Touch</button>
          </motion.section>
          <motion.section
            id="about"
            className="py-16"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h2 className="text-center mb-8">About Me</h2>
            <div className="material-card hover:scale-105 transition-transform duration-300">
              <p>I'm a developer with a focus on React, TypeScript, and Tailwind CSS.</p>
            </div>
          </motion.section>
          <motion.section
            id="projects"
            className="py-16"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h2 className="text-center mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl">Project 1</h3>
                <p>A cool project built with modern tech.</p>
              </div>
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl">Project 2</h3>
                <p>Another awesome project showcasing my skills.</p>
              </div>
            </div>
          </motion.section>
        </main>
        <footer className="bg-background/80 py-4 text-center">
          <p className="text-subheading">
            <a href="mailto:tanuj@example.com" className="hover:text-accent">tanuj@example.com</a>
          </p>
          <p className="text-subheading mt-1">2025 Tanuj. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
