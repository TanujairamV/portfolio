import { useState, useEffect, createContext } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTelegram, FaDiscord, FaEnvelope, FaGithub } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import AOS from 'aos';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
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
    {
      name: 'gr11prctl',
      url: 'https://github.com/TanujairamV/gr11prctl',
      tech: ['Python', 'Bash'],
      description: 'A practical project for Grade 11, focusing on automation scripts using Python and Bash.',
      image: 'https://via.placeholder.com/300x200?text=gr11prctl',
    },
    {
      name: 'rupi',
      url: 'https://github.com/TanujairamV/rupi',
      tech: ['Python', 'Shell'],
      description: 'A utility tool for streamlining repetitive tasks with Python and Shell scripting.',
      image: 'https://via.placeholder.com/300x200?text=rupi',
    },
    {
      name: 'Instagram Bot',
      url: 'https://github.com/TanujairamV/instagram-bot',
      tech: ['Python', 'Selenium'],
      description: 'An automated bot for Instagram interactions, built with Selenium and Python.',
      image: 'https://via.placeholder.com/300x200?text=Instagram+Bot',
    },
  ];

  const skills = [
    { name: 'Python', proficiency: 'Advanced' },
    { name: 'Bash', proficiency: 'Intermediate' },
    { name: 'Shell', proficiency: 'Intermediate' },
    { name: 'Selenium', proficiency: 'Beginner' },
    { name: 'Git', proficiency: 'Intermediate' },
    { name: 'GitHub', proficiency: 'Intermediate' },
    { name: 'WSL', proficiency: 'Beginner' },
  ];

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ParallaxProvider>
        <motion.div
          className="min-h-screen font-inter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Cursor />
          <Parallax translateY={[-20, 20]}>
            <ParticlesBackground />
          </Parallax>
          <NavBar />
          <section id="hero" className="min-h-screen flex items-center justify-center relative">
            <div className="text-center max-w-4xl mx-auto px-4">
              <motion.h1
                className="text-6xl font-cabinet-grotesk text-heading"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Tanujairam
              </motion.h1>
              <motion.div
                className="mt-4 text-2xl font-ranade text-white dark:text-white light:text-black"
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
                className="mt-6 text-xl font-inter text-white dark:text-white light:text-black max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Crafting innovative solutions with Python, Bash, and modern web technologies. Passionate about building impactful projects and exploring the frontiers of tech.
              </motion.p>
              <motion.div
                className="mt-8 flex space-x-4 justify-center"
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
          <section id="about" className="py-16" data-aos="fade-right">
            <h2 className="text-4xl text-center font-cabinet-grotesk text-heading">About Me</h2>
            <div className="mt-6 max-w-3xl mx-auto text-center font-inter text-white dark:text-white light:text-black">
              <p className="text-lg">
                I'm a 16-year-old Grade 12 student from India, deeply passionate about coding and technology. My journey began with Python, and I've since explored Bash, Shell scripting, and web development. I love building automation tools and experimenting with innovative solutions.
              </p>
              <p className="mt-4 text-lg">
                When I'm not coding, you can find me tinkering with Linux environments, contributing to open-source projects, or learning about the latest tech trends. My goal is to create impactful projects that solve real-world problems.
              </p>
            </div>
          </section>
          <section id="projects" className="py-16 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-200" data-aos="zoom-in">
            <h2 className="text-4xl text-center font-cabinet-grotesk text-heading">Projects</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
              {projects.map((project) => (
                <Parallax key={project.name} translateY={[-10, 10]} scale={[1, 1.05]}>
                  <ProjectCard {...project} />
                </Parallax>
              ))}
            </div>
          </section>
          <section id="skills" className="py-16" data-aos="fade-left">
            <h2 className="text-4xl text-center font-cabinet-grotesk text-heading">Skills</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {skills.map((skill) => (
                <SkillBubble key={skill.name} skill={skill.name} proficiency={skill.proficiency} />
              ))}
            </div>
          </section>
          <section id="contact" className="py-16 bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-gray-200" data-aos="zoom-in">
            <h2 className="text-4xl text-center font-cabinet-grotesk text-heading">Contact</h2>
            <div className="mt-8 max-w-2xl mx-auto px-4">
              <ContactForm />
            </div>
          </section>
          <Footer />
        </motion.div>
      </ParallaxProvider>
    </ThemeContext.Provider>
  );
}

export default Portfolio;
