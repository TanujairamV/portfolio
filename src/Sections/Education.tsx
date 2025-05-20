import React, { useRef, useEffect, useState } from "react";
import { FaGraduationCap, FaMapMarkerAlt, FaSchool } from "react-icons/fa";

// Timeline data (earliest first, latest last)
const educationData = [
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
    school: "FIITJEE, Chennai",
    location: "Chennai, Tamil Nadu, India",
    period: "2023 – Present",
    details: [
      "Enrolled in the prestigious IIT-JEE preparation program",
      "Focus on Physics, Chemistry, Mathematics, and Computer Science",
    ],
    grade: "Grade 11 to Present",
    icon: <FaGraduationCap className="text-2xl text-yellow-300" />,
  },
];

const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Smoother effect with IntersectionObserver
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const idx = Number(visibleEntries[0].target.getAttribute("data-index"));
          setActiveIndex(idx);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.25, 0.5, 0.75, 1],
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      itemRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Calculate the pointer (circle) top position
  const getPointerTop = () => {
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
      <div className="relative flex flex-col items-center" ref={sectionRef} style={{ minHeight: 400 }}>
        {/* Timeline vertical bar */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-300 via-gray-400 to-yellow-300 opacity-50 rounded-full pointer-events-none"
          aria-hidden="true"
          style={{ zIndex: 0 }}
        />
        {/* Animated pointer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-7 h-7 rounded-full border-4 border-yellow-400 bg-black transition-all shadow-lg z-20 pointer-events-none"
          style={{
            top: getPointerTop() - 14,
            transition: "top 0.6s cubic-bezier(.4,2,.6,1)",
          }}
        />
        <ol className="relative z-10 w-full max-w-xl flex flex-col gap-16">
          {educationData.map((edu, idx) => (
            <li key={edu.school} className="relative flex justify-center" style={{ zIndex: 1 }}>
              {/* Timeline dot */}
              <span
                className={`absolute left-1/2 -translate-x-1/2 -top-4 flex items-center justify-center w-7 h-7 rounded-full border-2 shadow-lg z-10 transition-all duration-300
                  ${activeIndex === idx
                    ? "bg-yellow-400 border-yellow-400 scale-110"
                    : "bg-gray-900 border-yellow-300"
                  }
                `}
                style={{
                  transition: "all 0.35s cubic-bezier(.4,2,.6,1)",
                }}
              >
                {edu.icon}
              </span>
              {/* Glassmorphic tile */}
              <div
                ref={el => (itemRefs.current[idx] = el)}
                data-index={idx}
                className={`ml-0 w-full max-w-md px-7 py-6 rounded-xl border border-gray-400/30 bg-white/10 backdrop-blur-md shadow-xl transition-all duration-500
                  ${activeIndex === idx ? "ring-2 ring-yellow-300/70 scale-[1.02]" : ""}
                `}
                style={{
                  marginTop: "2.5rem",
                  marginBottom: "0.5rem",
                }}
              >
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
