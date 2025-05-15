import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import IntroScreen from './IntroScreen';
import NavBar from './NavBar';
import Cursor from './Cursor';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaMusic, FaTelegram } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { fetchListeningData } from './lastFmApi';
import { TrackData, Project } from './types';
import SkillChip from './SkillChip';
import ProjectCard from './ProjectCard';

const Portfolio = () => {
  const form = useRef<HTMLFormElement>(null);
  const [listeningData, setListeningData] = useState<TrackData>({ 
    track: '', 
    artist: '', 
    isPlaying: false, 
    imageUrl: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateListeningData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchListeningData();
        console.log('Fetched Listening Data:', data);
        if (data && data.track && data.artist) {
          setListeningData({
            track: data.track,
            artist: data.artist,
            isPlaying: data.isPlaying || false,
            imageUrl: data.imageUrl || 'https://via.placeholder.com/150?text=No+Image'
          });
        }
      } catch (error) {
        console.error('Error updating listening data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    updateListeningData();
    const interval = setInterval(updateListeningData, 15000);
    return () => clearInterval(interval);
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
        .then(
          () => {
            alert('Message sent successfully!');
            form.current?.reset();
          },
          (error) => {
            alert('Failed to send message: ' + error.text);
          }
        );
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        staggerChildren: 0.2 
      } 
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const skills = [
    'React',
    'TypeScript',
    'Tailwind CSS',
    'JavaScript',
    'HTML',
    'CSS',
    'Node.js',
    'Git'
  ];

  const projects: Project[] = [
    {
      name: 'Project 1',
      url: 'https://example.com/project1',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      description: 'A cool project built with modern tech.'
    },
    {
      name: 'Project 2',
      url: 'https://example.com/project2',
      tech: ['JavaScript', 'Node.js', 'Express'],
      description: 'Another awesome project showcasing my skills.'
    }
  ];

  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-black">
      <IntroScreen />
      <ParticlesBackground />
      <Cursor />
      <NavBar />
      <main className="container mx-auto px-4 py-12">
        <motion.section
          id="hero"
          className="text-center py-16"
          initial="hidden"
          animate={visibleSections.includes('hero') ? 'visible' : 'hidden'}
          variants={sectionVariants}
        >
          <motion.h1
            className="mb-4 hero-heading bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600 invert-on-hover"
            variants={headingVariants}
          >
            <motion.span variants={childVariants}>Hi, I'm Tanuj</motion.span>
          </motion.h1>
          <motion.p
            className="text-subheading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600 invert-on-hover"
            variants={childVariants}
          >
            <motion.span variants={childVariants}>A passionate developer building modern web experiences.</motion.span>
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4 mb-6"
            variants={childVariants}
          >
            <motion.a
              href="https://github.com/TanujairamV"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover"
              variants={childVariants}
            >
              <motion.span variants={childVariants}><FaGithub /></motion.span>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/tanujairam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover"
              variants={childVariants}
            >
              <motion.span variants={childVariants}><FaLinkedin /></motion.span>
            </motion.a>
            <motion.a
              href="https://twitter.com/tanujairam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover"
              variants={childVariants}
            >
              <motion.span variants={childVariants}><FaTwitter /></motion.span>
            </motion.a>
            <motion.a
              href="https://instagram.com/tanujairam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover"
              variants={childVariants}
            >
              <motion.span variants={childVariants}><FaInstagram /></motion.span>
            </motion.a>
            <motion.a
              href="https://facebook.com/tanujairam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover"
              variants={childVariants}
            >
              <motion.span variants={childVariants}><FaFacebook /></motion.span>
            </motion.a>
            <motion.a
              href="https://t.me/tanujairam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover"
              variants={childVariants}
            >
              <motion.span variants={childVariants}><FaTelegram /></motion.span>
            </motion.a>
          </motion.div>
          <motion.div
            className="flex flex-col items-center mb-6"
            variants={childVariants}
          >
            <motion.p
              className="text-sm text-subheading font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover mb-2"
              variants={childVariants}
            >
              <motion.span variants={childVariants}>Now Listening To</motion.span>
            </motion.p>
            <motion.div
              className="listening-widget relative bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-lg flex items-center space-x-4 w-full max-w-md overflow-hidden pb-5"
              style={{
                backgroundImage: `url(${listeningData.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              variants={childVariants}
            >
              <div className="absolute inset-0 backdrop-blur-lg bg-white/30" style={{ filter: 'blur(8px)' }}></div>
              <div className="relative z-10 flex items-center space-x-4 w-full">
                {isLoading ? (
                  <motion.p
                    className="text-sm text-subheading font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
                    variants={childVariants}
                  >
                    <motion.span variants={childVariants}>Loading...</motion.span>
                  </motion.p>
                ) : (
                  <motion.div className="flex items-center space-x-4 w-full" variants={childVariants}>
                    <motion.img
                      src={listeningData.imageUrl}
                      alt="Album Art"
                      className="w-16 h-16 rounded-md object-cover"
                      variants={childVariants}
                    />
                    <div className="flex-1">
                      <motion.p
                        className="text-lg font-poppins text-foreground font-semibold truncate bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
                        variants={childVariants}
                      >
                        <motion.span variants={childVariants}>{listeningData.track}</motion.span>
                      </motion.p>
                      <motion.p
                        className="text-sm text-subheading truncate bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
                        variants={childVariants}
                      >
                        <motion.span variants={childVariants}>{listeningData.artist}</motion.span>
                      </motion.p>
                      {listeningData.isPlaying && (
                        <motion.div
                          className="visualizer flex space-x-1 mt-2"
                          variants={childVariants}
                        >
                          <motion.div className="w-1 h-4 bg-gradient-to-r from-white to-gray-400 rounded animate-visualizer-bar1" variants={childVariants} />
                          <motion.div className="w-1 h-4 bg-gradient-to-r from-white to-gray-400 rounded animate-visualizer-bar2" variants={childVariants} />
                          <motion.div className="w-1 h-4 bg-gradient-to-r from-white to-gray-400 rounded animate-visualizer-bar3" variants={childVariants} />
                          <motion.div className="w-1 h-4 bg-gradient-to-r from-white to-gray-400 rounded animate-visualizer-bar4" variants={childVariants} />
                        </motion.div>
                      )}
                    </div>
                    <motion.div variants={childVariants}>
                      <motion.span variants={childVariants}><FaMusic className="text-xl text-subheading invert-on-hover" /></motion.span>
                    </motion.div>
                  </motion.div>
                )}
              </div>
              {listeningData.isPlaying && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 overflow-hidden"
                  variants={childVariants}
                >
                  <div className="w-full h-1 flex space-x-1 px-4">
                    <div className="flex-1 h-1 bg-gradient-to-r from-white to-gray-400 rounded animate-line-visualizer1" />
                    <div className="flex-1 h-1 bg-gradient-to-r from-white to-gray-400 rounded animate-line-visualizer2" />
                    <div className="flex-1 h-1 bg-gradient-to-r from-white to-gray-400 rounded animate-line-visualizer3" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          <motion.button
            className="material-btn mt-6 invert-on-hover"
            variants={childVariants}
          >
            <motion.span variants={childVariants}>Get in Touch</motion.span>
          </motion.button>
        </motion.section>
        <motion.section
          id="about"
          className="py-16"
          initial="hidden"
          animate={visibleSections.includes('about') ? 'visible' : 'hidden'}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-center mb-8 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            variants={headingVariants}
          >
            About Me
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={sectionVariants}
          >
            <motion.div className="material-card hover:scale-105 transition-transform duration-300" variants={childVariants}>
              <motion.p className="text-base bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover" variants={childVariants}>
                I'm a developer with a focus on React, TypeScript, and Tailwind CSS.
              </motion.p>
            </motion.div>
            <motion.div className="profile-card flex items-center space-x-4" variants={childVariants}>
              <motion.div variants={childVariants}>
                <motion.h3 className="text-3xl font-space-grotesk text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover" variants={childVariants}>
                  Tanuj
                </motion.h3>
                <motion.p className="text-base text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover" variants={childVariants}>Frontend Developer</motion.p>
                <motion.p className="text-base text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover" variants={childVariants}>Email: tanuj@example.com</motion.p>
                <motion.p className="text-base text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover" variants={childVariants}>Based in: India</motion.p>
              </motion.div>
            </motion.div>
            <motion.div className="material-card p-6 bg-white/80 backdrop-blur-md rounded-lg shadow-lg" variants={childVariants}>
              <motion.h3 className="text-2xl font-space-grotesk mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover" variants={childVariants}>Contact Me</motion.h3>
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <motion.div variants={childVariants}>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-subheading focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </motion.div>
                <motion.div variants={childVariants}>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-subheading focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </motion.div>
                <motion.div variants={childVariants}>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-subheading h-32 focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  ></textarea>
                </motion.div>
                <motion.button type="submit" className="material-btn w-full invert-on-hover" variants={childVariants}>Send Message</motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.section>
        <motion.section
          id="skills"
          className="py-16"
          initial="hidden"
          animate={visibleSections.includes('skills') ? 'visible' : 'hidden'}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-center mb-8 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            variants={headingVariants}
          >
            Skills
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            variants={sectionVariants}
          >
            {skills.map((skill) => (
              <SkillChip key={skill} skill={skill} />
            ))}
          </motion.div>
        </motion.section>
        <motion.section
          id="projects"
          className="py-16"
          initial="hidden"
          animate={visibleSections.includes('projects') ? 'visible' : 'hidden'}
          variants={sectionVariants}
        >
          <motion.h2
            className="text-center mb-8 text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            variants={headingVariants}
          >
            Projects
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={sectionVariants}
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </motion.div>
        </motion.section>
      </main>
      <motion.footer
        className="bg-white/80 backdrop-blur-md py-8 text-center border-t border-white/20 mt-12"
        initial="hidden"
        animate={visibleSections.includes('footer') ? 'visible' : 'hidden'}
        variants={sectionVariants}
        id="footer"
      >
        <motion.p className="text-base bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover" variants={childVariants}>
          <a href="mailto:tanuj@example.com" className="hover:text-accent">tanuj@example.com</a>
        </motion.p>
        <motion.p className="text-base mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover" variants={childVariants}>
          2025 Tanuj. All rights reserved.
        </motion.p>
        <motion.div className="flex justify-center space-x-4 mt-4" variants={childVariants}>
          <motion.a href="https://github.com/TanujairamV" target="_blank" rel="noopener noreferrer" className="text-base hover:text-accent invert-on-hover" variants={childVariants}>
            <FaGithub />
          </motion.a>
          <motion.a href="https://linkedin.com/in/tanujairam" target="_blank" rel="noopener noreferrer" className="text-base hover:text-accent invert-on-hover" variants={childVariants}>
            <FaLinkedin />
          </motion.a>
          <motion.a href="https://twitter.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-base hover:text-accent invert-on-hover" variants={childVariants}>
            <FaTwitter />
          </motion.a>
          <motion.a href="https://t.me/tanujairam" target="_blank" rel="noopener noreferrer" className="text-base hover:text-accent invert-on-hover" variants={childVariants}>
            <FaTelegram />
          </motion.a>
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default Portfolio;
