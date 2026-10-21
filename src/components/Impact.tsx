import { useEffect, useRef, useState } from "react";
import { Stat, stats } from "../data/resume";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ADS_PRACTICAL_OUT, ease } from "../lib/bezier";
import SceneHeader from "./SceneHeader";

const COUNT_MS = 1400;

const Counter = ({ stat, run }: { stat: Stat; run: boolean }) => {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setValue(stat.value);
      return;
    }
    const startedAt = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - startedAt) / COUNT_MS);
      setValue(Math.round(stat.value * ease(ADS_PRACTICAL_OUT, t)));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [run, reduced, stat.value]);

  return (
    <span className="stat-value">
      <span className="stat-animated" aria-hidden="true">
        {value.toLocaleString("en-NZ")}
      </span>
      <span className="stat-final">{stat.value.toLocaleString("en-NZ")}</span>
      <span className="stat-suffix">{stat.suffix}</span>
    </span>
  );
};

const Impact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });

  return (
    <section id="highlights" className="scene">
      <SceneHeader
        scene="03"
        kicker="Highlights"
        title="Impact across my career."
      />
      <div ref={ref} className="stats">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`stat reveal ${inView ? "is-visible" : ""}`}
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <span className="stat-org">{stat.org}</span>
            <Counter stat={stat} run={inView} />
            <span className="stat-label">{stat.label}</span>
            <span className="stat-detail">{stat.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Impact;
