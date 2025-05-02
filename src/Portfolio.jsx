import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import ParticlesBackground from './ParticlesBackground.jsx';
import NavBar from './NavBar.jsx';
import Cursor from './Cursor.jsx';
import ContactForm from './ContactForm.jsx';
import ProjectCard from './ProjectCard.jsx';
import SkillBubble from './SkillBubble.jsx';
import Footer from './Footer.jsx';
import './index.css';

gsap.registerPlugin(ScrambleTextPlugin);

function Portfolio() {
  const nameRef = useRef(null);

  useEffect(() => {
    gsap.to(nameRef.current, {
      scrambleText: {
        text: 'Tanujairam',
        chars: '01ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        revealDelay: 0.5,
        speed: 0.3,
      },
      duration: 2,
    });
  }, []);

  const projects = [
    { name: 'gr11prctl', url: 'https://github.com/TanujairamV/gr11prctl', tech: ['Python', 'Bash'] },
    { name: 'rupi', url: 'https://github.com/TanujairamV/rupi', tech: ['Python', 'Shell'] },
    { name: 'Instagram Bot', url: 'https://github.com/TanujairamV/instagram-bot', tech: ['Python', 'Selenium'] },
  ];

  const skills = ['Python', 'Bash', 'Shell', 'Selenium', 'Git', 'GitHub', 'WSL'];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-inter">
      <Cursor />
      <ParticlesBackground />
      <NavBar />
      <section id="hero" className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 ref={nameRef} className="text-5xl font-poppins">Tanujairam</h1>
          <p className="mt-4 text-xl">Student, Developer, Innovator</p>
          <div className="mt-6 space-x-4">
            <a href="https://github.com/TanujairamV" className="btn">GitHub</a>
            <a href="mailto:tanujairam.v@gmail.com" className="btn">Email</a>
          </div>
        </div>
      </section>
      <section id="about" className="py-20">
        <h2 className="text-3xl text-center">About Me</h2>
        <p className="mt-4 max-w-2xl mx-auto text-center">
          I'm a 16-year-old Grade 12 student passionate about coding, building projects, and exploring technology.
        </p>
      </section>
      <section id="projects" className="py-20 bg-gray-800">
        <h2 className="text-3xl text-center">Projects</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.name} {...project} />
          ))}
        </div>
      </section>
      <section id="skills" className="py-20">
        <h2 className="text-3xl text-center">Skills</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <SkillBubble key={skill} skill={skill} />
          ))}
        </div>
      </section>
      <section id="contact" className="py-20 bg-gray-800">
        <h2 className="text-3xl text-center">Contact</h2>
        <ContactForm />
      </section>
      <Footer />
    </div>
  );
}

export default Portfolio;
