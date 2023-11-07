import { Vector3 } from "./math/vector";

/**
 * Helps with generating random numbers.
 */
export class Random {
  private _seed: number;
  private _perm: Array<number>;
  private _gradP: Array<Vector3>;
  private _F2: number;
  private _G2: number;

  /**
   * Creates a pseudo-random value generator. The seed must be an integer.
   *
   * Uses an optimized version of the Park-Miller PRNG.
   * http://www.firstpr.com.au/dsp/rand31/
   * @param seed The seed for the random number generator.
   */
  constructor(seed = 0) {
    this._seed = Math.trunc(seed) % 2147483647;
    if (this._seed <= 0) {
      this._seed += 2147483646;
    }

    const grad3 = [
      new Vector3(1, 1, 0),
      new Vector3(-1, 1, 0),
      new Vector3(1, -1, 0),
      new Vector3(-1, -1, 0),
      new Vector3(1, 0, 1),
      new Vector3(-1, 0, 1),
      new Vector3(1, 0, -1),
      new Vector3(-1, 0, -1),
      new Vector3(0, 1, 1),
      new Vector3(0, -1, 1),
      new Vector3(0, 1, -1),
      new Vector3(0, -1, -1),
    ];

    const p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
      142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
      203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
      74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230,
      220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209,
      76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198,
      173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
      207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44,
      154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79,
      113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
      191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29,
      24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ];

    this._perm = new Array<number>(512);
    this._gradP = new Array<Vector3>(512);

    for (let i = 0; i < 256; i++) {
      let v;
      if (i & 1) {
        v = p[i] ^ (this._seed & 255);
      } else {
        v = p[i] ^ ((this._seed >> 8) & 255);
      }

      this._perm[i] = this._perm[i + 256] = v;
      this._gradP[i] = this._gradP[i + 256] = grad3[v % 12];
    }

    // Skewing and unskewing factors for 2, 3, and 4 dimensions
    this._F2 = 0.5 * (Math.sqrt(3) - 1);
    this._G2 = (3 - Math.sqrt(3)) / 6;
  }

  /**
   * Returns a pseudo-random value between 1 and 2^32 - 2.
   * @returns A pseudo-random value between 1 and 2^32 - 2.
   */
  next() {
    return (this._seed = (this._seed * 16807) % 2147483647);
  }

  /**
   * Returns either `true` or `false`.
   * @returns Either `true` or `false`.
   */
  nextBoolean() {
    return this.next() < 2147483646 / 2;
  }

  /**
   * Returns a pseudo-random floating point number in range [0, 1).
   * @returns a pseudo-random floating point number in range [0, 1).
   */
  nextFloat() {
    // We know that result of next() will be 1 to 2147483646 (inclusive).
    return (this.next() - 1) / 2147483646;
  }

  /**
   * Returns a 2D simplex noise value for a given input coordinate.
   * @license ISC
   * @author Joseph Gentle
   * @see https://github.com/josephg/noisejs
   * @param x The X input coordinate.
   * @param y The Y input coordinate.
   * @returns The noise value for the input coordinates.
   */
  simplex2(x: number, y: number) {
    let n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    const s = (x + y) * this._F2; // Hairy factor for 2D
    let i = Math.floor(x + s);
    let j = Math.floor(y + s);
    const t = (i + j) * this._G2;
    const x0 = x - i + t; // The x,y distances from the cell origin, unskewed.
    const y0 = y - j + t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if (x0 > y0) {
      // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1 = 1;
      j1 = 0;
    } else {
      // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1 = 0;
      j1 = 1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    const x1 = x0 - i1 + this._G2; // Offsets for middle corner in (x,y) unskewed coords
    const y1 = y0 - j1 + this._G2;
    const x2 = x0 - 1 + 2 * this._G2; // Offsets for last corner in (x,y) unskewed coords
    const y2 = y0 - 1 + 2 * this._G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 255;
    j &= 255;
    const gi0 = this._gradP[i + this._perm[j]];
    const gi1 = this._gradP[i + i1 + this._perm[j + j1]];
    const gi2 = this._gradP[i + 1 + this._perm[j + 1]];
    // Calculate the contribution from the three corners
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
  }
}

/**
 * Returns a random value in a given range.
 * Uses the JS-internal `Math.random()`. Use {MathHelper} for a PRNG with more features.
 * @param min The lower bound.
 * @param max The upper bound.
 * @returns A random value between the lower and upper bound.
 */
export const randomRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

/**
 * Generates a numberic seed, to be used as an input for a PRNG,
 * from a string.
 * @param input The string to use as a seed.
 * @returns A numeric seed value for a PRNG.
 */
export const seedFromString = (input: string) => {
  return input
    .split("")
    .reduce((seed, char) => (seed = seed + ((char.charCodeAt(0) * 17989) % 2147483647)), 0);
};

export const random = new Random();
