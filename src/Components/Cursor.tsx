import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Cursor.css";

// Helper: checks if an element or its ancestors is a special tile
function isSpecialTile(el: Element | null): boolean {
  return !!el && !!el.closest(".certificate-tile, .project-tile");
}

// Helper: checks if an element or its ancestors is clickable
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

  // Should show custom cursor (not on touch devices)
  const [shouldShow, setShouldShow] = useState(false);
  // Show the "View →" label
  const [showView, setShowView] = useState(false);
  // Hide custom cursor when mouse leaves window
  const [isCursorVisible, setIsCursorVisible] = useState(false); // Start invisible

  // Mouse/ring positions
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number | null>(null);
  const hasMoved = useRef(false); // Track if mouse has moved

  // Detect touch device and set shouldShow
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0);

    setShouldShow(!isTouch);

    const handleTouch = () => setShouldShow(false);
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  // Mousemove: update mouse position, set "View" and hover
  const handleMove = useCallback((e: MouseEvent) => {
    // Update mouse position
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;

    // Initialize ring position on first move
    if (!hasMoved.current) {
      ring.current.x = e.clientX;
      ring.current.y = e.clientY;
      hasMoved.current = true;
      setIsCursorVisible(true); // Show cursor on first move
    }

    // Update view and hover states
    const el = document.elementFromPoint(e.clientX, e.clientY);
    setShowView(isSpecialTile(el));

    if (ringRef.current) {
      if (isClickable(el)) {
        ringRef.current.classList.add("cursor-hover");
      } else {
        ringRef.current.classList.remove("cursor-hover");
      }
    }

    // Debugging: Uncomment to check positions
    // console.log("Mouse:", mouse.current.x, mouse.current.y);
    // console.log("Ring:", ring.current.x, ring.current.y);
  }, []);

  useEffect(() => {
    if (!shouldShow) return () => {};
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldShow, handleMove]);

  // Animate the trailing ring, dot, and label
  useEffect(() => {
    if (!shouldShow || !hasMoved.current) return () => {};

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      if (!ringRef.current || !dotRef.current || !viewRef.current) return;

      if (isCursorVisible) {
        // Update ring position with lerp
        ring.current.x = lerp(ring.current.x, mouse.current.x, 0.2);
        ring.current.y = lerp(ring.current.y, mouse.current.y, 0.2);

        // Update dot position (instant)
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0)`;
        dotRef.current.style.opacity = "1";

        // Update ring position
        ringRef.current.style.transform = `translate3d(${ring.current.x - 22}px, ${ring.current.y - 22}px, 0)`;
        ringRef.current.style.opacity = showView ? "0" : "1";

        // Update view label position
        viewRef.current.style.transform = `translate3d(${ring.current.x - 48}px, ${ring.current.y - 24}px, 0)`;
        viewRef.current.style.opacity = showView ? "1" : "0";
      } else {
        // Hide all elements when cursor is not visible
        dotRef.current.style.opacity = "0";
        ringRef.current.style.opacity = "0";
        viewRef.current.style.opacity = "0";
      }

      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      animFrame.current = null;
    };
  }, [shouldShow, showView, isCursorVisible]);

  // Hide browser cursor when custom cursor is active
  useEffect(() => {
    if (shouldShow && isCursorVisible) {
      document.body.setAttribute("data-custom-cursor", "yes");
    } else {
      document.body.removeAttribute("data-custom-cursor");
    }
    return () => document.body.removeAttribute("data-custom-cursor");
  }, [shouldShow, isCursorVisible]);

  // Handle mouse leave/enter
  useEffect(() => {
    if (!shouldShow) return () => {};

    const handleMouseLeave = () => {
      setIsCursorVisible(false);
      // Debugging: Uncomment to verify
      // console.log("Mouse left");
    };

    const handleMouseEnter = () => {
      setIsCursorVisible(true);
      if (hasMoved.current) {
        ring.current.x = mouse.current.x;
        ring.current.y = mouse.current.y;
      }
      // Debugging: Uncomment to verify
      // console.log("Mouse entered");
    };

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
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={viewRef} className="custom-cursor-view">
        <span>View</span>
        <span>→</span>
      </div>
    </>
  );
};

export default Cursor;
