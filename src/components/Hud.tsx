import { useEffect, useState } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";
import CkMark from "./CkMark";

export type Scene = { id: string; label: string };

const FPS = 24;
const RUNTIME_SECONDS = 180;

const pad = (n: number) => String(n).padStart(2, "0");

export const formatTimecode = (seconds: number) => {
  const totalFrames = Math.round(seconds * FPS);
  const frames = totalFrames % FPS;
  const totalSeconds = Math.floor(totalFrames / FPS);
  return `${pad(Math.floor(totalSeconds / 3600))}:${pad(
    Math.floor(totalSeconds / 60) % 60,
  )}:${pad(totalSeconds % 60)}:${pad(frames)}`;
};

const Hud = ({ scenes }: { scenes: Scene[] }) => {
  const progress = useScrollProgress();
  const [active, setActive] = useState(scenes[0]?.id);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    scenes.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [scenes]);

  return (
    <nav className="hud dark" aria-label="Sections">
      <a className="hud-brand" href="#title" aria-label="Chris Kang, back to top">
        <CkMark className="hud-mark" />
        <span className="rec" aria-hidden="true" />
        <span className="hud-brand-dim">Chris Kang</span>
      </a>
      <ol className="hud-scenes">
        {scenes.map((scene, index) => (
          <li key={scene.id}>
            <a
              href={`#${scene.id}`}
              className={active === scene.id ? "is-active" : ""}
              aria-current={active === scene.id ? "true" : undefined}
            >
              <span className="hud-scene-num">{pad(index + 1)}</span>
              <span className="hud-scene-label">{scene.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <span className="hud-timecode" aria-hidden="true">
        TC {formatTimecode(progress * RUNTIME_SECONDS)}
      </span>
      <span
        className="hud-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </nav>
  );
};

export default Hud;
