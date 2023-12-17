/**
 * The golden ratio.
 * @see {@link https://en.wikipedia.org/wiki/Golden_ratio}
 * @group Graphics
 */
export const GOLDEN_RATIO = 1.618033988749;

/**
 * Constrains a color component value to single-byte range (`0`-`255`).
 * @param c - A color component value.
 * @returns The input value constrained into single-byte range.
 * @group Graphics
 */
export const safeRGBComponent = (c: number) => {
  if (c < 0) {
    c = 0;
  }
  if (255 < c) {
    c = 255;
  }
  return Math.trunc(c);
};

/**
 * Constructs a 32bit integer value that represents an RGBA color value.
 * @param r - The R component.
 * @param g - The G component.
 * @param b - The B component.
 * @param a - The A component.
 * @returns The constructed color value.
 * @group Graphics
 */
export const fromRGBA = (r: number, g: number, b: number, a: number) => {
  r = safeRGBComponent(r);
  g = safeRGBComponent(g);
  b = safeRGBComponent(b);
  a = safeRGBComponent(a);

  return (r << 24) | (g << 16) | (b << 8) | a;
};

/**
 * Constructs a 32bit integer value that represents an RGBA color value.
 * The A component is fixed to `255`
 * @param r - The R component.
 * @param g - The G component.
 * @param b - The B component.
 * @returns The constructed color value.
 * @group Graphics
 */
export const fromRGB = (r: number, g: number, b: number) => {
  return fromRGBA(r, g, b, 255);
};

/**
 * Extracts the R component from a color value.
 * @param color - The color value.
 * @returns The R component of the color value.
 * @group Graphics
 */
export const getR = (color: number) => {
  return (color >> 24) & 0xff;
};

/**
 * Extracts the G component from a color value.
 * @param color - The color value.
 * @returns The G component of the color value.
 * @group Graphics
 */
export const getG = (color: number) => {
  return (color >> 16) & 0xff;
};

/**
 * Extracts the B component from a color value.
 * @param color - The color value.
 * @returns The B component of the color value.
 * @group Graphics
 */
export const getB = (color: number) => {
  return (color >> 8) & 0xff;
};

/**
 * Extracts the A component from a color value.
 * @param color - The color value.
 * @returns The A component of the color value.
 * @group Graphics
 */
export const getA = (color: number) => {
  return color & 0xff;
};

/**
 * Returns a new color that is a blend between a source and a destination
 * color linerally. The alpha component in these colors is ignored. Instead, the provided
 * `alpha` value is used to blend between the two colors.
 * @param src - The source color.
 * @param dst - The destination color.
 * @param alpha - The alpha value to use for blending.
 * @returns The blended color.
 * @group Graphics
 */
export const blend = (src: number, dst: number, alpha: number) => {
  if (alpha >= 255) {
    return dst;
  }
  if (alpha <= 0) {
    return src;
  }
  src |= 0;
  dst |= 0;

  return fromRGB(
    (alpha * getR(dst) + (255 - alpha) * getR(src)) >> 8,
    (alpha * getG(dst) + (255 - alpha) * getG(src)) >> 8,
    (alpha * getB(dst) + (255 - alpha) * getB(src)) >> 8,
  );
};

/**
 * Returns a new color that is a blend between a source and a destination
 * color additively. The alpha component in these colors is ignored. Instead, the provided
 * `alpha` value is used to blend between the two colors.
 * @param src - The source color.
 * @param dst - The destination color.
 * @param alpha - The alpha value to use for blending.
 * @returns The blended color.
 * @group Graphics
 */
export const blendAdditive = (src: number, dst: number, alpha: number) => {
  if (alpha >= 255) {
    return dst;
  }
  if (alpha <= 0) {
    return src;
  }

  return fromRGB(
    ((alpha * getR(dst)) >> 8) + getR(src),
    ((alpha * getG(dst)) >> 8) + getG(src),
    ((alpha * getB(dst)) >> 8) + getB(src),
  );
};

/**
 * Returns a new color that is a blend between a source and a destination
 * color subtractively. The alpha component in these colors is ignored. Instead, the provided
 * `alpha` value is used to blend between the two colors.
 * @param src - The source color.
 * @param dst - The destination color.
 * @param alpha - The alpha value to use for blending.
 * @returns The blended color.
 * @group Graphics
 */
export const blendSubtractive = (src: number, dst: number, alpha: number) => {
  if (alpha >= 255) {
    return dst;
  }
  if (alpha <= 0) {
    return src;
  }

  const r = getR(src) - ((alpha * getR(dst)) >> 8);
  const g = getG(src) - ((alpha * getG(dst)) >> 8);
  const b = getB(src) - ((alpha * getB(dst)) >> 8);
  return fromRGB(r < 0 ? 0 : r, g < 0 ? 0 : g, b < 0 ? 0 : b);
};

/**
 * Converts a color value to grayscale.
 * @param color - The color to convert.
 * @returns The grayscale value appropriate for the color.
 * @group Graphics
 */
export const toGrayScale = (color: number) => {
  const gs = getR(color) * 0.3 + getG(color) * 0.59 + getB(color) * 0.11;
  return fromRGBA(gs, gs, gs, getA(color));
};
