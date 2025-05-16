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
  <nav className="fixed top-0 left-0 w-full z-20 bg-gradient-to-b from-black/70 to-transparent pt-4 pb-2">
    <ul className="flex justify-center gap-10 md:gap-16 font-mono text-lg tracking-wide">
      {navLinks.map((link) => (
        <li key={link.id}>
          <a
            href={`#${link.id}`}
            className="hover:text-accent transition font-semibold"
            style={{ fontFamily: "'Montserrat', 'monospace', 'sans-serif'" }}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavBar;
