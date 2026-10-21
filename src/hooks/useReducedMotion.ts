import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const getMatch = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(QUERY).matches
    : false;

export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(getMatch);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(QUERY);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
};
