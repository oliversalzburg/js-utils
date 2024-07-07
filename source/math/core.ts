/**
 * `PI` times 2.
 */
export const TWO_PI = /* __PURE__ */ Math.PI * 2;

/**
 * Converts the degrees to radians.
 * @param degrees - The degrees to convert to radians.
 * @returns The degrees in radians.
 */
export const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

/**
 * Convertrs the radians to degrees.
 * @param radians - The radians to convert to degrees.
 * @returns The radians as degrees.
 */
export const radiansToDegrees = (radians: number) => {
  return radians * (180 / Math.PI);
};

/**
 * Calculates the sine for a given degree value.
 * @param value - The value in degrees to calculate the sine for.
 * @returns The sine for the given value.
 */
export const sinDegrees = (value: number) => {
  return Math.sin(degreesToRadians(value));
};

/**
 * Calculates the cosine for a given degree value.
 * @param value - The value in degrees to calculate the cosine for.
 * @returns The cosine for the given value.
 */
export const cosDegrees = (value: number) => {
  return Math.cos(degreesToRadians(value));
};

/**
 * Calculates the distance between two vectors.
 * @param x1 - The X component of the first vector.
 * @param y1 - The Y comoinent of the first vector.
 * @param x2 - The X component of the second vector.
 * @param y2 - The Y component of the second vector.
 * @returns The distance between the two vectors.
 */
export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  const distx = x2 - x1;
  const disty = y2 - y1;
  return Math.sqrt(distx * distx + disty * disty);
};

/**
 * Finds the integer square root of a positive number.
 * @param value - The value to calcuate the square root for.
 * @returns The square root for the given value.
 */
export const isqrt = (value: number) => {
  if (0 === value) {
    return 0;
  } // Avoid zero divide
  let n = value / 2 + 1; // Initial estimate, never low
  let n1 = (n + value / n) / 2;
  while (n1 < n) {
    n = n1;
    n1 = (n + value / n) / 2;
  }
  return n;
};

/**
 * Checks whether a number is an integer.
 * @param value - The value to check.
 * @returns `true` when the value is an integer, `false` otherwise.
 */
export const isInteger = (value: number) => {
  return Math.trunc(value) === value;
};

/**
 * Ensures a given value is within a given boundary.
 * @param input - The number to clamp.
 * @param floor - The lower bound.
 * @param ceil - The upper bound.
 * @returns The number clamped to the desired range.
 */
export const clamp = (input: number, floor: number, ceil: number): number => {
  return Math.max(floor, Math.min(input, ceil));
};

/**
 * Rounds a given number to the next highest value.
 * @param input - The number to round.
 * @param fractionDigits - The amount of digits to retain in the fraction.
 * @returns The rounded number.
 */
export const ceilTo = (input: number, fractionDigits = 0): number => {
  const scale = Math.pow(10, fractionDigits);
  return Math.floor(input * scale) / scale;
};

/**
 * Rounds a given number to the next lowest value.
 * @param input - The number to round.
 * @param fractionDigits - The amount of digits to retain in the fraction.
 * @returns The rounded number.
 */
export const floorTo = (input: number, fractionDigits = 0): number => {
  const scale = Math.pow(10, fractionDigits);
  return Math.floor(input * scale) / scale;
};

/**
 * Rounds a given number to the next closest value.
 * @param input - The number to round.
 * @param fractionDigits - The amount of digits to retain in the fraction.
 * @returns The rounded number.
 */
export const roundTo = (input: number, fractionDigits = 0): number => {
  const scale = Math.pow(10, fractionDigits);
  return Math.round(input * scale) / scale;
};

/**
 * Cuts off digits of a number.
 * @param input - The number to round.
 * @param fractionDigits - The amount of digits to retain in the fraction.
 * @returns The rounded number.
 */
export const truncTo = (input: number, fractionDigits = 0): number => {
  const scale = Math.pow(10, fractionDigits);
  return Math.trunc(input * scale) / scale;
};
