import { clips, languages, skills } from "../data/resume";
import Reveal from "./Reveal";
import SceneHeader from "./SceneHeader";

const education = clips.filter((c) => c.track === "learn" && c.id !== "talk").sort((a, b) => b.start - a.start);

const Skills = () => (
  <section id="skills" className="scene">
    <SceneHeader scene="07" kicker="Toolkit" title="Skills & education." />
    <div className="skills-grid">
      <Reveal className="skills-main">
        <h3 className="fullcut-heading">Skills</h3>
        <div className="skill-groups">
          {skills.map((group) => (
            <div key={group.group} className="skill-group">
              <h4>{group.group}</h4>
              <ul className="tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={80} className="skills-side">
        <h3 className="fullcut-heading">Education</h3>
        <ul className="plain-list">
          {education.map((e) => (
            <li key={e.id}>
              <strong>{e.org}</strong>
              <span>{e.title}</span>
              <span className="muted">{e.period}</span>
            </li>
          ))}
        </ul>
        <h3 className="fullcut-heading">Languages</h3>
        <ul className="plain-list plain-list-inline">
          {languages.map((l) => (
            <li key={l.name}>
              <strong>{l.name}</strong>
              <span className="muted">{l.level}</span>
            </li>
          ))}
        </ul>
        <h3 className="fullcut-heading">Awards</h3>
        <p>Art and Design Scholarship, AUT, 2013</p>
      </Reveal>
    </div>
  </section>
);

export default Skills;
