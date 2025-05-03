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
      duration: 1200,
      once: true,
      easing: 'ease-in-out-cubic',
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
      description: 'System task automation for Grade 11.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'rupi',
      url: 'https://github.com/TanujairamV/rupi',
      tech: ['Python', 'Shell'],
      description: 'CLI tool for Linux automation.',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Instagram Bot',
      url: 'https://github.com/TanujairamV/instagram-bot',
      tech: ['Python', 'Selenium'],
      description: 'Automated Instagram bot with Selenium.',
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
          className="min-h-screen font-inter bg-dark dark:bg-dark light:bg-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Cursor />
          <Parallax translateY={[-20, 20]} speed={-20}>
            <ParticlesBackground />
          </Parallax>
          <NavBar />
          <section id="hero" className="min-h-screen flex items-center justify-center relative">
            <div className="text-center max-w-3xl mx-auto px-4">
              <motion.h1
                className="text-7xl font-cabinet-grotesk text-heading"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                Tanujairam
              </motion.h1>
              <motion.div
                className="mt-4 text-3xl font-ranade text-heading"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              >
                <TypeAnimation
                  sequence={['Student', 1000, 'Developer', 1000, 'Innovator', 1000]}
                  wrapper="span"
                  speed={30}
                  repeat={Infinity}
                />
              </motion.div>
              <motion.p
                className="mt-5 text-lg font-inter text-subheading max-w-lg mx-auto leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                16-year-old developer crafting automation scripts and web apps with Python and Bash.
              </motion.p>
              <motion.div
                className="mt-7 flex space-x-4 justify-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                <motion.a
                  href="https://github.com/TanujairamV"
                  className="btn glass-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: 4 }}
                  whileTap={{ scale: 0.85 }}
                >
                  GitHub
                </motion.a>
                <motion.a
                  href="mailto:tanujairam.v@gmail.com"
                  className="btn glass-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, rotate: -4 }}
                  whileTap={{ scale: 0.85 }}
                >
                  Email
                </motion.a>
              </motion.div>
              <motion.div
                className="mt-6 flex justify-center space-x-5"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              >
                <a href="https://instagram.com/tanujairam.v" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} />
                </a>
                <a href="https://t.me/Tanujairam" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
                  <FaTelegram size={24} />
                </a>
                <a href="https://discord.com/users/Tanujairam" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
                  <FaDiscord size={24} />
                </a>
                <a href="mailto:tanujairam.v@gmail.com" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
                  <FaEnvelope size={24} />
                </a>
                <a href="https://github.com/TanujairamV" className="social-icon glass-icon" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} />
                </a>
              </motion.div>
            </div>
          </section>
          <section id="about" className="py-14" data-aos="fade-up" data-aos-delay="150">
            <h2 className="text-5xl text-center font-space-grotesk text-heading">About Me</h2>
            <div className="mt-7 max-w-2xl mx-auto text-center font-inter text-subheading px-4">
              <p className="text-lg leading-relaxed">
                I’m Tanujairam, a 16-year-old Grade 12 student from India passionate about coding.
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                I specialize in Python, Bash, and web technologies, building automation tools and contributing to open-source projects.
              </p>
            </div>
          </section>
          <section id="projects" className="py-14" data-aos="zoom-in" data-aos-delay="250">
            <h2 className="text-5xl text-center font-space-grotesk text-heading">Projects</h2>
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto px-4">
              {projects.map((project, index) => (
                <Parallax key={project.name} translateY={[-10, 10]} scale={[1, 1.06]} speed={10}>
                  <ProjectCard {...project} aosDelay={300 + index * 100} />
                </Parallax>
              ))}
            </div>
          </section>
          <section id="skills" className="py-14" data-aos="fade-up" data-aos-delay="350">
            <h2 className="text-5xl text-center font-space-grotesk text-heading">Skills</h2>
            <div className="mt-7 max-w-3xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <SkillBubble
                  key={skill.name}
                  skill={skill.name}
                  proficiency={skill.proficiency}
                  level={skill.level}
                  aosDelay={400 + index * 50}
                />
              ))}
            </div>
          </section>
          <section id="contact" className="py-14" data-aos="zoom-in" data-aos-delay="450">
            <h2 className="text-5xl text-center font-space-grotesk text-heading">Contact</h2>
            <div className="mt-7 max-w-md mx-auto px-4">
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
