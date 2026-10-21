import { credits } from "../data/resume";
import Reveal from "./Reveal";
import SceneHeader from "./SceneHeader";

const Credits = () => (
  <section id="credits" className="scene dark">
    <SceneHeader
      scene="05"
      kicker="Wētā FX · 2015"
      title="Film credits."
    />
    <p className="scene-intro">
      As a motion capture tracker at Wētā FX, I tracked body capture in Giant and
      facial capture in Famfit, both Wētā in-house tools, so animators had clean
      data to build performances from.
    </p>
    <ul className="posters">
      {credits.weta.map((film, index) => (
        <li key={film.title}>
          <Reveal delay={index * 70}>
            <a className="poster" href={film.url} target="_blank" rel="noreferrer">
              <span className="poster-frame">
                <img src={film.poster} alt={`${film.title} poster`} loading="lazy" />
              </span>
              <span className="poster-title">{film.title}</span>
              <span className="poster-year">{film.year}</span>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
    <div className="credits-extra">
      <div>
        <h3 className="credits-heading">AUT Motion Capture Lab · 2014–2015</h3>
        <ul className="credits-studio">
          {credits.studio.map((work) => (
            <li key={work.title}>
              {work.title} <span className="muted">· {work.studio}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="credits-heading">Tools</h3>
        <p className="credits-tools">Giant · Famfit · MotionBuilder · CaraPost · Maya</p>
      </div>
    </div>
    <p className="poster-attribution">Posters via TMDB.</p>
  </section>
);

export default Credits;
