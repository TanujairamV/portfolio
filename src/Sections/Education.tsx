import React, { useRef, useEffect, useState } from "react";
import { FaGraduationCap, FaMapMarkerAlt, FaSchool } from "react-icons/fa";

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

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Effect to track scroll and update which school is active
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollPos = window.scrollY + window.innerHeight / 2;

      let found = 0;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const li = itemRefs.current[i];
        if (li) {
          const rect = li.getBoundingClientRect();
          const liTop = rect.top + window.scrollY;
          if (scrollPos >= liTop) {
            found = i;
          }
        }
      }
      setActiveIndex(found);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate the pointer (circle) top position
  const getPointerTop = () => {
    // Default to first item if refs not set yet
    if (!itemRefs.current[activeIndex]) return 0;
    const li = itemRefs.current[activeIndex];
    if (!li || !sectionRef.current) return 0;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();
    const offset = liRect.top - sectionRect.top + liRect.height / 2;
    return offset;
  };

  return (
    <section id="education" className="mb-16">
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
      <div className="relative pl-12" ref={sectionRef} style={{minHeight: 400}}>
        {/* Timeline vertical bar */}
        <div
          className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-300 via-gray-500 to-indigo-400 opacity-60 rounded-full"
          aria-hidden="true"
        />
        {/* Animated pointer */}
        <div
          className="absolute left-3 w-7 h-7 rounded-full border-4 border-yellow-400 bg-black transition-all duration-400 shadow-lg z-20 pointer-events-none"
          style={{
            top: getPointerTop() - 14, // center circle on item
            transition: "top 0.4s cubic-bezier(.4,2,.6,1)",
          }}
        />
        <ol className="space-y-12 relative z-10">
          {educationData.map((edu, idx) => (
            <li
              key={edu.school}
              ref={el => (itemRefs.current[idx] = el)}
              className="relative group"
            >
              {/* Timeline dot */}
              <span
                className={`absolute -left-2 top-0 flex items-center justify-center w-6 h-6 rounded-full border-2 shadow-lg z-10
                  ${activeIndex === idx
                    ? "bg-yellow-400 border-yellow-400 scale-110"
                    : "bg-gray-900 border-yellow-300"
                  }
                `}
                style={{
                  transition: "all 0.3s cubic-bezier(.4,2,.6,1)"
                }}
              >
                {edu.icon}
              </span>
              {/* Card - now no background box */}
              <div className="ml-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                  <h3 className="text-xl font-bold mb-1 font-caviar text-yellow-200">{edu.school}</h3>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <FaMapMarkerAlt className="inline-block mr-1 text-yellow-400" />
                    {edu.location}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <span className="text-sm text-gray-300 font-semibold mb-1">
                    {edu.grade}{edu.stream ? ` – ${edu.stream}` : ""}
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
