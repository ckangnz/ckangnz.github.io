export type Bezier = [number, number, number, number];

const sample = (a: number, b: number, s: number) =>
  3 * a * s * (1 - s) ** 2 + 3 * b * s ** 2 * (1 - s) + s ** 3;

export const ease = ([x1, y1, x2, y2]: Bezier, t: number) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  let low = 0;
  let high = 1;
  let s = t;
  for (let i = 0; i < 24; i++) {
    const x = sample(x1, x2, s);
    if (Math.abs(x - t) < 1e-5) break;
    if (x < t) low = s;
    else high = s;
    s = (low + high) / 2;
  }
  return sample(y1, y2, s);
};

export const ADS_PRACTICAL_OUT: Bezier = [0.4, 1, 0.6, 1];
