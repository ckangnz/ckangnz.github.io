import { CSSProperties, useEffect, useRef } from "react";
import { clips, growth } from "../data/resume";
import { useInView } from "../hooks/useInView";
import SceneHeader from "./SceneHeader";

const roles = clips.filter((c) => c.track === "eng").sort((a, b) => b.start - a.start);

const openRole = (id: string) => {
  const details = document.querySelector<HTMLDetailsElement>(`#role-${id} details`);
  if (!details) return;
  details.open = true;
  details.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Experience = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const stairsRef = useRef<HTMLOListElement>(null);
  const stairsInView = useInView(stairsRef, { threshold: 0.3 });

  useEffect(() => {
    const openAll = () =>
      listRef.current?.querySelectorAll("details").forEach((d) => (d.open = true));
    window.addEventListener("beforeprint", openAll);
    return () => window.removeEventListener("beforeprint", openAll);
  }, []);

  return (
    <section id="experience" className="scene">
      <SceneHeader
        scene="02"
        kicker="Experience · 2017 → now"
        title="Nine years, growing in scope."
      />
      <p className="scene-intro">
        Each role has widened who my work is for: one client site, then a product,
        then bank customers, then a full page rebuild, then platforms other teams
        build on, and now a design system used by every Atlassian product.
      </p>

      <ol
        ref={stairsRef}
        className={`stairs ${stairsInView ? "is-visible" : ""}`}
        aria-label="Scope of my work over time"
      >
        {growth.map((step, index) => (
          <li
            key={step.id}
            style={
              {
                "--step": index,
                "--height": `${((index + 1) / growth.length) * 100}%`,
              } as CSSProperties
            }
          >
            <button type="button" className="stair" onClick={() => openRole(step.id)}>
              <span className="stair-scope">{step.scope}</span>
              <span className="stair-detail">{step.detail}</span>
              <span className="stair-bar" aria-hidden="true" />
              <span className="stair-meta">
                <strong>{step.year}</strong> {step.org}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <ol ref={listRef} className="roles">
        {roles.map((role) => (
          <li key={role.id} id={`role-${role.id}`} className="role">
            <details open={role.id === "atlassian" || role.id === "xero-senior"}>
              <summary>
                <span className="role-period">{role.period}</span>
                <span className="role-title">
                  {role.title} <span className="at">·</span> {role.org}
                </span>
                <svg className="role-toggle" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="role-body">
                <p>{role.summary}</p>
                {role.points && (
                  <ul>
                    {role.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                {role.tags && (
                  <ul className="tags">
                    {role.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
