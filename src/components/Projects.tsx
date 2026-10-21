import { CSSProperties, useState } from "react";
import { Project, projects } from "../data/resume";
import Reveal from "./Reveal";
import SceneHeader from "./SceneHeader";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [live, setLive] = useState(false);

  return (
    <Reveal delay={index * 100} className="project-wrap">
      <article
        className="project"
        style={{ "--accent": project.accent } as CSSProperties}
      >
        <div className="device">
          <div className="device-notch" aria-hidden="true" />
          {live ? (
            <iframe
              src={project.url}
              title={`${project.name} live preview`}
              loading="lazy"
            />
          ) : (
            <button
              type="button"
              className="device-poster"
              onClick={() => setLive(true)}
            >
              <span className="device-poster-name">{project.name}</span>
              <span className="device-poster-cta">▶ Load live preview</span>
            </button>
          )}
        </div>
        <div className="project-body">
          <p className="kicker">Side project · 0{index + 1}</p>
          <h3>{project.name}</h3>
          <p className="project-tagline">{project.tagline}</p>
          <p>{project.description}</p>
          <ul className="project-highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <ul className="tags" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="project-links">
            <a className="button button-primary" href={project.url}>
              Open app ↗
            </a>
            <a className="button" href={project.repo}>
              Source
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const Projects = () => (
  <section id="projects" className="scene">
    <SceneHeader
      scene="06"
      kicker="Side projects"
      title="Things I build after hours."
    />
    <p className="scene-intro">
      Products I design, build and ship on my own, start to finish. Both are live,
      so load one and try it.
    </p>
    <div className="projects">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  </section>
);

export default Projects;
