import React from "react";
import { FaGithub, FaCodeBranch, FaCheckCircle } from "react-icons/fa";
import { MdWork } from "react-icons/md";

const experienceData = [
  {
    title: "Contributor – A17 WhatsApp Bot",
    company: "A17 WhatsApp Bot (Open Source Project)",
    location: "Open Source Project (GitHub)",
    duration: "2023 - 2024",
    link: "https://github.com/A17-Official/A17",
    isClosed: true,
    highlights: [
      "Contributed modules and bug fixes to the A17 multipurpose WhatsApp Userbot built using Baileys library (Node.js)",
      "Enhanced user commands, improved error handling, and maintained stability across updates",
      "Collaborated with other developers through GitHub issues and pull requests",
    ],
    icon: <FaCodeBranch className="text-2xl text-green-400" />,
  },
  // You can add more experience objects here
];

const Experience: React.FC = () => (
  <section id="experience" className="mb-16 fade-in-up" data-fade-delay="3">
    <div className="text-2xl font-bold mb-8 flex items-center gap-2 font-hatton"
      style={{
        background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontFamily: "'Hatton', serif",
      }}
    >
      <MdWork className="text-yellow-300" />
      Experience
    </div>
    <div className="relative pl-8">
      <ol className="space-y-12 relative z-10">
        {experienceData.map((exp, idx) => (
          <li key={exp.title} className="relative group fade-in-up" data-fade-delay={idx + 1}>
            {/* Timeline dot */}
            <span className="absolute -left-8 top-2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 border-2 border-green-400 shadow-lg z-10">
              {exp.icon}
            </span>
            {/* Card */}
            <div className="ml-4 p-6 bg-gradient-to-br from-[#18181b] via-[#23232b] to-[#1a1a23] rounded-xl shadow-md border border-gray-800 hover:border-green-400 transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                <h3 className="text-lg font-bold mb-1 font-caviar text-green-200 flex items-center gap-2">
                  {exp.title}{" "}
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 inline-flex items-center underline text-green-300 hover:text-green-400 text-base"
                    >
                      <FaGithub className="mr-1" />Repo
                    </a>
                  )}
                  {exp.isClosed && (
                    <span className="ml-1 px-2 py-0.5 rounded text-xs bg-red-700 text-white font-semibold flex items-center gap-1">
                      <FaCheckCircle className="mr-1 text-xs" />
                      Closed
                    </span>
                  )}
                </h3>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  {exp.location}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="text-sm text-gray-300 font-semibold mb-1">{exp.company}</span>
                <span className="text-xs text-gray-400 font-caviar">{exp.duration}</span>
              </div>
              <ul className="list-disc ml-5 mt-2 text-gray-300 font-caviar space-y-1">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
