import React, { useState, useEffect } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaExternalLinkAlt,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

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
  Project,
} from './data';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
};

const Portfolio: React.FC = () => {
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  useEffect(() => {}, []);

  return (
    <main style={{ fontFamily: 'Montserrat, sans-serif', maxWidth: 900, margin: 'auto', padding: 20 }}>
      {/* ... rest is the same ... */}

      {/* Skills */}
      <section className="skills" style={{ marginBottom: 50 }}>
        <h2>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15, marginTop: 15 }}>
          {skills.map((skill: Skill) => (
            <div key={skill.name} style={{ backgroundColor: '#f0f0f0', padding: '8px 14px', borderRadius: 20, fontWeight: '600', fontSize: '0.9rem' }}>
              {skill.name}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="experience" style={{ marginBottom: 50 }}>
        <h2>Experience</h2>
        {experiences.map((exp: Experience) => (
          <article key={exp.id} style={{ marginTop: 20, borderLeft: '3px solid #333', paddingLeft: 15 }}>
            <h3>{exp.title}</h3>
            <p style={{ fontStyle: 'italic', color: '#555' }}>
              {exp.company} | {formatDate(exp.start)} - {exp.end ? formatDate(exp.end) : 'Present'}
            </p>
            <ul>
              {exp.responsibilities.map((resp: string, i: number) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* Education */}
      <section className="education" style={{ marginBottom: 50 }}>
        <h2>Education</h2>
        {education.map((edu: Education) => (
          <article key={edu.id} style={{ marginTop: 20, borderLeft: '3px solid #333', paddingLeft: 15 }}>
            <h3>{edu.degree}</h3>
            <p style={{ fontStyle: 'italic', color: '#555' }}>
              {edu.school} | {formatDate(edu.start)} - {formatDate(edu.end)}
            </p>
            <p>{edu.details}</p>
          </article>
        ))}
      </section>

      {/* Certifications */}
      <section className="certifications" style={{ marginBottom: 50 }}>
        <h2>Certifications</h2>
        <ul>
          {certifications.map((cert: Certification) => (
            <li key={cert.id}>
              <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007acc', textDecoration: 'underline' }}>
                {cert.name} ({cert.issuer})
              </a>{' '}
              - {formatDate(cert.date)}
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="projects" style={{ marginBottom: 50 }}>
        <h2>Projects</h2>
        {projects.slice(0, showMoreProjects ? projects.length : 5).map((project: Project) => (
          <article key={project.id} style={{ border: '1px solid #ddd', borderRadius: 6, padding: 15, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {project.techStack.map((tech: string) => (
                <span key={tech} style={{ backgroundColor: '#eee', padding: '4px 10px', borderRadius: 12, fontSize: '0.85rem', fontWeight: '600' }}>
                  {tech}
                </span>
              ))}
            </div>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 5, color: '#007acc', fontWeight: 600, textDecoration: 'none' }}>
                View Project <FaExternalLinkAlt />
              </a>
            )}
          </article>
        ))}
        {projects.length > 5 && (
          <button onClick={() => setShowMoreProjects(!showMoreProjects)} style={{ padding: '10px 20px', borderRadius: 6, border: 'none', backgroundColor: '#007acc', color: '#fff', cursor: 'pointer' }}>
            {showMoreProjects ? 'Show Less' : 'Show More'}
          </button>
        )}
      </section>

      <footer style={{ textAlign: 'center', padding: 20, color: '#999', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Tanujairam. All rights reserved.
      </footer>
    </main>
  );
};

export default Portfolio;
