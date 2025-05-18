
import React, { useState } from "react";
import { FaCertificate } from "react-icons/fa";

const Certificates: React.FC = () => {
  const [showImage, setShowImage] = useState(false);

  return (
    <section
      id="certifications"
      className="mb-16 flex flex-col items-center justify-center fade-in-up"
      data-fade-delay="5"
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
        <FaCertificate className="text-yellow-400 drop-shadow" />
        Certifications
      </span>
      <p className="mb-4 text-center text-lg text-gray-300">
        Successfully completed the <b>Data Science</b> course from IIT Madras.
        <br />
        Click the button below to view the certificate.
      </p>
      <button
        className="px-6 py-2 mb-4 rounded-lg font-semibold shadow font-caviar bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 transition"
        onClick={() => setShowImage((v) => !v)}
        aria-expanded={showImage}
        aria-controls="certificate-img"
      >
        {showImage ? "Hide Certificate" : "Show Certificate"}
      </button>
      {showImage && (
        <div
          id="certificate-img"
          className="flex flex-col items-center mt-2 animate-fadein"
        >
          <img
            src="/ds.jpg"
            alt="IITM Data Science Certificate"
            className="w-full max-w-md border-2 border-yellow-400 rounded-lg shadow-xl"
          />
          <span className="text-xs text-gray-500 mt-2">
            IIT Madras Data Science Certificate (ds.jpg)
          </span>
        </div>
      )}
    </section>
  );
};

export default Certificates;
