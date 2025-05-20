import React from "react";
import { FaBriefcase } from "react-icons/fa";

const experiences = [
  {
    title: "Software Development Intern",
    company: "Tech Solutions Pvt. Ltd.",
    location: "Bangalore, India",
    period: "Jan 2024 – Apr 2024",
    description: [
      "Worked on the development and optimization of internal tools using React and Node.js.",
      "Collaborated with the QA team to resolve bugs and improve the deployment process.",
      "Gained experience with REST APIs and Agile methodologies.",
    ],
  },
  {
    title: "Web Development Intern",
    company: "Creative Minds",
    location: "Remote",
    period: "May 2023 – Jul 2023",
    description: [
      "Developed responsive web pages using HTML, CSS, and JavaScript.",
      "Integrated third-party services and assisted in UI/UX improvements.",
      "Participated in code reviews and delivered features on schedule.",
    ],
  },
];

const Experience: React.FC = () => (
  <section
    id="experience"
    className="mb-16 flex flex-col items-center justify-center fade-in-up"
    data-fade-delay="3"
  >
    <span
      className="text-2xl font-bold mb-4 flex items-center gap-2 font-hatton"
      style={{
        background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontFamily: "'Hatton', serif",
      }}
    >
      <FaBriefcase className="text-yellow-400 drop-shadow" />
      Experience
    </span>
    <div className="w-full max-w-2xl">
      {experiences.map((exp, idx) => (
        <div
          key={idx}
          className="mb-8 p-6 rounded-xl bg-black/60 border-l-4 border-yellow-400 shadow-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-semibold text-yellow-300">{exp.title}</div>
            <div className="text-sm text-gray-400">{exp.period}</div>
          </div>
          <div className="text-md font-medium text-white">{exp.company}</div>
          <div className="text-sm text-gray-400 mb-2">{exp.location}</div>
          <ul className="list-disc ml-6 text-gray-200">
            {exp.description.map((point, i) => (
              <li key={i} className="mb-1">{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;
