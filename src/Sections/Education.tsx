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
    icon: <FaGraduationCap className="text-2xl text-blue-300" />,
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
          background: "linear-gradient(90deg, #fff 70%, #8080ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "'Hatton', serif",
        }}
      >
        <FaGraduationCap className="text-blue-300" />
        Education
      </div>
      <div
        className="relative flex flex-col items-center overflow-x-hidden"
        ref={sectionRef}
        style={{ minHeight: 400, scrollBehavior: "smooth" }}
      >
        {/* Timeline vertical bar */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 via-gray-500 to-blue-400 opacity-60 rounded-full pointer-events-none"
          aria-hidden="true"
          style={{ zIndex: 0 }}
        />
        {/* Animated pointer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-blue-400 bg-white/40 shadow-xl z-20 pointer-events-none transition-all"
          style={{
            top: getPointerTop() - 10,
            transition: "top 0.7s cubic-bezier(.4,2,.6,1), box-shadow 0.35s",
            boxShadow: "0 0 0 7px rgba(96,165,250,0.10)",
          }}
        />
        <ol className="relative z-10 w-full max-w-xl flex flex-col gap-16 overflow-y-auto snap-y snap-mandatory scroll-smooth"
            style={{ maxHeight: "70vh" }}>
          {educationData.map((edu, idx) => (
            <li key={edu.school} className="relative flex justify-center snap-center" style={{ zIndex: 1 }}>
              {/* Timeline dot */}
              <span
                className={`absolute left-1/2 -translate-x-1/2 -top-4 flex items-center justify-center w-6 h-6 rounded-full border-2 shadow-lg z-10 transition-all duration-300
                  ${activeIndex === idx
                    ? "bg-blue-400 border-blue-300 scale-110"
                    : "bg-white/10 border-slate-400"
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
                className={`ml-0 w-full max-w-md px-7 py-6 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl transition-all duration-500
                  ${activeIndex === idx ? "ring-2 ring-blue-400/60 scale-[1.03]" : ""}
                `}
                style={{
                  marginTop: "2.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                  <h3 className="text-xl font-bold mb-1 font-caviar text-blue-200">{edu.school}</h3>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <FaMapMarkerAlt className="inline-block mr-1 text-blue-400" />
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
