import React from "react";

const experiences = [
  {
    title: "Software Development Intern",
    company: "Tech Solutions Pvt. Ltd.",
    location: "Bangalore, India",
    period: "Jan 2024 – Apr 2024",
    description: [
      "Worked on development and optimization of internal tools using React and Node.js.",
      "Collaborated with the QA team to resolve bugs and improve the deployment process.",
      "Gained experience with REST APIs and Agile methodologies."
    ],
  }
];

const Experience: React.FC = () => (
  <section>
    <h2>Experience</h2>
    <div>
      {experiences.map((exp, idx) => (
        <div key={idx}>
          <div>{exp.title}</div>
          <div>{exp.company}</div>
          <div>{exp.location}</div>
          <div>{exp.period}</div>
          <ul>
            {exp.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;
