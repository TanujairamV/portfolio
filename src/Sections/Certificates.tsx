import React from "react";
import { FaCertificate } from "react-icons/fa";

console.debug("[Debug] Certificates component file loaded");

const certificates = [
  {
    title: "Data Science and AI Completion",
    issuer: "IIT Madras",
    year: 2024,
    image: "ds.jpg", // Make sure ds.jpg is in your public folder or use /certificates/ds.jpg
    description:
      "Certificate awarded by IIT Madras for successfully completing the Data Science and Artificial Intelligence course.",
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
  textAlign: "center",
  width: "100%",
} as React.CSSProperties;

const Certificates: React.FC = () => {
  const cert = certificates[0];
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    console.debug("[Debug] Certificates component rendered");
    console.debug("[Debug] Certificates data:", certificates);
  }, []);

  const handleToggle = () => setShown((prev) => !prev);

  return (
    <div
      className="flex flex-col items-center justify-center w-full max-w-2xl group cursor-pointer outline-none"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      role="button"
      aria-pressed={shown}
      style={{
        userSelect: "none",
        outline: "none",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full text-center">
        <div
          className="mb-1 w-full flex justify-center items-center gap-2"
          style={gradientTextStyle}
        >
          <FaCertificate className="text-blue-300 drop-shadow" />
          {cert.title}
        </div>

        <div className="flex flex-row items-center justify-center gap-2 mb-1 w-full text-center">
          <span className="text-gray-300 text-base font-medium">{cert.issuer}</span>
          <span className="text-gray-400 text-xs">·</span>
          <span className="text-gray-400 text-xs">{cert.year}</span>
        </div>

        <div className="flex justify-center items-center w-full min-h-[85px] text-center">
          {!shown ? (
            <div
              className="text-gray-400 text-xs w-full flex justify-center items-center px-2"
              style={{
                fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', sans-serif",
                fontWeight: 400,
                letterSpacing: ".011em",
                textAlign: "center",
              }}
            >
              {cert.description}
            </div>
          ) : (
            <img
              src={cert.image}
              alt={cert.title}
              className="max-w-xs w-full h-auto rounded-xl shadow-lg border border-white/10 transition-all duration-300 ease-in-out block mx-auto"
              style={{ marginTop: 2, background: "#fff3" }}
              tabIndex={-1}
              draggable={false}
              onError={(e) => {
                console.debug(`[Debug] Failed to load image: ${cert.image}`);
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
        </div>

        <div className="text-xs text-gray-500 mt-2 select-none text-center w-full flex justify-center items-center">
          {shown
            ? "Click anywhere to hide certificate"
            : "Click anywhere to view certificate"}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
