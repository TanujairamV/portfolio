import React, { useState } from "react";
import Navbar from "./NavBar";
import ParticlesBackground from "./ParticlesBackground";
import Footer from "./Footer";
import SkillChip from "./SkillChip";
import ProjectCard from "./ProjectCard";
import AnimatedCursor from "./AnimatedCursor";
import IntroScreen from "./IntroScreen";
import NowListening from "./NowListening";
import Hero from "./Hero";
import {
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

      <main className="relative z-10 w-full max-w-5xl mx-auto pt-24 pb-16 px-4 md:px-8 flex flex-col gap-10">
        {/* Hero Section */}
        <Hero />

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
