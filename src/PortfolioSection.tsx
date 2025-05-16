import React, { useState } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
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

const Portfolio: React.FC = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <main style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Social Links */}
      <section style={{ display: 'flex', gap: 20, marginBottom: 40, fontSize: 24 }}>
        {socials.github && (
          <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
        )}
        {socials.linkedin && (
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        )}
        {socials.email && (
          <a href={`mailto:${socials.email}`} aria-label="Email">
            <FaEnvelope />
          </a>
        )}
        {socials.phone && (
          <a href={`tel:${socials.phone}`} aria-label="Phone">
            <FaPhone />
          </a>
        )}
        {socials.location && (
          <span title={socials.location} aria-label="Location" style={{ display: 'flex', alignItems: 'center' }}>
            <FaMapMarkerAlt />
          </span>
        )}
      </section>

      {/* Skills */}
      <section style={{ marginBottom: 40 }}>
        <h2>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {skills.map((skill: Skill) => (
            <div
              key={skill.name}
              style={{
                padding: '6px 14px',
                backgroundColor: '#e0e0e0',
                borderRadius: 15,
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {skill.name}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: 40 }}>
        <h2>Experience</h2>
        {experiences.map((exp: Experience) => (
          <div key={exp.id} style={{ marginBottom: 20 }}>
            <h3>{exp.position} @ {exp.company}</h3>
            <p style={{ fontStyle: 'italic', color: '#666' }}>{exp.startDate} - {exp.endDate || 'Present'}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: 40 }}>
        <h2>Education</h2>
        {education.map((edu: Education) => (
          <div key={edu.id} style={{ marginBottom: 20 }}>
            <h3>{edu.degree} - {edu.institution}</h3>
            <p style={{ fontStyle: 'italic', color: '#666' }}>{edu.startYear} - {edu.endYear || 'Present'}</p>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section style={{ marginBottom: 40 }}>
        <h2>Certifications</h2>
        {certifications.map((cert: Certification) => (
          <div key={cert.id} style={{ marginBottom: 15 }}>
            <h4>{cert.title}</h4>
            <p>{cert.issuer} — {cert.date}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section>
        <h2>Projects</h2>
        {(showAllProjects ? projects : projects.slice(0, 5)).map((project: Project) => (
          <div
            key={project.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ marginBottom: 5 }}>
              {project.name}{' '}
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} Link`} style={{ fontSize: 14 }}>
                  <FaExternalLinkAlt />
                </a>
              )}
            </h3>
            <p style={{ color: '#555' }}>{project.description}</p>
            {project.techStack && project.techStack.length > 0 && (
              <p style={{ fontSize: 13, fontStyle: 'italic', marginTop: 8 }}>
                Tech: {project.techStack.join(', ')}
              </p>
            )}
          </div>
        ))}
        {projects.length > 5 && (
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#007acc',
              color: 'white',
              fontWeight: 'bold',
              marginTop: 10,
            }}
          >
            {showAllProjects ? 'Show Less' : 'Show More'}
          </button>
        )}
      </section>
    </main>
  );
};

export default Portfolio;
