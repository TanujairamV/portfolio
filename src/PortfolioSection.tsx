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
  experiences,
  education,
  certifications,
  projects,
  Experience,
  Education,
  Certification,
  Project
} from "./data";

// Gradient text style helpers
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
          <span>
            <span
              className="text-2xl font-bold mb-4 block font-agoka"
              style={{ ...gradientText, fontFamily: "'Agoka', serif" }}
            >
              Skills
            </span>
          </span>
          <span>
            <SkillChip />
          </span>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-16">
          <span>
            <span
              className="text-2xl font-bold mb-4 block font-agoka"
              style={{ ...gradientText, fontFamily: "'Agoka', serif" }}
            >
              Experience
            </span>
          </span>
          {experiences.map((exp: Experience) => (
            <span key={exp.id} className="block mb-6">
              <span
                className="text-xl font-semibold font-carlo"
                style={subtleGradientText}
              >
                {exp.title} @ {exp.company}
              </span>
              <span className="block text-gray-400 text-sm mb-1 font-carlo">
                {exp.start} — {exp.end || "Present"}
              </span>
              <ul className="list-disc ml-5" style={subtleGradientText}>
                {exp.responsibilities.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </span>
          ))}
        </section>

        {/* Education */}
        <section id="education" className="mb-16">
          <span>
            <span
              className="text-2xl font-bold mb-4 block font-agoka"
              style={{ ...gradientText, fontFamily: "'Agoka', serif" }}
            >
              Education
            </span>
          </span>
          {education.map((edu: Education) => (
            <span key={edu.id} className="block mb-6">
              <span
                className="text-lg font-semibold font-carlo"
                style={subtleGradientText}
              >
                {edu.degree} - {edu.school}
              </span>
              <span className="block text-gray-400 text-sm mb-1 font-carlo">
                {edu.start} — {edu.end}
              </span>
              <span style={subtleGradientText} className="font-carlo">{edu.details}</span>
            </span>
          ))}
        </section>

        {/* Certifications */}
        <section id="certifications" className="mb-16">
          <span>
            <span
              className="text-2xl font-bold mb-4 block font-agoka"
              style={{ ...gradientText, fontFamily: "'Agoka', serif" }}
            >
              Certifications
            </span>
          </span>
          <ul className="list-disc ml-5">
            {certifications.map((cert: Certification) => (
              <span key={cert.id} className="block mb-2">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-carlo"
                  style={gradientText}
                >
                  {cert.name}
                </a>
                <span className="text-gray-400 ml-2 font-carlo">
                  ({cert.issuer}, {cert.date})
                </span>
              </span>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-16">
          <span>
            <span
              className="text-2xl font-bold mb-4 block font-agoka"
              style={{ ...gradientText, fontFamily: "'Agoka', serif" }}
            >
              Projects
            </span>
          </span>
          <span className="grid md:grid-cols-2 gap-8">
            {(showAllProjects ? projects : projects.slice(0, 4)).map((project: Project) => (
              <span key={project.id} className="block">
                <ProjectCard
                  project={{
                    name: project.title || "Untitled Project",
                    url: project.url ?? "https://example.com",
                    tech: project.techStack ?? [],
                    description: project.description ?? "No description available.",
                  }}
                />
              </span>
            ))}
          </span>
          {projects.length > 4 && (
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-2 rounded-xl font-semibold shadow font-carlo"
                style={{
                  background: "linear-gradient(90deg,#fff,#b0b0b0 90%)",
                  color: "#111",
                  boxShadow: "0 2px 10px #b0b0b044",
                  fontWeight: 600,
                  fontFamily: "'Carlo',sans-serif",
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
