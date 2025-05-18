import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { MdHome, MdWork, MdSchool, MdStar, MdBuild, MdAssignment } from "react-icons/md";
import { useFadeInOnScroll } from "./useFadeInOnScroll"; // <-- Fixed import path

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
  const navRef = useFadeInOnScroll<HTMLDivElement>();

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
      ref={navRef}
      id="navbar"
      className="glass-navbar fixed top-5 left-1/2 z-50 transition-all duration-300 fade-in"
      style={{
        transform: "translateX(-50%)",
        padding: mobile ? "0.18rem 0.5rem" : "0.55rem 2.2rem",
        borderRadius: "2.2rem",
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
        {NAV_LINKS.map((link, i) => (
          <li
            key={link.to}
            className={`px-1.5 md:px-3 py-1 nav-link ripple fade-in`}
            data-fade-delay={i + 1}
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
            tabIndex={0}
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
              {!mobile && (
                <span className="nav-arrow" style={{ marginLeft: "0.26em", display: "inline-flex", alignItems: "center" }}>
                  <svg width="17" height="17" viewBox="0 0 17 17">
                    <polyline points="5,12 12,12 12,5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
