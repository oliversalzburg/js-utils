// https://stackoverflow.com/a/54024653
// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
export const hsv2rgb = (h: number, s: number, v: number) => {
  let f = (n: number, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
};

// https://stackoverflow.com/a/54070620
// input: r,g,b in [0,1], out: h in [0,360) and s,v in [0,1]
export const rgb2hsv = (r: number, g: number, b: number) => {
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b);
  let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
};

// https://stackoverflow.com/a/54014428
// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
export const hsl2rgb = (h: number, s: number, l: number) => {
  let a = s * Math.min(l, 1 - l);
  let f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
};

// https://stackoverflow.com/a/54071699
// in: r,g,b in [0,1], out: h in [0,360) and s,l in [0,1]
export const rgb2hsl = (r: number, g: number, b: number) => {
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b),
    f = 1 - Math.abs(v + v - c - 1);
  let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
  return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
};

export const hsl2hsv = (h: number, s: number, l: number, v = s * Math.min(l, 1 - l) + l) => [
  h,
  v ? 2 - (2 * l) / v : 0,
  v,
];

export const hsv2hsl = (
  h: number,
  s: number,
  v: number,
  l = v - (v * s) / 2,
  m = Math.min(l, 1 - l),
) => [h, m ? (v - l) / m : 0, l];
