import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
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
  const [mobile, setMobile] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ripple Handler for NavBar links
  const handleRipple = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;
    circle.classList.add("ripple-span");
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - target.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - target.getBoundingClientRect().top - radius}px`;

    // Remove existing ripples
    const ripple = target.getElementsByClassName("ripple-span")[0];
    if (ripple) ripple.remove();

    target.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 500);
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-5 left-1/2 z-50 transition-all duration-300`}
      style={{
        transform: "translateX(-50%)",
        padding: mobile ? "0.18rem 0.5rem" : "0.55rem 1.6rem",
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
        justifyContent: "center",
        fontFamily: "'Space Grotesk', 'Poppins', sans-serif"
      }}
    >
      <ul
        className={`flex flex-row items-center justify-center w-full`}
        style={{
          gap: mobile ? "0.7rem" : "0.6rem",
          margin: 0,
          padding: 0,
          width: "100%"
        }}
      >
        {NAV_LINKS.map((link) => (
          <li
            key={link.to}
            className={`px-1.5 md:px-3 py-1 nav-link ripple`}
            style={{
              fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
              fontWeight: 600,
              textTransform: "capitalize",
              fontSize: mobile ? "1.29rem" : "1.08rem",
              letterSpacing: ".042em",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "1.2rem",
              margin: mobile ? "0.12rem 0" : "0 0.18rem",
              display: "flex",
              alignItems: "center",
              background: "none",
              transition: "background 0.13s, color 0.13s, transform 0.16s",
              position: "relative",
              overflow: "hidden"
            }}
            onClick={handleRipple}
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
                background: "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
                fontWeight: 700,
                textTransform: "capitalize"
              }}
              tabIndex={0}
              aria-label={link.label}
            >
              {mobile ? link.icon : (
                <span
                  style={{
                    background: "linear-gradient(90deg, #fff 80%, #b0b0b0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', 'Poppins', sans-serif"
                  }}
                >
                  {link.label}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
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
            padding: 0.13rem 0.3rem !important;
            border-radius: 1.5rem !important;
          }
          #navbar ul {
            width: 100% !important;
            left: 0 !important;
            right: 0 !important;
          }
          html, body, * {
            cursor: none !important;
          }
        }
        /* Ripple effect for NavBar links */
        .ripple {
          position: relative;
          overflow: hidden;
        }
        .ripple-span {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animate 0.5s linear;
          background-color: rgba(255,255,255,0.25);
          pointer-events: none;
          z-index: 2;
        }
        @keyframes ripple-animate {
          to {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
