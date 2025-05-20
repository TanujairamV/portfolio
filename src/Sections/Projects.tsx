import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaPython, FaRobot } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { Project } from "../Data/Data";

const projects: Project[] = [
  {
    id: "1",
    title: "joylib – Python Mini-Games & Fun Tools Library",
    url: "https://github.com/TanujairamV/joylib",
    techStack: ["Python", "Tkinter", "Games", "FLAMES", "Chess"],
    description:
      "A Python package bundling mini-games and fun utilities: Includes FLAMES calculator, Tic-Tac-Toe (Tkinter GUI), and a beta Chess GUI. Designed with easy-to-use functions like from joylib import flames. Lightweight, beginner-friendly, and expanding.",
  },
  {
    id: "2",
    title: "gr11prctl – Grade 11 Practical Programs Library",
    url: "https://github.com/TanujairamV/gr11prctl",
    techStack: ["Python", "CBSE", "snippets.py", "index.py"],
    description:
      "A Python library for CBSE-style practical programs: 20+ useful programs like pattern printing, palindrome check, tuple search, etc. Features snippets.py for core logic and an upcoming index.py for program listing. Made for students to practice efficiently.",
  },
  {
    id: "3",
    title: "lastfm-proxy – Last.fm API Proxy Server",
    url: "https://github.com/TanujairamV/lastfm-proxy",
    techStack: ["Express.js", "TypeScript", "API", "Proxy", "Node.js"],
    description:
      "A secure proxy layer to access Last.fm’s API without exposing keys: Built using Express.js with TypeScript. Can be used in bots, dashboards, or client-side apps. Handles API calls, caching, and error responses.",
  },
  {
    id: "4",
    title: "Instagram Account Creator Bot – Selenium Automation",
    url: "https://github.com/TanujairamV/insta-creator-bot",
    techStack: ["Selenium", "Python", "Automation", "mail.tm"],
    description:
      "An Instagram automation bot using Selenium and the mail.tm API: Handles registration, DOB selection, and manual email code verification. Features logging and delay controls to mimic human behavior. Ideal for automation testing or bulk creation setups.",
  },
];

const iconForProject = (title: string) => {
  if (title.toLowerCase().includes("python"))
    return <FaPython className="text-white text-2xl" />;
  if (title.toLowerCase().includes("express"))
    return <SiExpress className="text-gray-200 text-2xl" />;
  if (title.toLowerCase().includes("selenium") || title.toLowerCase().includes("bot"))
    return <FaRobot className="text-gray-300 text-2xl" />;
  return <FaGithub className="text-gray-300 text-2xl" />;
};

const gradientTextClass =
  "bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400 invert-on-hover";

const Projects: React.FC = () => (
  <section id="projects" className="mb-16 fade-in-up" data-fade-delay="6">
    <div
      className="text-2xl font-bold mb-8 flex items-center gap-2 font-hatton"
      style={{
        background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontFamily: "'Hatton', serif",
      }}
    >
      🛠 Projects
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, idx) => (
        <motion.a
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group material-card bg-white/40 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 transition-transform duration-300 hover:scale-105 fade-in-up cursor-pointer border border-white/10 outline-none focus:ring-2 focus:ring-gray-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          aria-label={`Visit ${project.title}`}
          title={`Visit ${project.title}`}
          tabIndex={0}
        >
          <div className="flex items-center gap-3 mb-2">
            {iconForProject(project.title)}
            <h3 className={`text-xl font-bold font-space-grotesk mb-0 ${gradientTextClass}`}>
              {project.title}
            </h3>
          </div>
          <p className={`text-base mb-4 font-light ${gradientTextClass}`}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-1">
            {project.techStack.map((t: string) => (
              <span
                key={t}
                className={`inline-block bg-white/10 text-gray-100 px-3 py-1 rounded-full text-base font-space-grotesk ${gradientTextClass}`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-gray-400 dark:text-gray-200 text-sm font-medium mt-3 opacity-70 group-hover:opacity-100 transition">
            <FaGithub className="mr-1" />
            GitHub
          </div>
        </motion.a>
      ))}
    </div>
  </section>
);

export default Projects;
