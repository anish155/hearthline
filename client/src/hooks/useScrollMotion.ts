/* Quiet Luxury Editorial motion: scroll should feel like a camera move through a printed story, with restrained parallax and no layout-jank. */
import { useEffect } from "react";

export function useScrollMotion() {
  useEffect(() => {
    let frame = 0;
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      document.documentElement.style.setProperty("--hero-shift", `${Math.min(scrollY * 0.14, 90).toFixed(1)}px`);
      document.documentElement.style.setProperty("--header-shadow", `${Math.min(scrollY * 0.012, 0.18).toFixed(3)}`);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        frame = window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);
}
