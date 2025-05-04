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
import SkillChip from './SkillChip.jsx';
import Footer from './Footer.jsx';
import './index.css';

export const ThemeContext = createContext();

function Portfolio() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    AOS.init({
      duration: 500,
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
      description: 'System task automation for Grade 11.',
    },
    {
      name: 'rupi',
      url: 'https://github.com/TanujairamV/rupi',
      tech: ['Python', 'Shell'],
      description: 'CLI tool for Linux automation.',
    },
    {
      name: 'Instagram Bot',
      url: 'https://github.com/TanujairamV/instagram-bot',
      tech: ['Python', 'Selenium'],
      description: 'Automated Instagram bot with Selenium.',
    },
  ];

  const skills = [
    { name: 'Python', proficiency: 'Advanced', icon: 'devicon-python-plain' },
    { name: 'Bash', proficiency: 'Intermediate', icon: 'devicon-bash-plain' },
    { name: 'Shell', proficiency: 'Intermediate', icon: 'devicon-linux-plain' },
    { name: 'Selenium', proficiency: 'Beginner', icon: 'devicon-selenium-original' },
    { name: 'Git', proficiency: 'Intermediate', icon: 'devicon-git-plain' },
    { name: 'GitHub', proficiency: 'Intermediate', icon: 'devicon-github-original' },
    { name: 'WSL', proficiency: 'Beginner', icon: 'devicon-windows8-original' },
  ];

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <motion.div
        className="min-h-screen font-inter bg-dark dark:bg-dark light:bg-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Cursor />
        <ParticlesBackground />
        <NavBar />
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-sm mx-auto px-4">
            <motion.h1
              className="text-3xl font-cabinet-grotesk text-heading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Tanujairam
            </motion.h1>
            <motion.div
              className="mt-1 text-base font-ranade text-heading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TypeAnimation
                sequence={['Code', 500, 'Create', 500, 'Innovate', 500]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
            <motion.p
              className="mt-1 text-xs font-inter text-subheading max-w-[16rem] mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              16-year-old building automation tools.
            </motion.p>
            <motion.div
              className="mt-2 flex space-x-2 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <a
                href="https://github.com/TanujairamV"
                className="btn material-btn text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="mailto:tanujairam.v@gmail.com"
                className="btn material-btn text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
            </motion.div>
            <motion.div
              className="mt-2 flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <a href="https://instagram.com/tanujairam.v" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={14} />
              </a>
              <a href="https://t.me/Tanujairam" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
                <FaTelegram size={14} />
              </a>
              <a href="https://discord.com/users/Tanujairam" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
                <FaDiscord size={14} />
              </a>
              <a href="mailto:tanujairam.v@gmail.com" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
                <FaEnvelope size={14} />
              </a>
              <a href="https://github.com/TanujairamV" className="social-icon material-icon" target="_blank" rel="noopener noreferrer">
                <FaGithub size={14} />
              </a>
            </motion.div>
          </div>
        </section>
        <section id="about" className="py-4" data-aos="fade-in" data-aos-delay="30">
          <h2 className="text-xl text-center font-space-grotesk text-heading">About</h2>
          <div className="mt-1 max-w-xs mx-auto text-center font-inter text-subheading px-4 material-card p-2">
            <p className="text-xs">Tanujairam, 16, India.</p>
            <p className="mt-0.5 text-xs">Coding automation with Python & Bash.</p>
          </div>
        </section>
        <section id="projects" className="py-4" data-aos="slide-up" data-aos-delay="30">
          <h2 className="text-xl text-center font-space-grotesk text-heading">Projects</h2>
          <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-0.5 max-w-2xl mx-auto px-4">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} {...project} aosDelay={30 + index * 30} />
            ))}
          </div>
        </section>
        <section id="skills" className="py-4" data-aos="fade-in" data-aos-delay="30">
          <h2 className="text-xl text-center font-space-grotesk text-heading">Skills</h2>
          <div className="mt-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-0.5 max-w-2xl mx-auto px-4">
            {skills.map((skill, index) => (
              <SkillChip
                key={skill.name}
                skill={skill.name}
                proficiency={skill.proficiency}
                icon={skill.icon}
                aosDelay={30 + index * 30}
              />
            ))}
          </div>
        </section>
        <section id="contact" className="py-4" data-aos="fade-in" data-aos-delay="30">
          <h2 className="text-xl text-center font-space-grotesk text-heading">Contact</h2>
          <div className="mt-1 max-w-xs mx-auto px-4">
            <ContactForm />
          </div>
        </section>
        <Footer />
      </motion.div>
    </ThemeContext.Provider>
  );
}

export default Portfolio;
