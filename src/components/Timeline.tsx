import { KeyboardEvent, PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Clip,
  NOW,
  TIMELINE_END,
  TIMELINE_START,
  TrackId,
  clips,
  journey,
  tracks,
} from "../data/resume";
import { useReducedMotion } from "../hooks/useReducedMotion";
import SceneHeader from "./SceneHeader";

const SPAN = TIMELINE_END - TIMELINE_START;
const PLAY_DURATION_MS = 16000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TRACK_PRIORITY: TrackId[] = ["eng", "vfx", "motion", "learn"];

const SCALE: [number, number][] = [
  [TIMELINE_START, 0],
  [2011.25, 8],
  [2012, 10],
  [2013.75, 17],
  [2017.5, 52],
  [TIMELINE_END, 100],
];

const interpolate = (value: number, from: 0 | 1) => {
  const to = from === 0 ? 1 : 0;
  const upper = SCALE.findIndex((stop) => stop[from] >= value);
  if (upper === 0) return SCALE[0][to];
  if (upper === -1) return SCALE[SCALE.length - 1][to];
  const a = SCALE[upper - 1];
  const b = SCALE[upper];
  return a[to] + ((value - a[from]) / (b[from] - a[from])) * (b[to] - a[to]);
};

const toPercent = (year: number) => interpolate(year, 0);
const fromPercent = (percent: number) => interpolate(percent, 1);

const clamp = (value: number) => Math.min(NOW, Math.max(TIMELINE_START, value));

const formatDate = (year: number) => {
  const whole = Math.floor(year);
  const monthIndex = Math.min(11, Math.floor((year - whole) * 12));
  return `${MONTHS[monthIndex]} ${whole}`;
};

const assignLanes = (trackClips: Clip[]) => {
  const laneEnds: number[] = [];
  const lanes = new Map<string, number>();
  [...trackClips]
    .sort((a, b) => a.start - b.start)
    .forEach((clip) => {
      let lane = laneEnds.findIndex((end) => end <= clip.start);
      if (lane === -1) lane = laneEnds.length;
      laneEnds[lane] = clip.end;
      lanes.set(clip.id, lane);
    });
  return { lanes, count: Math.max(1, laneEnds.length) };
};

const isUnder = (clip: Clip, time: number) =>
  time >= clip.start && (time < clip.end || (clip.end === NOW && time <= NOW));

const clipAt = (time: number) => {
  for (const track of TRACK_PRIORITY) {
    const found = clips.find((c) => c.track === track && isUnder(c, time));
    if (found) return found;
  }
  return undefined;
};

const years = Array.from({ length: SPAN + 1 }, (_, i) => TIMELINE_START + i);
const quarters = Array.from({ length: SPAN * 4 }, (_, i) => TIMELINE_START + i / 4).filter(
  (q) => q % 1 !== 0,
);
const showYearLabel = (year: number) =>
  year < TIMELINE_END && (toPercent(year + 1) - toPercent(year) >= 4 || year % 2 === 1);

const Timeline = () => {
  const [time, setTime] = useState(2015.4);
  const [selectedId, setSelectedId] = useState("weta");
  const [playing, setPlaying] = useState(false);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const reduced = useReducedMotion();

  const layout = useMemo(
    () =>
      tracks.map((track) => {
        const trackClips = clips.filter((c) => c.track === track.id);
        return { ...track, clips: trackClips, ...assignLanes(trackClips) };
      }),
    [],
  );

  const selected = clips.find((c) => c.id === selectedId) ?? clips[0];

  const scrubTo = (next: number) => {
    const clamped = clamp(next);
    setTime(clamped);
    const under = clipAt(clamped);
    if (under) setSelectedId(under.id);
  };

  useEffect(() => {
    if (!playing) return;
    if (reduced) {
      scrubTo(NOW);
      setPlaying(false);
      return;
    }
    const from = toPercent(time >= NOW - 0.05 ? TIMELINE_START : time);
    const to = toPercent(NOW);
    const startedAt = performance.now();
    const duration = ((to - from) / to) * PLAY_DURATION_MS;
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - startedAt) / duration);
      scrubTo(fromPercent(from + (to - from) * t));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setPlaying(false);
    });
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, reduced]);

  const timeFromPointer = (clientX: number) => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return time;
    return fromPercent(((clientX - rect.left) / rect.width) * 100);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".clip")) return;
    draggingRef.current = true;
    setPlaying(false);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    scrubTo(timeFromPointer(event.clientX));
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) scrubTo(timeFromPointer(event.clientX));
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onPlayheadKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 1 : 1 / 12;
    const moves: Record<string, number> = {
      ArrowRight: time + step,
      ArrowLeft: time - step,
      Home: TIMELINE_START,
      End: NOW,
    };
    if (event.key in moves) {
      event.preventDefault();
      setPlaying(false);
      scrubTo(moves[event.key]);
    }
  };

  const selectClip = (clip: Clip) => {
    setPlaying(false);
    setSelectedId(clip.id);
    setTime(clamp(clip.start + 0.001));
  };

  return (
    <section id="journey" className="scene dark">
      <SceneHeader
        scene="04"
        kicker="The journey · 2009 → now"
        title="From frames to code."
      />
      <ol className="chapters">
        {journey.map((chapter, index) => (
          <li key={chapter.title} className="chapter">
            <span className="chapter-num">0{index + 1}</span>
            <span className="chapter-years">{chapter.years}</span>
            <h3>{chapter.title}</h3>
            <p>{chapter.body}</p>
          </li>
        ))}
      </ol>
      <p className="scene-intro journey-hint">
        Scrub through the whole edit. Drag the playhead, press play, or click any
        clip.
      </p>

      <div className="nle">
        <div className="nle-toolbar">
          <button
            type="button"
            className="nle-play"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
          >
            {playing ? "❚❚ Pause" : "▶ Play"}
          </button>
          <span className="nle-readout" aria-live="polite">
            {formatDate(time)}
          </span>
          <span className="nle-hint">← → to scrub · shift for years</span>
        </div>

        <div className="nle-scroll">
          <div className="nle-grid">
            <div className="nle-labels" aria-hidden="true">
              <div className="nle-label nle-label-ruler" />
              {layout.map((track) => (
                <div
                  key={track.id}
                  className="nle-label"
                  style={{ height: `${track.count * 44 + 12}px` }}
                >
                  <span className="nle-label-code">{track.code}</span>
                  {track.label}
                </div>
              ))}
            </div>

            <div
              ref={surfaceRef}
              className="nle-surface"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div className="nle-gridlines" aria-hidden="true">
                {years.map((year) => (
                  <span key={year} style={{ left: `${toPercent(year)}%` }} />
                ))}
              </div>
              <div className="nle-ruler" aria-hidden="true">
                {years.map((year) => (
                  <span
                    key={year}
                    className="nle-tick"
                    style={{ left: `${toPercent(year)}%` }}
                  >
                    {showYearLabel(year) ? `'${String(year).slice(2)}` : ""}
                  </span>
                ))}
                {quarters.map((quarter) => (
                  <span
                    key={quarter}
                    className="nle-tick-minor"
                    style={{ left: `${toPercent(quarter)}%` }}
                  />
                ))}
              </div>

              {layout.map((track) => (
                <div
                  key={track.id}
                  className={`nle-track nle-track-${track.id}`}
                  style={{ height: `${track.count * 44 + 12}px` }}
                  role="group"
                  aria-label={`${track.label} track`}
                >
                  {track.clips.map((clip) => {
                    const lane = track.lanes.get(clip.id) ?? 0;
                    const active = isUnder(clip, time);
                    return (
                      <button
                        type="button"
                        key={clip.id}
                        className={`clip ${clip.id === selectedId ? "is-selected" : ""} ${
                          active ? "is-active" : ""
                        }`}
                        style={{
                          left: `${toPercent(clip.start)}%`,
                          width: `${toPercent(clip.end) - toPercent(clip.start)}%`,
                          top: `${6 + lane * 44}px`,
                        }}
                        onClick={() => selectClip(clip)}
                        aria-pressed={clip.id === selectedId}
                        aria-label={`${clip.title}, ${clip.org}, ${clip.period}`}
                      >
                        <span className="clip-org">{clip.org}</span>
                        <span className="clip-title">{clip.title}</span>
                      </button>
                    );
                  })}
                </div>
              ))}

              <div
                className="playhead"
                style={{ left: `${toPercent(time)}%` }}
                role="slider"
                tabIndex={0}
                aria-label="Timeline playhead"
                aria-valuemin={TIMELINE_START}
                aria-valuemax={Math.round(NOW)}
                aria-valuenow={Math.round(time * 100) / 100}
                aria-valuetext={formatDate(time)}
                onKeyDown={onPlayheadKey}
              >
                <span className="playhead-handle">{formatDate(time)}</span>
              </div>
            </div>
          </div>
        </div>

        <article className="clip-detail" key={selected.id} aria-live="polite">
          <div className="clip-detail-meta">
            <span className={`clip-detail-track nle-track-${selected.track}`}>
              {tracks.find((t) => t.id === selected.track)?.label}
            </span>
            <span>{selected.period}</span>
            {selected.location && <span>{selected.location}</span>}
          </div>
          <h3>
            {selected.title} <span className="at">at</span> {selected.org}
          </h3>
          <p>{selected.summary}</p>
          {selected.points && (
            <ul>
              {selected.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
          {selected.tags && (
            <ul className="tags" aria-label="Tools">
              {selected.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </article>
      </div>

      <div className="print-only">
        <h3 className="fullcut-heading">Before engineering</h3>
        <ul className="plain-list">
          {clips
            .filter((c) => c.track === "motion" || c.track === "vfx")
            .sort((a, b) => b.start - a.start)
            .map((c) => (
              <li key={c.id}>
                <strong>
                  {c.title} · {c.org}
                </strong>
                <span className="muted">{c.period}</span>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Timeline;
