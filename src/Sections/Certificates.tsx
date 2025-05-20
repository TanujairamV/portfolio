import React from "react";
import { FaCertificate } from "react-icons/fa";

console.debug("[Debug] Certificates component file loaded");

const certificates = [
  {
    title: "Data Science and AI Completion",
    issuer: "IIT Madras",
    year: 2024,
    image: "/ds.png", // Make sure ds.png is in your public folder
    description: "Certificate awarded by IIT Madras for successfully completing the Data Science and Artificial Intelligence course."
  },
  // Add other certificates here if needed
];

const gradientTextStyle = {
  background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: "1.06rem",
  letterSpacing: "0.01em",
  lineHeight: 1.6,
  display: "inline"
} as React.CSSProperties;

const Certificates: React.FC = () => {
  React.useEffect(() => {
    console.debug("[Debug] Certificates component rendered");
    console.debug("[Debug] Certificates data:", certificates);
  }, []);

  return (
    <section id="certificates" className="flex flex-col items-center justify-center fade-in-up">
      <span
        className="text-2xl font-bold mb-4 flex items-center gap-2 font-hatton"
        style={{
          background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "'Hatton', serif",
        }}
      >
        <FaCertificate className="text-yellow-400 drop-shadow" />
        Certificates
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        {certificates.map((cert, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-4 bg-black/60 rounded-xl shadow-lg border-l-4 border-yellow-400"
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full max-w-xs h-auto rounded-lg shadow mb-4"
              style={{ background: "#222" }}
              onError={() => console.debug(`[Debug] Failed to load image: ${cert.image}`)}
            />
            <div className="text-yellow-300 font-semibold mb-2" style={gradientTextStyle}>
              {cert.title}
            </div>
            <div className="text-gray-300 text-sm mb-1">{cert.issuer}</div>
            <div className="text-gray-400 text-xs mb-2">{cert.year}</div>
            <div className="text-gray-400 text-xs text-center">{cert.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
