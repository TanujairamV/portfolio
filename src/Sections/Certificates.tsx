import React from "react";
import { FaCertificate } from "react-icons/fa";

console.debug("[Debug] Certificates component file loaded");

const certificates = [
  {
    title: "Data Science and AI Completion",
    issuer: "IIT Madras",
    year: 2024,
    image: "ds.jpg", // Make sure ds.jpg is in your public folder
    description: "Certificate awarded by IIT Madras for successfully completing the Data Science and Artificial Intelligence course."
  },
  // Add more certificates as needed
];

const gradientTextStyle = {
  background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: "1.18rem",
  letterSpacing: ".02em",
  lineHeight: 1.6,
  display: "inline",
  cursor: "pointer"
} as React.CSSProperties;

const Certificates: React.FC = () => {
  const [shown, setShown] = React.useState(Array(certificates.length).fill(false));

  React.useEffect(() => {
    console.debug("[Debug] Certificates component rendered");
    console.debug("[Debug] Certificates data:", certificates);
  }, []);

  const handleToggle = (idx: number) => {
    setShown(prev => prev.map((val, i) => (i === idx ? !val : val)));
  };

  return (
    <section
      id="certificates"
      className="w-full flex flex-col items-center justify-center py-8 fade-in-up"
      style={{
        minHeight: "min(55vh, 460px)",
        background: "rgba(25, 28, 43, 0.44)",
        borderRadius: "2.2rem",
        boxShadow: "0 2px 24px 0 rgba(38, 52, 80, 0.13), 0 2px 32px 0 rgba(255,255,255,0.10)",
        margin: "0 auto",
        backdropFilter: "blur(10px)"
      }}
    >
      <span
        className="text-2xl font-bold mb-6 flex items-center gap-2 font-hatton"
        style={{
          background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "'Hatton', serif",
          letterSpacing: "0.02em",
        }}
      >
        <FaCertificate className="text-blue-300 drop-shadow" />
        Certificates
      </span>
      <div className="flex flex-col items-center w-full max-w-2xl gap-8">
        {certificates.map((cert, idx) => (
          <div
            key={idx}
            className="w-full flex flex-col items-center px-5 py-6 rounded-2xl border border-white/10 bg-white/5 glass-card"
            style={{
              boxShadow: "0 2px 22px 0 rgba(30, 42, 64, 0.09)",
              backdropFilter: "blur(6px)",
              background: "rgba(40, 44, 68, 0.21)",
              marginBottom: 10,
              transition: "box-shadow 0.18s cubic-bezier(.61,.13,.45,.87)"
            }}
          >
            <div
              className="mb-1 text-center w-full"
              style={gradientTextStyle}
              onClick={() => handleToggle(idx)}
              tabIndex={0}
              role="button"
              aria-pressed={shown[idx]}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleToggle(idx);
              }}
            >
              {cert.title}
            </div>
            <div className="flex flex-row items-center justify-center gap-2 mb-1">
              <span className="text-gray-300 text-base font-medium">{cert.issuer}</span>
              <span className="text-gray-400 text-xs">·</span>
              <span className="text-gray-400 text-xs">{cert.year}</span>
            </div>
            <div className="flex justify-center w-full min-h-[85px]">
              {!shown[idx] ? (
                <div
                  className="text-gray-400 text-xs text-center"
                  style={{
                    fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', sans-serif",
                    fontWeight: 400,
                    letterSpacing: ".011em",
                    padding: "0.5rem 0"
                  }}
                >
                  {cert.description}
                </div>
              ) : (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full max-w-xs h-auto rounded-xl shadow-lg border border-white/10 transition"
                  style={{ marginTop: 2, background: "#fff3" }}
                  onError={() => console.debug(`[Debug] Failed to load image: ${cert.image}`)}
                  onClick={() => handleToggle(idx)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={shown[idx]}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") handleToggle(idx);
                  }}
                />
              )}
            </div>
            <div className="text-xs text-gray-500 mt-2 select-none" style={{ userSelect: "none" }}>
              {shown[idx]
                ? "Click image or title to hide"
                : "Click title to view certificate"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
