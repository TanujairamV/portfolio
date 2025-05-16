import React, { useState, useEffect } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaExternalLinkAlt,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

// Example data imports or you can replace with your own JSON or API data
import {
  projects,
  skills,
  socials,
  experiences,
  education,
  certifications,
} from './data'; // Replace './data' with your actual data module

// Utility: format date (simple)
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
};

const Portfolio: React.FC = () => {
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  // Optional: lazy load images or data, or other effects
  useEffect(() => {
    // Placeholder for any effect like analytics or theme
  }, []);

  return (
    <main className="portfolio-container" style={{ fontFamily: 'Montserrat, sans-serif', maxWidth: 900, margin: 'auto', padding: 20 }}>
      {/* Intro Section */}
      <section className="intro" style={{ marginBottom: 40 }}>
        <h1 style={{ fontWeight: 700, fontSize: '3rem', marginBottom: 5 }}>Tanujairam</h1>
        <p style={{ fontSize: '1.25rem', color: '#666' }}>
          Grade 12 Student | Developer | Coffee Enthusiast
        </p>
      </section>

      {/* Contact Info */}
      <section className="contact-info" style={{ marginBottom: 50 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: 5 }}>Contact</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: 15, fontSize: '1.1rem' }}>
          {socials.github && (
            <li>
              <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: '#333' }}>
                <FaGithub /> GitHub
              </a>
            </li>
          )}
          {socials.linkedin && (
            <li>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#0077b5' }}>
                <FaLinkedin /> LinkedIn
              </a>
            </li>
          )}
          {socials.email && (
            <li>
              <a href={`mailto:${socials.email}`} aria-label="Email" style={{ color: '#c71610' }}>
                <FaEnvelope /> Email
              </a>
            </li>
          )}
          {socials.phone && (
            <li>
              <a href={`tel:${socials.phone}`} aria-label="Phone" style={{ color: '#2c3e50' }}>
                <FaPhone /> Phone
              </a>
            </li>
          )}
          {socials.location && (
            <li style={{ display: 'flex', alignItems: 'center', color: '#666' }}>
              <FaMapMarkerAlt style={{ marginRight: 5 }} /> {socials.location}
            </li>
          )}
        </ul>
      </section>

      {/* Skills Section */}
      <section className="skills" style={{ marginBottom: 50 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: 5 }}>Skills</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 15,
            marginTop: 15,
          }}
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              style={{
                backgroundColor: '#f0f0f0',
                padding: '8px 14px',
                borderRadius: 20,
                fontWeight: '600',
                fontSize: '0.9rem',
              }}
            >
              {skill.name}
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience" style={{ marginBottom: 50 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: 5 }}>Experience</h2>
        {experiences.map((exp) => (
          <article
            key={exp.id}
            style={{ marginTop: 20, borderLeft: '3px solid #333', paddingLeft: 15 }}
          >
            <h3 style={{ marginBottom: 5 }}>{exp.title}</h3>
            <p style={{ fontStyle: 'italic', color: '#555', marginBottom: 5 }}>
              {exp.company} | {formatDate(exp.start)} - {exp.end ? formatDate(exp.end) : 'Present'}
            </p>
            <ul>
              {exp.responsibilities.map((resp, i) => (
                <li key={i} style={{ marginBottom: 3 }}>
                  {resp}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* Education Section */}
      <section className="education" style={{ marginBottom: 50 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: 5 }}>Education</h2>
        {education.map((edu) => (
          <article
            key={edu.id}
            style={{ marginTop: 20, borderLeft: '3px solid #333', paddingLeft: 15 }}
          >
            <h3 style={{ marginBottom: 5 }}>{edu.degree}</h3>
            <p style={{ fontStyle: 'italic', color: '#555', marginBottom: 5 }}>
              {edu.school} | {formatDate(edu.start)} - {formatDate(edu.end)}
            </p>
            <p>{edu.details}</p>
          </article>
        ))}
      </section>

      {/* Certifications Section */}
      <section className="certifications" style={{ marginBottom: 50 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: 5 }}>Certifications</h2>
        <ul>
          {certifications.map((cert) => (
            <li key={cert.id} style={{ marginBottom: 10 }}>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007acc', textDecoration: 'underline' }}
              >
                {cert.name} ({cert.issuer})
              </a>{' '}
              - {formatDate(cert.date)}
            </li>
          ))}
        </ul>
      </section>

      {/* Projects Section */}
      <section className="projects" style={{ marginBottom: 50 }}>
        <h2 style={{ borderBottom: '2px solid #333', paddingBottom: 5 }}>Projects</h2>
        {projects
          .slice(0, showMoreProjects ? projects.length : 5)
          .map((project) => (
            <article
              key={project.id}
              className="project-card"
              style={{
                border: '1px solid #ddd',
                borderRadius: 6,
                padding: 15,
                marginBottom: 20,
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ marginBottom: 5 }}>{project.title}</h3>
              <p style={{ marginBottom: 10 }}>{project.description}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      backgroundColor: '#eee',
                      padding: '4px 10px',
                      borderRadius: 12,
                      fontSize: '0.85rem',
                      fontWeight: '600',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 10,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    color: '#007acc',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  View Project <FaExternalLinkAlt />
                </a>
              )}
            </article>
          ))}
        {projects.length > 5 && (
          <button
            onClick={() => setShowMoreProjects(!showMoreProjects)}
            style={{
              padding: '10px 20px',
              borderRadius: 6,
              border: 'none',
              backgroundColor: '#007acc',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {showMoreProjects ? 'Show Less' : 'Show More'}
          </button>
        )}
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: 20, color: '#999', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} Tanujairam. All rights reserved.
      </footer>
    </main>
  );
};

export default Portfolio;
