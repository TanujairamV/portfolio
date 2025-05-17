import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certs" },
  { id: "projects", label: "Projects" }
];

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Hide mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 px-2 sm:px-8 py-2"
      style={{
        background: "rgba(19,19,27,0.73)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(200,200,200,0.06)",
        boxShadow: "0 1px 10px #0003"
      }}
    >
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <a href="#hero" className="font-bold text-[1.3rem] tracking-wide" style={{
          color: "white",
          fontFamily: "'Montserrat',sans-serif"
        }}>Tanujairam V</a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-white/90 hover:text-accent transition font-semibold text-[1.05rem] px-2"
              style={{
                fontFamily: "'Montserrat',sans-serif"
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-2 outline-none"
          aria-label="Toggle navigation"
          onClick={() => setOpen(o => !o)}
        >
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
        </button>
      </div>
      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden transition-all duration-200 ease-in-out bg-[rgba(18,18,22,0.93)] rounded-xl shadow-lg backdrop-blur-md
          ${open ? "max-h-[380px] mt-3 py-3 px-4" : "max-h-0 overflow-hidden px-4"}`
        }
        style={{
          fontFamily: "'Montserrat',sans-serif"
        }}
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="block text-white/90 py-3 px-2 rounded hover:text-accent transition font-semibold text-[1.13rem]"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
