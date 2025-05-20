import React, { useEffect, useRef, useState } from "react";

// Helper: checks if an element or ancestor is a "special tile"
function isSpecialTile(el: Element | null): boolean {
  return !!el && !!el.closest(".certificate-tile, .project-tile");
}

// Helper: checks if an element or ancestor is clickable
function isClickable(el: Element | null): boolean {
  if (!el) return false;
  const clickableTags = ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "SUMMARY", "LABEL"];
  let curr: Element | null = el;
  while (curr) {
    if (clickableTags.includes(curr.tagName)) return true;
    if (curr.getAttribute("tabindex") && curr.getAttribute("tabindex") !== "-1") return true;
    if ((curr as HTMLElement).onclick || (curr as HTMLElement).onmousedown) return true;
    if (curr.classList.contains("cursor-pointer")) return true;
    if (curr.classList.contains("certificate-tile") || curr.classList.contains("project-tile")) return true;
    if (curr.closest("a,button,[role=button],.cursor-pointer")) return true;
    curr = curr.parentElement;
  }
  return false;
}

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  const [shouldShow, setShouldShow] = useState(false);
  const [showView, setShowView] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  // These are kept outside state for performance
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number>();

  // Only run on client, and disable on touch devices
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0;

    if (isTouch) {
      setShouldShow(false);
    } else {
      setShouldShow(true);
    }

    const handleTouch = () => setShouldShow(false);
    const handleMouse = () => setShouldShow(true);

    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  // Animation for trailing ring and label
  useEffect(() => {
    if (!shouldShow) return () => {};
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.2);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.2);

      if (ringRef.current && !showView) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 22}px, ${ring.current.y - 22}px, 0)`;
        ringRef.current.style.opacity = isCursorVisible ? "1" : "0";
      }
      if (viewRef.current && showView) {
        viewRef.current.style.transform = `translate3d(${ring.current.x - 48}px, ${ring.current.y - 24}px, 0)`;
        viewRef.current.style.opacity = isCursorVisible ? "1" : "0";
      }
      if (ringRef.current) ringRef.current.style.opacity = showView || !isCursorVisible ? "0" : "1";
      if (viewRef.current) viewRef.current.style.opacity = showView && isCursorVisible ? "1" : "0";
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => animFrame.current && cancelAnimationFrame(animFrame.current);
  }, [shouldShow, showView, isCursorVisible]);

  // Mousemove: move dot, update mouse position, set "View" and hover
  useEffect(() => {
    if (!shouldShow) return () => {};

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
        dotRef.current.style.opacity = isCursorVisible ? "1" : "0";
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setShowView(isSpecialTile(el));
      if (ringRef.current) {
        if (isClickable(el)) {
          ringRef.current.classList.add("cursor-hover");
        } else {
          ringRef.current.classList.remove("cursor-hover");
        }
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldShow, isCursorVisible]);

  // Hide browser cursor globally, even on clickable elements
  useEffect(() => {
    if (shouldShow) {
      document.body.setAttribute("data-custom-cursor", "yes");
    } else {
      document.body.removeAttribute("data-custom-cursor");
    }
    return () => { document.body.removeAttribute("data-custom-cursor"); };
  }, [shouldShow]);

  // Hide cursor when mouse leaves window, show when enters
  useEffect(() => {
    if (!shouldShow) return () => {};
    const handleMouseLeave = () => setIsCursorVisible(false);
    const handleMouseEnter = () => setIsCursorVisible(true);

    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring pointer-events-none fixed z-[9999] left-0 top-0"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.20) 10%, rgba(190,190,200,0.16) 70%, rgba(100,100,120,0.10) 100%)",
          border: "2.5px solid rgba(220,220,255,0.31)",
          boxShadow: "0 2px 18px 0 rgba(120,130,155,0.13)",
          transition:
            "border-color 0.26s cubic-bezier(.33,1.02,.53,.98), background 0.24s cubic-bezier(.33,1.02,.53,.98), transform 0.16s cubic-bezier(.41,1.11,.59,.95), opacity 0.2s",
          willChange: "transform,opacity",
          pointerEvents: "none",
          mixBlendMode: "exclusion",
          opacity: 1,
          zIndex: 9999,
        }}
      />
      <div ref={dotRef} className="custom-cursor-dot pointer-events-none fixed z-[9999] left-0 top-0"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.93)",
          boxShadow: "0 1px 4px 0 rgba(130,140,230,0.07)",
          willChange: "transform",
          pointerEvents: "none",
          mixBlendMode: "exclusion",
        }}
      />
      <div ref={viewRef} className="custom-cursor-view pointer-events-none fixed z-[9999] left-0 top-0 flex items-center px-5 py-2 rounded-full"
        style={{
          fontFamily: "'Space Grotesk', 'Poppins', 'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "1.1rem",
          background: "linear-gradient(90deg, rgba(255,255,255,0.77) 70%, rgba(200,200,220,0.28) 100%)",
          color: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          boxShadow: "0 2px 16px 0 rgba(220,220,255,0.08)",
          border: "1.5px solid rgba(190,190,220,0.21)",
          whiteSpace: "nowrap",
          opacity: 0,
          zIndex: 9999,
          transition:
            "opacity 0.18s cubic-bezier(.44,1.11,.53,.91), background 0.22s cubic-bezier(.33,1.02,.53,.98)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <span
          style={{
            background:
              "linear-gradient(90deg, #fff 70%, #b0b0b0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          View
        </span>
        <span style={{
          marginLeft: 8,
          fontSize: "1.1em",
          display: "inline-block",
          transform: "translateY(2px)",
          fontWeight: 700,
        }}>→</span>
      </div>
      {/* Absolute cursor hiding for all elements, including clickables */}
      <style>{`
        [data-custom-cursor], [data-custom-cursor] * {
          cursor: none !important;
        }
        .custom-cursor-ring {
          transition: border-color 0.26s cubic-bezier(.33,1.02,.53,.98), background 0.24s cubic-bezier(.33,1.02,.53,.98), transform 0.16s cubic-bezier(.41,1.11,.59,.95), opacity 0.2s;
        }
        .custom-cursor-dot {
          transition: background 0.18s cubic-bezier(.44,1.11,.53,.91);
        }
        .custom-cursor-ring.cursor-hover {
          transform: scale(1.20) !important;
          border-color: rgba(200,210,255,0.59) !important;
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 10%, rgba(220,220,255,0.22) 80%, rgba(180,180,210,0.11) 100%) !important;
          box-shadow: 0 2px 20px 0 rgba(160,170,220,0.14);
        }
        .custom-cursor-view {
          transition: opacity 0.18s cubic-bezier(.44,1.11,.53,.91), background 0.22s cubic-bezier(.33,1.02,.53,.98);
          pointer-events: none;
          user-select: none;
        }
        @media (hover: none), (pointer: coarse) {
          .custom-cursor-dot, .custom-cursor-ring, .custom-cursor-view {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Cursor;
