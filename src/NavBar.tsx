import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

const NAV_LINKS = [
  { to: "hero", label: "Home" },
  { to: "skills", label: "Skills" },
  { to: "experience", label: "Experience" },
  { to: "education", label: "Education" },
  { to: "certifications", label: "Certifications" },
  { to: "projects", label: "Projects" }
];

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" &&
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ||
      window.innerWidth < 768)
  );

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // preserve shape, compact on mobile, glass effect
  return (
    <nav
      id="navbar"
      className={`fixed top-5 left-1/2 z-50 transition-all duration-300`}
      style={{
        transform: "translateX(-50%)",
        padding: isMobile ? "0.25rem 0.5rem" : "0.55rem 1.3rem",
        background: "rgba(16,16,24,0.80)",
        borderRadius: "2rem",
        boxShadow: "0 2px 16px #2228, 0 1px 7px #fff1",
        border: "1.4px solid rgba(200,200,200,0.13)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        minWidth: isMobile ? "auto" : "380px",
        minHeight: isMobile ? "48px" : "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile ? "space-between" : "center"
      }}
    >
      <div className="flex items-center w-full">
        {/* Hamburger for mobile */}
        {isMobile && (
          <button
            className="mr-3"
            aria-label="Toggle navigation"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              outline: "none",
              cursor: "pointer",
              color: "#fff",
              fontSize: "2rem",
              lineHeight: 1
            }}
            onClick={() => setOpen((v) => !v)}
          >
            <span style={{ fontWeight: 900, fontSize: "2rem", display: "block" }}>
              {open ? "\u2715" : "\u2630"}
            </span>
          </button>
        )}
        <ul
          className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-center gap-0`}
          style={{
            transition: "max-height 0.4s cubic-bezier(.2,1.8,.4,1)",
            overflow: "hidden",
            maxHeight: isMobile ? (open ? "350px" : "0") : "none",
            width: isMobile ? "100%" : "auto",
            background: isMobile ? "rgba(18,18,27,0.94)" : "transparent",
            borderRadius: isMobile ? "1.5rem" : "2rem",
            margin: 0,
            padding: isMobile ? "0.7rem 0.2rem" : "0",
            boxShadow: isMobile && open ? "0 10px 42px #111b, 0 2px 12px #fff1" : undefined,
            position: isMobile ? "absolute" : "static",
            top: isMobile ? "60px" : undefined,
            left: isMobile ? "0" : undefined,
            right: isMobile ? "0" : undefined,
            zIndex: 100
          }}
        >
          {NAV_LINKS.map((link) => (
            <li
              key={link.to}
              className={`px-2 md:px-3 py-1 nav-link`}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: isMobile ? "1.05rem" : "1.1rem",
                letterSpacing: ".04em",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "1.2rem",
                margin: isMobile ? "0.15rem 0" : "0 0.25rem",
                transition: "background 0.12s, color 0.12s, transform 0.14s",
                background: "none"
              }}
              onClick={() => isMobile && setOpen(false)}
            >
              <Link
                to={link.to}
                smooth={true}
                duration={600}
                offset={-60}
                spy={true}
                activeClass="active"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        @media (max-width: 767px) {
          #navbar {
            min-width: 0 !important;
            max-width: 97vw !important;
            width: auto !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            padding: 0.25rem 0.5rem !important;
            border-radius: 1.5rem !important;
          }
          #navbar ul {
            width: 100% !important;
            left: 0 !important;
            right: 0 !important;
          }
        }
        .nav-link:hover, .nav-link:focus {
          background: linear-gradient(90deg,#fff1,#eaeaea22 65%);
          color: #1e1e1e !important;
          transform: scale(1.09);
        }
        .nav-link .active {
          color: #b0b0b0 !important;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
