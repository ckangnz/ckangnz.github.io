import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Marker = { x: number; y: number; ox: number; oy: number; vx: number; vy: number };

const SPACING = 34;
const RADIUS = 140;
const STIFFNESS = 0.06;
const DAMPING = 0.82;

const MarkerField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext?.("2d");
    if (!canvas || !context) return;

    let markers: Marker[] = [];
    let frame = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const layout = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      markers = [];
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          markers.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      markers.forEach((m) => {
        const dx = m.x - pointer.x;
        const dy = m.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (!reduced && distance < RADIUS && distance > 0) {
          const force = (1 - distance / RADIUS) * 6;
          m.vx += (dx / distance) * force;
          m.vy += (dy / distance) * force;
        }
        m.vx = (m.vx + (m.ox - m.x) * STIFFNESS) * DAMPING;
        m.vy = (m.vy + (m.oy - m.y) * STIFFNESS) * DAMPING;
        m.x += m.vx;
        m.y += m.vy;
        const energy = Math.min(1, Math.hypot(m.x - m.ox, m.y - m.oy) / 30);
        context.fillStyle =
          energy > 0.05
            ? `rgba(228, 54, 27, ${0.3 + energy * 0.7})`
            : "rgba(45, 45, 45, 0.16)";
        context.beginPath();
        context.arc(m.x, m.y, 1.4 + energy * 1.8, 0, Math.PI * 2);
        context.fill();
      });
    };

    const loop = () => {
      draw();
      frame = visible && !reduced ? requestAnimationFrame(loop) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onResize = () => {
      layout();
      draw();
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !frame && !reduced) frame = requestAnimationFrame(loop);
          })
        : null;

    layout();
    loop();
    observer?.observe(canvas);
    const target = canvas.parentElement ?? canvas;
    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      target.removeEventListener("pointermove", onPointerMove);
      target.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="marker-field" aria-hidden="true" />;
};

export default MarkerField;
