import React from "react";
import { FaBriefcase } from "react-icons/fa";

// Debug: log when Experience component renders
console.debug("[Debug] Experience component is loaded");

const experiences = [
  {
    title: "Open Source Contributor & Developer",
    period: "Jan 2023 – Present",
    description: [
      "Actively contributed to multiple open-source projects on GitHub.",
      "Built and maintained custom scripts and automation tools using Python, Selenium, and Tkinter.",
      "Created a personal Python library rupi featuring FLAMES, Tic Tac Toe, and a Chess GUI game.",
      "Maintainer (or aspiring maintainer) for ROMs on the ‘sky’ device, with experience building Android 14/15 custom ROMs using WSL, repo sync, and TWRP.",
      "Familiar with AOSP, fastboot, and logcat debugging."
    ],
  },
  {
    title: "Frontend Enthusiast & Portfolio Developer",
    period: "2024 – Present",
    description: [
      "Designed and deployed a clean, minimalistic personal portfolio using HTML, TailwindCSS, and GitHub Actions for auto-deployment to GitHub Pages.",
      "Added interactive touches like custom cursor effects and animated UI components.",
      "Optimized responsiveness and performance across devices."
    ],
  },
  {
    title: "Python Automation & Web Tools Developer",
    period: "2024 – Present",
    description: [
      "Built an Instagram automation bot integrating Selenium and mail.tm API for account creation and verification workflows.",
      "Handled logging, UI automation, and form interactions including birthday handling and code verification."
    ],
  },
];

const gradientTextStyle = {
  background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', sans-serif",
  fontWeight: 400,
  fontSize: "1.01rem",
  letterSpacing: "0.01em",
  lineHeight: 1.6,
  display: "inline"
} as React.CSSProperties;

const Experience: React.FC = () => {
  React.useEffect(() => {
    console.debug("[Debug] Experience component rendered");
    console.debug("[Debug] Experience data:", experiences);
  }, []);

  return (
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
            <ul className="list-disc ml-6 mt-2 text-gray-200">
              {exp.description.map((point, i) => (
                <li key={i} className="mb-1">
                  <span style={gradientTextStyle}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
