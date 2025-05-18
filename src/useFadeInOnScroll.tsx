import { useEffect, useRef } from "react";

/**
 * React hook to add fade-in effect on scroll for any element.
 * Usage:
 *   const ref = useFadeInOnScroll();
 *   <div ref={ref} className="fade-in">...</div>
 */
export function useFadeInOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function handle(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add("visible");
        } else {
          node.classList.remove("visible");
        }
      });
    }

    const observer = new window.IntersectionObserver(handle, {
      threshold: 0.12,
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return ref;
}
