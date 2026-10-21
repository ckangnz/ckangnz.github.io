import { contact } from "../data/resume";
import Icon from "./Icon";

const Contact = () => (
  <section id="contact" className="scene scene-contact dark">
    <p className="kicker">Scene 08 · End credits</p>
    <h2 className="wrap-title">That's a wrap.</h2>
    <p className="scene-intro">
      Always happy to talk about design systems, frontend platforms, developer
      experience, or AI agents that actually ship.
    </p>
    <div className="contact-links">
      <a className="button button-primary" href={`mailto:${contact.email}`}>
        <Icon name="mail" />
        {contact.email}
      </a>
      <a className="button" href={contact.linkedin}>
        <Icon name="linkedin" />
        LinkedIn
        <Icon name="external" className="icon-small" />
      </a>
      <a className="button" href={contact.github}>
        <Icon name="github" />
        GitHub
        <Icon name="external" className="icon-small" />
      </a>
      <button type="button" className="button" onClick={() => window.print()}>
        <Icon name="printer" />
        Print / save as PDF
      </button>
    </div>
    <p className="wordmark" aria-hidden="true">
      <span>CHRIS</span>
      <span>KANG</span>
    </p>
    <footer className="footer">
      <span>© {new Date().getFullYear()} Chris Kang · References available on request</span>
      <span>Hand-built in React. No animation libraries.</span>
    </footer>
  </section>
);

export default Contact;
