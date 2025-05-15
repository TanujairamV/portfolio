import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import IntroScreen from './IntroScreen';
import NavBar from './NavBar';
import Cursor from './Cursor';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaMusic } from 'react-icons/fa';
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
        // Ensure data is valid before setting state
        if (data && data.track && data.artist) {
          setListeningData({
            track: data.track,
            artist: data.artist,
            isPlaying: data.isPlaying || false,
            imageUrl: data.imageUrl || 'https://via.placeholder.com/150?text=No+Image'
          });
        } else {
          setListeningData({
            track: 'No Track',
            artist: 'No Artist',
            isPlaying: false,
            imageUrl: 'https://via.placeholder.com/150?text=No+Image'
          });
        }
      } catch (error) {
        console.error('Error updating listening data:', error);
        setListeningData({
          track: 'No Track',
          artist: 'No Artist',
          isPlaying: false,
          imageUrl: 'https://via.placeholder.com/150?text=No+Image'
        });
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
            initial="hidden"
            animate={visibleSections.includes('hero') ? 'visible' : 'hidden'}
            variants={headingVariants}
          >
            Hi, I'm Tanuj
          </motion.h1>
          <motion.p
            className="text-subheading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600 invert-on-hover"
            initial="hidden"
            animate={visibleSections.includes('hero') ? 'visible' : 'hidden'}
            variants={sectionVariants}
          >
            A passionate developer building modern web experiences.
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4 mb-6"
            initial="hidden"
            animate={visibleSections.includes('hero') ? 'visible' : 'hidden'}
            variants={sectionVariants}
          >
            <a href="https://github.com/TanujairamV" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover">
              <FaInstagram />
            </a>
            <a href="https://facebook.com/tanujairam" target="_blank" rel="noopener noreferrer" className="text-2xl text-subheading hover:text-accent hover:scale-110 transition-transform duration-200 invert-on-hover">
              <FaFacebook />
            </a>
          </motion.div>
          <motion.div
            className="flex justify-center mb-6"
            initial="hidden"
            animate={visibleSections.includes('hero') ? 'visible' : 'hidden'}
            variants={sectionVariants}
          >
            <div className="listening-widget bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-lg flex items-center space-x-4 w-full max-w-md relative">
              {isLoading ? (
                <p className="text-sm text-subheading font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
                  Loading...
                </p>
              ) : (
                <>
                  <img
                    src={listeningData.imageUrl}
                    alt="Album Art"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-subheading font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
                      Now Listening To
                    </p>
                    <p className="text-lg font-poppins text-foreground font-semibold truncate bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
                      {listeningData.track}
                    </p>
                    <p className="text-sm text-subheading truncate bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
                      {listeningData.artist}
                    </p>
                    {listeningData.isPlaying && (
                      <div className="visualizer flex space-x-1 mt-2">
                        <div className="w-1 h-4 bg-gradient-to-r from-white to-gray-400 rounded animate-visualizer-bar1"></div>
                        <div className="w-1 h-4 bg-gradient-to-r from-white to-gray-400 rounded animate-visualizer-bar2"></div>
                        <div className="w-1 h-4 bg-gradient-to-r from-white to-gray-400 rounded animate-visualizer-bar3"></div>
                        <div className="w-1 h-4 bg-gradient-to-r from-white to-gray-400 rounded animate-visualizer-bar4"></div>
                      </div>
                    )}
                  </div>
                  <FaMusic className="text-xl text-subheading invert-on-hover" />
                </>
              )}
            </div>
          </motion.div>
          <motion.button
            className="material-btn mt-6 invert-on-hover"
            initial="hidden"
            animate={visibleSections.includes('hero') ? 'visible' : 'hidden'}
            variants={sectionVariants}
          >
            Get in Touch
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
            className="text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            initial="hidden"
            animate={visibleSections.includes('about') ? 'visible' : 'hidden'}
            variants={headingVariants}
          >
            About Me
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate={visibleSections.includes('about') ? 'visible' : 'hidden'}
            variants={sectionVariants}
          >
            <div className="material-card hover:scale-105 transition-transform duration-300">
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
                I'm a developer with a focus on React, TypeScript, and Tailwind CSS.
              </p>
            </div>
            <div className="profile-card flex items-center space-x-4">
              <div>
                <h3 className="text-2xl font-space-grotesk text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
                  Tanuj
                </h3>
                <p className="text-sm text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">Frontend Developer</p>
                <p className="text-sm text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">Email: tanuj@example.com</p>
                <p className="text-sm text-white/80 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">Based in: India</p>
              </div>
            </div>
            <div className="material-card p-6 bg-white/80 backdrop-blur-md rounded-lg shadow-lg">
              <h3 className="text-xl font-space-grotesk mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">Contact Me</h3>
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-subheading focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-subheading focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="w-full p-3 rounded-lg bg-foreground/10 border border-foreground/20 text-foreground placeholder-subheading h-32 focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="material-btn w-full invert-on-hover">Send Message</button>
              </form>
            </div>
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
            className="text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            initial="hidden"
            animate={visibleSections.includes('skills') ? 'visible' : 'hidden'}
            variants={headingVariants}
          >
            Skills
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial="hidden"
            animate={visibleSections.includes('skills') ? 'visible' : 'hidden'}
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
            className="text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover"
            initial="hidden"
            animate={visibleSections.includes('projects') ? 'visible' : 'hidden'}
            variants={headingVariants}
          >
            Projects
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            animate={visibleSections.includes('projects') ? 'visible' : 'hidden'}
            variants={sectionVariants}
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </motion.div>
        </motion.section>
      </main>
      <motion.footer
        className="bg-white/80 backdrop-blur-md py-6 text-center"
        initial="hidden"
        animate={visibleSections.includes('footer') ? 'visible' : 'hidden'}
        variants={sectionVariants}
        id="footer"
      >
        <p className="text-subheading bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
          <a href="mailto:tanuj@example.com" className="hover:text-accent">tanuj@example.com</a>
        </p>
        <p className="text-subheading mt-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 invert-on-hover">
          2025 Tanuj. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
};

export default Portfolio;
