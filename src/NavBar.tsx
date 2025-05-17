import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaHome, FaUserGraduate, FaBriefcase, FaCertificate, FaProjectDiagram, FaTools } from "react-icons/fa";
import { MdHome, MdWork, MdSchool, MdStar, MdBuild, MdAssignment } from "react-icons/md";

// List of nav items and icons for desktop and mobile
const NAV_LINKS = [
  { to: "hero", label: "Home", icon: <MdHome size={22} /> },
  { to: "skills", label: "Skills", icon: <MdBuild size={22} /> },
  { to: "experience", label: "Experience", icon: <MdWork size={22} /> },
  { to: "education", label: "Education", icon: <MdSchool size={22} /> },
  { to: "certifications", label: "Certifications", icon: <MdStar size={22} /> },
  { to: "projects", label: "Projects", icon: <MdAssignment size={22} /> }
];

const isMobile = () =>
  typeof window !== "undefined" &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ||
    window.innerWidth < 768);

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-5 left-1/2 z-50 transition-all duration-300`}
      style={{
        transform: "translateX(-50%)",
        padding: mobile ? "0.20rem 0.6rem" : "0.55rem 1.6rem",
        background: "rgba(18,18,30,0.83)",
        borderRadius: "2rem",
        boxShadow: "0 2px 18px #222a, 0 1px 10px #fff1",
        border: "1.5px solid rgba(220,220,220,0.13)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        minWidth: mobile ? "auto" : "400px",
        minHeight: mobile ? "46px" : "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: mobile ? "space-between" : "center",
        fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', 'Quicksand', sans-serif"
      }}
    >
      <div className="flex items-center w-full relative">
        {/* Hamburger for mobile */}
        {mobile && (
          <button
            className="mr-2"
            aria-label="Toggle navigation"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              outline: "none",
              cursor: "pointer",
              color: "#fff"
            }}
            onClick={() => setOpen((v) => !v)}
          >
            <span style={{ fontSize: "2.2rem", display: "block" }}>
              {open ? "\u2715" : "\u2630"}
            </span>
          </button>
        )}
        <ul
          className={`transition-all flex-col ${mobile ? "absolute left-0 right-0 items-center bg-[rgba(18,18,30,0.97)]" : "flex-row items-center bg-transparent"} flex justify-center`}
          style={{
            top: mobile ? "55px" : undefined,
            borderRadius: mobile ? "1.4rem" : "2rem",
            margin: 0,
            padding: mobile ? (open ? "0.7rem 0.2rem" : "0") : "0",
            width: mobile ? "100%" : "auto",
            boxShadow: mobile && open ? "0 10px 40px #111b, 0 2px 12px #fff2" : undefined,
            maxHeight: mobile ? (open ? "420px" : "0") : "none",
            overflow: "hidden",
            zIndex: 200,
            display: mobile && !open ? "none" : undefined
          }}
        >
          {NAV_LINKS.map((link) => (
            <li
              key={link.to}
              className={`px-1.5 md:px-3 py-1 nav-link`}
              style={{
                fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: mobile ? "1.10rem" : "1.09rem",
                letterSpacing: ".045em",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "1.2rem",
                margin: mobile ? "0.15rem 0" : "0 0.18rem",
                display: "flex",
                alignItems: "center",
                background: "none",
                transition: "background 0.13s, color 0.13s, transform 0.16s"
              }}
              onClick={() => mobile && setOpen(false)}
            >
              <Link
                to={link.to}
                smooth={true}
                duration={600}
                offset={-60}
                spy={true}
                activeClass="active"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55em",
                  background: "linear-gradient(90deg,#fff 65%,#b0b0b0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "'Dancing Script', 'Style Script', 'Space Grotesk', 'Poppins', sans-serif"
                }}
              >
                {mobile ? link.icon : (
                  <span
                    style={{
                      background: "linear-gradient(90deg, #fff 80%, #b0b0b0 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 700,
                      fontFamily: "'Dancing Script', 'Style Script', 'Space Grotesk', 'Poppins', sans-serif"
                    }}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .nav-link:hover, .nav-link:focus {
          background: linear-gradient(90deg,#fff1,#eaeaea22 80%);
          color: #232323 !important;
          transform: scale(1.08);
        }
        .nav-link .active {
          color: #b0b0b0 !important;
        }
        @media (max-width: 767px) {
          #navbar {
            min-width: 0 !important;
            max-width: 97vw !important;
            width: auto !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            padding: 0.15rem 0.5rem !important;
            border-radius: 1.5rem !important;
          }
          #navbar ul {
            width: 100% !important;
            left: 0 !important;
            right: 0 !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
