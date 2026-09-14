/* Hearthline depth motion: pointer tilt is bounded, transform-only, and optional so the interface stays calm and accessible. */
import { useRef } from "react";

export function usePointerTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const handlePointerMove = (event: React.PointerEvent<T>) => {
    const element = ref.current;
    if (!element || event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    element.style.setProperty("--tilt-x", `${(x * 5).toFixed(2)}deg`);
    element.style.setProperty("--tilt-y", `${(y * -5).toFixed(2)}deg`);
    element.style.setProperty("--depth-x", `${(x * 8).toFixed(2)}px`);
    element.style.setProperty("--depth-y", `${(y * 8).toFixed(2)}px`);
  };
  const handlePointerLeave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
    element.style.setProperty("--depth-x", "0px");
    element.style.setProperty("--depth-y", "0px");
  };
  return { ref, onPointerMove: handlePointerMove, onPointerLeave: handlePointerLeave };
}
