import React from "react";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
];

const NavBar: React.FC = () => (
  <nav className="fixed top-7 left-1/2 z-50 -translate-x-1/2">
    <div
      className="
        flex items-center justify-center gap-7 px-10 py-3
        rounded-full shadow-2xl
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        transition
        hover:bg-white/20
      "
      style={{
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        WebkitBackdropFilter: "blur(12px)",
        fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
      }}
    >
      {navLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="
            text-base font-semibold px-3 py-1 rounded-full
            hover:bg-white/40 hover:text-black transition
            focus:outline-none focus:ring-2 focus:ring-accent
          "
        >
          {link.label}
        </a>
      ))}
    </div>
  </nav>
);

export default NavBar;
