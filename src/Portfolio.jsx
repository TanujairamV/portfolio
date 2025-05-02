import { useState, useEffect, createContext } from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground.jsx';
import NavBar from './NavBar.jsx';
import Cursor from './Cursor.jsx';
import ContactForm from './ContactForm.jsx';
import ProjectCard from './ProjectCard.jsx';
import SkillBubble from './SkillBubble.jsx';
import Footer from './Footer.jsx';
import Intro from './Intro.jsx';
import './index.css';

export const ThemeContext = createContext();

function Portfolio() {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState('system');

  // Detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        document.body.className = mediaQuery.matches ? 'dark' : 'light';
      }
    };
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === 'system' ? '' : theme;
  }, [theme]);

  const projects = [
    { name: 'gr11prctl', url: 'https://github.com/TanujairamV/gr11prctl', tech: ['Python', 'Bash'] },
    { name: 'rupi', url: 'https://github.com/TanujairamV/rupi', tech: ['Python', 'Shell'] },
    { name: 'Instagram Bot', url: 'https://github.com/TanujairamV/instagram-bot', tech: ['Python', 'Selenium'] },
  ];

  const skills = ['Python', 'Bash', 'Shell', 'Selenium', 'Git', 'GitHub', 'WSL'];

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <motion.div
        className="min-h-screen font-inter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Cursor />
        <ParticlesBackground />
        <NavBar />
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto px-4">
            <motion.h1
              className="text-5xl font-montserrat text-neon-blue"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Tanujairam
            </motion.h1>
            <motion.p
              className="mt-4 text-xl font-inter text-primary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Student, Developer, Innovator
            </motion.p>
            <motion.p
              className="mt-6 text-lg font-inter text-secondary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Crafting innovative solutions with Python, Bash, and modern web technologies. Passionate about building impactful projects and exploring the frontiers of tech.
            </motion.p>
            <motion.div
              className="mt-8 space-x-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a href="https://github.com/TanujairamV" className="btn">GitHub</a>
              <a href="mailto:tanujairam.v@gmail.com" className="btn">Email</a>
            </motion.div>
          </div>
        </section>
        <section id="about" className="py-20">
          <h2 className="text-3xl text-center font-montserrat text-primary">About Me</h2>
          <p className="mt-4 max-w-2xl mx-auto text-center font-inter text-secondary">
            I'm a 16-year-old Grade 12 student passionate about coding, building projects, and exploring technology.
          </p>
        </section>
        <section id="projects" className="py-20 bg-gray-800">
          <h2 className="text-3xl text-center font-montserrat text-primary">Projects</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </section>
        <section id="skills" className="py-20">
          <h2 className="text-3xl text-center font-montserrat text-primary">Skills</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <SkillBubble key={skill} skill={skill} />
            ))}
          </div>
        </section>
        <section id="contact" className="py-20 bg-gray-800">
          <h2 className="text-3xl text-center font-montserrat text-primary">Contact</h2>
          <ContactForm />
        </section>
        <Footer />
      </motion.div>
    </ThemeContext.Provider>
  );
}

export default Portfolio;
