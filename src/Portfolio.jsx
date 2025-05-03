import { useState, useEffect, createContext } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTelegram, FaDiscord, FaEnvelope, FaGithub } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import AOS from 'aos';
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

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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
        <section id="hero" className="min-h-screen flex items-center justify-center relative">
          <div className="text-center max-w-3xl mx-auto px-4">
            <motion.h1
              className="text-5xl font-space-grotesk text-heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Tanujairam
            </motion.h1>
            <motion.div
              className="mt-4 text-xl font-inter text-[#FFFFFF]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TypeAnimation
                sequence={[
                  'Student',
                  1000,
                  'Developer',
                  1000,
                  'Innovator',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
            <motion.p
              className="mt-6 text-lg font-inter text-[#FFFFFF]"
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
              <motion.a
                href="https://github.com/TanujairamV"
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.a>
              <motion.a
                href="mailto:tanujairam.v@gmail.com"
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Email
              </motion.a>
            </motion.div>
            <motion.div
              className="mt-6 flex justify-center space-x-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <a href="https://instagram.com/tanujairam.v" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
              <a href="https://t.me/Tanujairam" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaTelegram size={24} />
              </a>
              <a href="https://discord.com/users/Tanujairam" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaDiscord size={24} />
              </a>
              <a href="mailto:tanujairam.v@gmail.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaEnvelope size={24} />
              </a>
              <a href="https://github.com/TanujairamV" className="social-icon" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} />
              </a>
            </motion.div>
          </div>
        </section>
        <section id="about" className="py-20" data-aos="fade-right">
          <h2 className="text-3xl text-center font-space-grotesk text-heading">About Me</h2>
          <p className="mt-4 max-w-2xl mx-auto text-center font-inter text-[#FFFFFF]">
            I'm a 16-year-old Grade 12 student passionate about coding, building projects, and exploring technology.
          </p>
        </section>
        <section id="projects" className="py-20 bg-[#1A1A1A]" data-aos="zoom-in">
          <h2 className="text-3xl text-center font-space-grotesk text-heading">Projects</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </section>
        <section id="skills" className="py-20" data-aos="fade-left">
          <h2 className="text-3xl text-center font-space-grotesk text-heading">Skills</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <SkillBubble key={skill} skill={skill} />
            ))}
          </div>
        </section>
        <section id="contact" className="py-20 bg-[#1A1A1A]" data-aos="zoom-in">
          <h2 className="text-3xl text-center font-space-grotesk text-heading">Contact</h2>
          <ContactForm />
        </section>
        <Footer />
      </motion.div>
    </ThemeContext.Provider>
  );
}

export default Portfolio;
