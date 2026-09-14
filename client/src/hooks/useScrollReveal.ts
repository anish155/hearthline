/* Reference-inspired motion: sections reveal as they enter the viewport, turning the page into a paced visual story instead of one simultaneous load-in. */
import { useEffect } from "react";

export function useScrollReveal(routeKey?: string) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [routeKey]);
}
