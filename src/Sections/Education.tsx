import React from "react";
import { FaGraduationCap, FaMapMarkerAlt, FaSchool } from "react-icons/fa";
// Removed useFadeInOnScroll import and usage

// Timeline data
const educationData = [
  {
    school: "FIITJEE, Chennai",
    location: "Chennai, Tamil Nadu, India",
    period: "2023 – Present",
    details: [
      "Enrolled in the prestigious IIT-JEE preparation program",
      "Focus on Physics, Chemistry, Mathematics, and Computer Science",
    ],
    stream: "Integrated School Program (Science Stream)",
    grade: "Grade 11 to Present",
    icon: <FaGraduationCap className="text-2xl text-yellow-300" />,
  },
  {
    school: "Sri Balaji Gurukulam Matriculation Higher Secondary School",
    location: "Srimushnam, Tamil Nadu, India",
    period: "2017 – 2023",
    details: [
      "Completed Middle and High School education under Tamil Nadu State Board",
      "Actively participated in science fairs and inter-school competitions",
    ],
    grade: "Grade 5 to 10",
    icon: <FaSchool className="text-2xl text-teal-300" />,
  },
  {
    school: "St. Joseph’s Matriculation Higher Secondary School",
    location: "Hosur, Tamil Nadu, India",
    period: "2013 – 2017",
    details: [
      "Early foundational education",
      "Developed interest in mathematics and computers at a young age",
    ],
    grade: "Grade 1 to 4",
    icon: <FaSchool className="text-2xl text-indigo-300" />,
  },
];

const timelineBar = (
  <div
    className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-300 via-gray-500 to-indigo-400 opacity-60 rounded-full"
    aria-hidden="true"
  />
);

const Education: React.FC = () => {
  return (
    <section
      id="education"
      className="mb-16"
    >
      <div
        className="text-2xl font-bold mb-8 flex items-center gap-2 font-hatton"
        style={{
          background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "'Hatton', serif",
        }}
      >
        <FaGraduationCap className="text-yellow-300" />
        Education
      </div>
      <div className="relative pl-12">
        {timelineBar}
        <ol className="space-y-12 relative z-10">
          {educationData.map((edu) => (
            <li
              key={edu.school}
              className="relative group"
            >
              {/* Timeline dot */}
              <span className="absolute -left-2 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 border-2 border-yellow-300 shadow-lg z-10">
                {edu.icon}
              </span>
              {/* Card */}
              <div className="ml-8 p-6 bg-gradient-to-br from-[#18181b] via-[#23232b] to-[#1a1a23] rounded-xl shadow-md border border-gray-800 hover:border-yellow-400 transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                  <h3 className="text-xl font-bold mb-1 font-caviar text-yellow-200">{edu.school}</h3>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <FaMapMarkerAlt className="inline-block mr-1 text-yellow-400" />
                    {edu.location}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <span className="text-sm text-gray-300 font-semibold mb-1">
                    {edu.grade}
                    {edu.stream ? ` – ${edu.stream}` : ""}
                  </span>
                  <span className="text-xs text-gray-400 font-caviar">{edu.period}</span>
                </div>
                <ul className="list-disc ml-5 mt-2 text-gray-300 font-caviar space-y-1">
                  {edu.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Education;
