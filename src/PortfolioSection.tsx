import React, { useState } from "react";
import Navbar from "./NavBar";
import ParticlesBackground from "./ParticlesBackground";
import Footer from "./Footer";
import SkillChip from "./SkillChip";
import ProjectCard from "./ProjectCard";
import AnimatedCursor from "./AnimatedCursor";
import IntroScreen from "./IntroScreen";
import NowListening from "./NowListening";
import {
  socials,
  skills,
  experiences,
  education,
  certifications,
  projects,
  Skill,
  Experience,
  Education,
  Certification,
  Project
} from "./data";

const PortfolioSection: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-x-hidden font-sans">
      <IntroScreen />
      <ParticlesBackground />
      <AnimatedCursor />
      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto pt-36 pb-16 px-4 md:px-8">
        {/* Now Listening */}
        <div className="flex justify-center mb-8">
          <NowListening />
        </div>

        {/* Hero Section */}
        <section id="hero" className="text-center mb-20">
          <img
            src="https://avatars.githubusercontent.com/u/108195209?v=4"
            alt="TanujairamV"
            className="mx-auto w-32 h-32 rounded-full border-4 border-white/30 shadow-xl mb-5"
          />
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Tanujairam V
          </h1>
          <p className="text-lg text-gray-200 mb-6" style={{ fontFamily: "'Pacifico', cursive" }}>
            Developer | Student | Creator
          </p>
          <div className="flex justify-center gap-4 mb-2">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-accent transition"
              >
                <i className="fab fa-github text-xl" />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-accent transition"
              >
                <i className="fab fa-linkedin text-xl" />
              </a>
            )}
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                aria-label="Email"
                className="hover:text-accent transition"
              >
                <i className="fas fa-envelope text-xl" />
              </a>
            )}
            {socials.phone && (
              <a
                href={`tel:${socials.phone}`}
                aria-label="Phone"
                className="hover:text-accent transition"
              >
                <i className="fas fa-phone text-xl" />
              </a>
            )}
          </div>
          <p className="text-gray-400 text-sm" style={{ fontFamily: "'Roboto Mono', monospace" }}>
            {socials.location}
          </p>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill: Skill) => (
              <SkillChip skill={skill.name} key={skill.name} />
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Experience</h2>
          {experiences.map((exp: Experience) => (
            <div key={exp.id} className="mb-6">
              <h3 className="text-xl font-semibold">{exp.title} @ {exp.company}</h3>
              <p className="text-gray-400 text-sm mb-1">
                {exp.start} — {exp.end || "Present"}
              </p>
              <ul className="list-disc ml-5 text-gray-200">
                {exp.responsibilities.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section id="education" className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Education</h2>
          {education.map((edu: Education) => (
            <div key={edu.id} className="mb-6">
              <h3 className="text-lg font-semibold">
                {edu.degree} - {edu.school}
              </h3>
              <p className="text-gray-400 text-sm mb-1">
                {edu.start} — {edu.end}
              </p>
              <p className="text-gray-300">{edu.details}</p>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section id="certifications" className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Certifications</h2>
          <ul className="list-disc ml-5">
            {certifications.map((cert: Certification) => (
              <li key={cert.id} className="mb-2">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition underline"
                >
                  {cert.name}
                </a>
                <span className="text-gray-400 ml-2">
                  ({cert.issuer}, {cert.date})
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(showAllProjects ? projects : projects.slice(0, 4)).map((project: Project) => (
              <ProjectCard
                key={project.id}
                project={{
                  name: project.title || "Untitled Project",
                  url: project.url ?? "https://example.com",
                  tech: project.techStack ?? [],
                  description: project.description ?? "No description available.",
                }}
              />
            ))}
          </div>
          {projects.length > 4 && (
            <div className="flex justify-center mt-6">
              <button
                className="bg-accent text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-accent-dark transition"
                onClick={() => setShowAllProjects(v => !v)}
              >
                {showAllProjects ? "Show Less" : "Show All"}
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioSection;
