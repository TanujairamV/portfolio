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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

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

  useEffect(() => {
    document.body.className = theme === 'system' ? '' : theme;
  }, [theme]);

  const projects = [
    {
      name: 'gr11prctl',
      url: 'https://github.com/TanujairamV/gr11prctl',
      tech: ['Python', 'Bash'],
      description: 'A Grade 11 project automating system tasks with Python and Bash, featuring file management and process automation.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'rupi',
      url: 'https://github.com/TanujairamV/rupi',
      tech: ['Python', 'Shell'],
      description: 'A CLI tool streamlining repetitive tasks with Python and Shell scripting for Linux productivity.',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Instagram Bot',
      url: 'https://github.com/TanujairamV/instagram-bot',
      tech: ['Python', 'Selenium'],
      description: 'An automated Instagram bot using Selenium and Python for tasks like liking posts and following users.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  const skills = [
    { name: 'Python', proficiency: 'Advanced', level: 90 },
    { name: 'Bash', proficiency: 'Intermediate', level: 70 },
    { name: 'Shell', proficiency: 'Intermediate', level: 65 },
    { name: 'Selenium', proficiency: 'Beginner', level: 40 },
    { name: 'Git', proficiency: 'Intermediate', level: 75 },
    { name: 'GitHub', proficiency: 'Intermediate', level: 70 },
    { name: 'WSL', proficiency: 'Beginner', level: 50 },
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
          transition={{ duration: 0.6 }}
        >
          <Cursor />
          <Parallax translateY={[-15, 15]} speed={-10}>
            <ParticlesBackground />
          </Parallax>
          <NavBar />
          <section id="hero" className="min-h-screen flex items-center justify-center relative">
            <div className="text-center max-w-5xl mx-auto px-4">
              <motion.h1
                className="text-7xl font-cabinet-grotesk text-heading"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Tanujairam
              </motion.h1>
              <motion.div
                className="mt-4 text-3xl font-ranade text-white dark:text-white light:text-black"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                <TypeAnimation
                  sequence={['Student', 1000, 'Developer', 1000, 'Innovator', 1000]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                />
              </motion.div>
              <motion.p
                className="mt-6 text-xl font-inter text-white dark:text-white light:text-black max-w-3xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              >
                I’m a 16-year-old developer crafting innovative solutions with Python, Bash, and web technologies. Passionate about automation, open-source, and pushing tech boundaries.
              </motion.p>
              <motion.div
                className="mt-8 flex space-x-4 justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
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
                transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              >
                <a href="https://instagram.com/tanujairam.v" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={28} />
                </a>
                <a href="https://t.me/Tanujairam" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaTelegram size={28} />
                </a>
                <a href="https://discord.com/users/Tanujairam" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaDiscord size={28} />
                </a>
                <a href="mailto:tanujairam.v@gmail.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaEnvelope size={28} />
                </a>
                <a href="https://github.com/TanujairamV" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={28} />
                </a>
              </motion.div>
            </div>
          </section>
          <section id="about" className="py-20" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-5xl text-center font-cabinet-grotesk text-heading">About Me</h2>
            <div className="mt-6 max-w-4xl mx-auto text-center font-inter text-white dark:text-white light:text-black px-4">
              <p className="text-lg leading-relaxed">
                I’m Tanujairam, a 16-year-old Grade 12 student from India with a passion for coding and technology. My journey started with Python, building automation scripts, and has expanded to Bash, Shell scripting, and web development.
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                I thrive on solving real-world problems through code, from streamlining workflows to creating interactive web apps. Outside coding, I’m an avid learner, experimenting with Linux, contributing to open-source, and staying updated with tech trends.
              </p>
            </div>
          </section>
          <section id="projects" className="py-20" data-aos="zoom-in" data-aos-delay="200">
            <h2 className="text-5xl text-center font-cabinet-grotesk text-heading">Projects</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto px-4">
              {projects.map((project) => (
                <Parallax key={project.name} translateY={[-8, 8]} scale={[1, 1.03]} speed={5}>
                  <ProjectCard {...project} />
                </Parallax>
              ))}
            </div>
          </section>
          <section id="skills" className="py-20" data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-5xl text-center font-cabinet-grotesk text-heading">Skills</h2>
            <div className="mt-6 max-w-5xl mx-auto px-4">
              {skills.map((skill) => (
                <SkillBubble key={skill.name} skill={skill.name} proficiency={skill.proficiency} level={skill.level} />
              ))}
            </div>
          </section>
          <section id="contact" className="py-20" data-aos="zoom-in" data-aos-delay="400">
            <h2 className="text-5xl text-center font-cabinet-grotesk text-heading">Contact</h2>
            <div className="mt-6 max-w-xl mx-auto px-4">
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
