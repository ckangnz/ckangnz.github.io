import { contact } from "../data/resume";
import CkMark from "./CkMark";
import MarkerField from "./MarkerField";

const NAME = ["Chris", "Kang"];

const Hero = () => (
  <section id="title" className="hero">
    <aside className="hero-side dark">
      <CkMark className="hero-mark" title="CK" />
      <div className="hero-side-block">
        <p>Software Engineer @ Atlassian</p>
        <p>Auckland, NZ</p>
        <p>NZ Citizen</p>
      </div>
      <div className="hero-side-block">
        <h2 className="hero-side-heading">Get in touch</h2>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={contact.linkedin}>linkedin.com/in/chrissmkang</a>
        <a href={contact.github}>github.com/ckangnz</a>
      </div>
    </aside>
    <div className="hero-stage">
      <MarkerField />
      <div className="letterbox letterbox-top" aria-hidden="true" />
      <div className="letterbox letterbox-bottom" aria-hidden="true" />
      <div className="hero-inner">
        <h1 className="hero-name" aria-label={NAME.join(" ")}>
          {NAME.map((word, wordIndex) => (
            <span className="hero-word" key={word} aria-hidden="true">
              {word.split("").map((letter, letterIndex) => (
                <span
                  className="hero-letter"
                  key={letterIndex}
                  style={{ animationDelay: `${300 + (wordIndex * 5 + letterIndex) * 55}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="hero-kicker">Software Engineer</p>
        <p className="hero-lede">
          Frontend-focused fullstack engineer with <strong>9+ years</strong> of
          building design systems, frontend platforms and product UI at{" "}
          <strong>Atlassian</strong>, <strong>Xero</strong> and{" "}
          <strong>ASB</strong>. Before code I made films and tracked motion capture
          at Wētā FX, and that eye for craft still shapes how I build.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#experience">
            View experience
          </a>
          <a className="button" href="#journey">
            ▶ My journey
          </a>
        </div>
      </div>
      <p className="hero-hint" aria-hidden="true">
        Move your cursor. These are mocap markers.
      </p>
    </div>
  </section>
);

export default Hero;
