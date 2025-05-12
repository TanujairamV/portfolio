import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import IntroScreen from './IntroScreen';
import NavBar from './NavBar';
import Cursor from './Cursor';
import { ThemeProvider } from './context/ThemeContext';

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
        <main className="container mx-auto px-6 py-16">
          <motion.section
            id="hero"
            className="text-center py-20"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h1 className="mb-6">Hi, I'm Tanuj 👋</h1>
            <p className="text-subheading">A passionate developer building modern web experiences.</p>
            <button className="material-btn mt-8">Get in Touch 📧</button>
          </motion.section>
          <motion.section
            id="about"
            className="py-20"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h2 className="text-center mb-10">About Me ℹ️</h2>
            <div className="material-card hover:scale-105 transition-transform duration-300">
              <p>I'm a developer with a focus on React, TypeScript, and Tailwind CSS.</p>
            </div>
          </motion.section>
          <motion.section
            id="projects"
            className="py-20"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <h2 className="text-center mb-10">Projects 🛠️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl">Project 1</h3>
                <p>A cool project built with modern tech.</p>
              </div>
              <div className="material-card hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl">Project 2</h3>
                <p>Another awesome project showcasing my skills.</p>
              </div>
            </div>
          </motion.section>
        </main>
        <footer className="bg-background/80 py-6 text-center">
          <p className="text-subheading">
            📧 <a href="mailto:tanuj@example.com" className="hover:text-accent">tanuj@example.com</a>
          </p>
          <p className="text-subheading mt-2">© 2025 Tanuj. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
