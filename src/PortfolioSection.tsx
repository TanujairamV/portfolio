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

// Gradient text style helper
const gradientText = {
  background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const subtleGradientText = {
  background: "linear-gradient(90deg, #fff 40%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const PortfolioSection: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-x-hidden font-sans">
      <IntroScreen />
      <ParticlesBackground />
      <AnimatedCursor />
      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto pt-36 pb-16 px-4 md:px-8">
        {/* Hero Section */}
        <section id="hero" className="text-center mb-14">
          <img
            src="https://avatars.githubusercontent.com/u/108195209?v=4"
            alt="TanujairamV"
            className="mx-auto w-36 h-36 rounded-full border-4 border-white/30 shadow-2xl mb-6"
            style={{ boxShadow: "0 8px 36px #b0b0b033" }}
          />
          <h1 className="text-4xl font-bold mb-2" style={{ ...gradientText, fontFamily: "'Montserrat', sans-serif" }}>
            Tanujairam V
          </h1>
          <p className="text-lg mb-5" style={{ ...subtleGradientText, fontFamily: "'Pacifico', cursive" }}>
            Developer &nbsp;|&nbsp; Student &nbsp;|&nbsp; Creator
          </p>
          <div className="flex justify-center gap-5 mb-2">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:scale-110 transition"
                style={{ color: "#fff" }}
              >
                {/* GitHub Icon */}
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                  <path fill="url(#gh_grad)" d="M12 2C6.48 2 2 6.7 2 12.3c0 4.5 2.87 8.3 6.84 9.65.5.1.68-.22.68-.48v-1.8c-2.78.63-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.64.07-.63.07-.63 1 .07 1.52 1.06 1.52 1.06.89 1.6 2.34 1.14 2.91.87.09-.67.35-1.14.64-1.4-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.38-2.03 1.02-2.74-.1-.26-.44-1.3.1-2.7 0 0 .84-.28 2.75 1.03A9.35 9.35 0 0 1 12 7.6c.85.01 1.7.12 2.5.35 1.9-1.31 2.73-1.03 2.73-1.03.54 1.4.2 2.44.1 2.7.64.71 1.02 1.62 1.02 2.74 0 3.93-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9v2.83c0 .27.18.59.69.48C19.13 20.6 22 16.8 22 12.3 22 6.7 17.52 2 12 2Z"/>
                  <defs>
                    <linearGradient id="gh_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fff"/>
                      <stop offset="1" stopColor="#b0b0b0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:scale-110 transition"
                style={{ color: "#fff" }}
              >
                {/* LinkedIn Icon */}
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="5" fill="url(#li_grad)" />
                  <path d="M7.5 9.4h2.1v7.2H7.5V9.4ZM8.6 8.4c.67 0 1.08-.46 1.08-1.03-.01-.59-.41-1.03-1.07-1.03s-1.08.44-1.08 1.03c0 .57.41 1.03 1.06 1.03h.01ZM12.2 12.2c0-.71.32-1.17 1.01-1.17.57 0 .84.41.84 1.17v4.2h2.1v-4.65c0-1.62-.87-2.37-2.04-2.37-1 0-1.44.55-1.69 1.02V9.4h-2.1c.03.67 0 7.2 0 7.2h2.1v-4.4Z" fill="#fff"/>
                  <defs>
                    <linearGradient id="li_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fff"/>
                      <stop offset="1" stopColor="#b0b0b0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            )}
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                aria-label="Email"
                className="hover:scale-110 transition"
                style={{ color: "#fff" }}
              >
                {/* Email Icon */}
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="7" fill="url(#mail_grad)" />
                  <path d="M6 8.5c0-.83.67-1.5 1.5-1.5h9c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 0 1 6 15.5v-7Zm1.5-.5a.5.5 0 0 0-.5.5v.1l5 3.13 5-3.13V8.5a.5.5 0 0 0-.5-.5h-9Z" fill="#fff" fillOpacity={0.9}/>
                  <defs>
                    <linearGradient id="mail_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fff"/>
                      <stop offset="1" stopColor="#b0b0b0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            )}
            {socials.phone && (
              <a
                href={`tel:${socials.phone}`}
                aria-label="Phone"
                className="hover:scale-110 transition"
                style={{ color: "#fff" }}
              >
                {/* Phone Icon */}
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="7" fill="url(#phone_grad)" />
                  <path d="M9.6 7.2c.24-.44.14-1.01-.22-1.32l-1.2-1.08c-.34-.31-.86-.3-1.17.02l-1.02 1.07c-.5.53-.6 1.36-.22 2 .92 1.55 2.37 3.45 4.08 5.16 1.71 1.71 3.61 3.16 5.16 4.08.64.38 1.47.28 2-.22l1.07-1.02c.32-.31.33-.83.02-1.17l-1.08-1.2c-.31-.36-.88-.46-1.32-.22l-1.06.61a1.1 1.1 0 0 1-1.15-.09c-.76-.54-1.91-1.59-2.62-2.3-.72-.72-1.77-1.87-2.31-2.63a1.1 1.1 0 0 1-.09-1.15l.6-1.05Z" fill="#fff" fillOpacity={0.88}/>
                  <defs>
                    <linearGradient id="phone_grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fff"/>
                      <stop offset="1" stopColor="#b0b0b0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </a>
            )}
          </div>
          <p className="text-gray-400 text-sm" style={{ fontFamily: "'Roboto Mono', monospace" }}>
            {socials.location}
          </p>
        </section>

        {/* Now Listening */}
        <div className="flex justify-center mb-12">
          <NowListening />
        </div>

        {/* Skills */}
        <section id="skills" className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ ...gradientText, fontFamily: "'Montserrat', sans-serif" }}>Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill: Skill) => (
              <SkillChip skill={skill.name} key={skill.name} />
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ ...gradientText, fontFamily: "'Montserrat', sans-serif" }}>Experience</h2>
          {experiences.map((exp: Experience) => (
            <div key={exp.id} className="mb-6">
              <h3 className="text-xl font-semibold" style={subtleGradientText}>{exp.title} @ {exp.company}</h3>
              <p className="text-gray-400 text-sm mb-1">
                {exp.start} — {exp.end || "Present"}
              </p>
              <ul className="list-disc ml-5" style={subtleGradientText}>
                {exp.responsibilities.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section id="education" className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ ...gradientText, fontFamily: "'Montserrat', sans-serif" }}>Education</h2>
          {education.map((edu: Education) => (
            <div key={edu.id} className="mb-6">
              <h3 className="text-lg font-semibold" style={subtleGradientText}>
                {edu.degree} - {edu.school}
              </h3>
              <p className="text-gray-400 text-sm mb-1">
                {edu.start} — {edu.end}
              </p>
              <p style={subtleGradientText}>{edu.details}</p>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section id="certifications" className="mb-16">
          <h2 className="text-2xl font-bold mb-4" style={{ ...gradientText, fontFamily: "'Montserrat', sans-serif" }}>Certifications</h2>
          <ul className="list-disc ml-5">
            {certifications.map((cert: Certification) => (
              <li key={cert.id} className="mb-2">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={gradientText}
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
          <h2 className="text-2xl font-bold mb-4" style={{ ...gradientText, fontFamily: "'Montserrat', sans-serif" }}>Projects</h2>
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
                className="px-6 py-2 rounded-xl font-semibold shadow"
                style={{
                  background: "linear-gradient(90deg,#fff,#b0b0b0 90%)",
                  color: "#111",
                  boxShadow: "0 2px 10px #b0b0b044",
                  fontWeight: 600,
                  fontFamily: "'Montserrat',sans-serif",
                  transition: "background 0.15s, color 0.15s"
                }}
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
