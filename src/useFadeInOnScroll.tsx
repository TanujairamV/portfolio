import { useEffect, useRef } from "react";

// This hook adds the 'visible' class to the ref's element when it enters the viewport
export function useFadeInOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    function handle(entries: IntersectionObserverEntry[]) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }

    const observer = new window.IntersectionObserver(handle, { threshold: 0.13 });
    observer.observe(node);

    // Clean up
    return () => observer.disconnect();
  }, []);

  return ref;
}
