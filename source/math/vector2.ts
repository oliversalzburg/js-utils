/**
 * A vector with 2 components, labeled: `X`, `Y`.
 * @group Math
 */
export class Vector2 {
  /**
   * The X component of the vector.
   */
  x: number;

  /**
   * The Y component of the vector.
   */
  y: number;

  /**
   * Constructs a new {@linkcode Vector2}.
   * @param x The X component.
   * @param y The Y component.
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the vector to new coordinates.
   * @param vector The coordinates to set the vector to.
   * @returns This instance.
   */
  set(vector: Vector2): this {
    return this.setXY(vector.x, vector.y);
  }

  /**
   * Sets the vector to new coordinates.
   * @param x The new X component for the vector.
   * @param y The new Y component for the vector.
   * @returns This instance.
   */
  setXY(x: number, y: number): this {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Adds another vector to this vector.
   * @param vector The vector to add to this vector.
   * @returns This instance.
   */
  add(vector: Vector2): this {
    return this.addXY(vector.x, vector.y);
  }

  /**
   * Adds another vector to this vector.
   * @param x The value to add to the X component.
   * @param y The value to add to the Y component.
   * @returns This instance.
   */
  addXY(x: number, y: number): this {
    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * Scales another vector and adds it to this vector.
   * @param vector The vector to add to this vector.
   * @param scale The scaling to apply to the input vector.
   * @returns This instance.
   */
  addMultiply(vector: Vector2, scale: number): this {
    return this.addMultiplyXY(vector.x, vector.y, scale);
  }

  /**
   * Scales another vector and adds it to this vector.
   * @param x The value to add to the X component.
   * @param y The value to add to the Y component.
   * @param scale The scaling to apply to the input vector.
   * @returns This instance.
   */
  addMultiplyXY(x: number, y: number, scale: number): this {
    this.x += x * scale;
    this.y += y * scale;
    return this;
  }

  /**
   * Subtracts another vector to this vector.
   * @param vector The vector to subtract from this vector.
   * @returns This instance.
   */
  subtract(vector: Vector2): this {
    return this.subtractXY(vector.x, vector.y);
  }

  /**
   * Subtracts another vector to this vector.
   * @param x The value to subtract from the X component.
   * @param y The value to subtract from the Y component.
   * @returns This instance.
   */
  subtractXY(x: number, y: number): this {
    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
   * Multiplies this vector by another vector.
   * @param vector The vector to multiply with this vector.
   * @returns This instance.
   */
  multiply(vector: Vector2): this {
    return this.multiplyXY(vector.x, vector.y);
  }

  /**
   * Multiplies this vector by another vector.
   * @param x The value to multiply with the X component.
   * @param y The value to multiply with the Y component.
   * @returns This instance.
   */
  multiplyXY(x: number, y: number): this {
    this.x *= x;
    this.y *= y;
    return this;
  }

  /**
   * Multiplies the vector by the given scale.
   * @param scale The scaling to apply to the vector.
   * @returns This instance.
   */
  multiplyScale(scale: number): this {
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  /**
   * Divides this vector by another vector.
   * @param vector The vector to divide this vector with.
   * @returns This instance.
   */
  divide(vector: Vector2): this {
    return this.divideXY(vector.x, vector.y);
  }

  /**
   * Divides this vector by another vector.
   * @param x The value to divide the X component with.
   * @param y The value to divide the Y component with.
   * @returns This instance.
   */
  divideXY(x: number, y: number): this {
    this.x /= x;
    this.y /= y;
    return this;
  }

  /**
   * Divides the vector by the given scale.
   * @param scale The scaling to apply to the vector.
   * @returns This instance.
   */
  divideScale(scale: number): this {
    this.x /= scale;
    this.y /= scale;
    return this;
  }

  /**
   * Inverts the sign of the vector.
   * @returns This instance.
   */
  invertAdd(): this {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  /**
   * Inverts the vectors scale.
   * @returns This instance.
   */
  invertMultiply(): this {
    this.x = 1 / this.x;
    this.y = 1 / this.y;
    return this;
  }

  /**
   * Clamps the components of the vector at the given boundary.
   * @param floor The lowest value to allow.
   * @param ceil The largest value to allow.
   * @returns This instance.
   */
  clamp(floor: number, ceil: number): this {
    if (this.x < floor) {
      this.x = floor;
    }
    if (this.x > ceil) {
      this.x = ceil;
    }
    if (this.y < floor) {
      this.y = floor;
    }
    if (this.y > ceil) {
      this.y = ceil;
    }
    return this;
  }

  /**
   * Calculates the length of the vector.
   * @returns The length of the vector.
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Normalizes the vector.
   * @returns This instance.
   */
  normalize(): this {
    const length = this.length();

    if (length === 0) {
      return this;
    }

    this.x /= length;
    this.y /= length;

    return this;
  }

  /**
   * Compares two vectors.
   * @param vector The vector to compare this vector to.
   * @returns `true` if the vectors are idently, `false` otherwise.
   */
  compare(vector: Readonly<Vector2>): boolean {
    return vector.x === this.x && vector.y === this.y;
  }

  /**
   * Linearly moves this vector towards a target vector.
   * @param vector The target vector.
   * @param t The location on the scale, from `0` to `1`.
   * @returns This instance.
   */
  lerp(vector: Readonly<Vector2>, t: number): this {
    const tn = 1.0 - t;
    this.x = this.x * tn + vector.x * t;
    this.y = this.y * tn + vector.y * t;
    return this;
  }

  /**
   * Rotates the vector by the given angle.
   * @param angle The angle in degrees.
   * @returns This instance.
   */
  rotate(angle: number): this {
    angle = -angle * (Math.PI / 180);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this.x = this.x * cos - this.y * sin;
    this.y = this.x * sin + this.y * cos;
    return this;
  }

  /**
   * Returns the dot product between two vectors.
   * @param vector The other vector.
   * @returns The dot product between the two vectors.
   */
  dot(vector: Vector2): number {
    return this.dotXY(vector.x, vector.y);
  }

  /**
   * Returns the dot product between two vectors.
   * @param x The X component of the other vector.
   * @param y The Y component of the other vector.
   * @returns The dot product between the two vectors.
   */
  dotXY(x: number, y: number): number {
    return this.x * x + this.y * y;
  }

  /**
   * Return the components of this vector as an array.
   * @returns The components of this vector as an array.
   */
  asArray(): [number, number] {
    return [this.x, this.y];
  }

  /**
   * Creates a copy of another {@linkcode Vector2}.
   * @param vector The vector to copy.
   * @returns A new vector.
   */
  static fromVector2(vector: Readonly<Vector2>): Vector2 {
    return new Vector2(vector.x, vector.y);
  }
}

/**
 * Adds two vectors and returns a new vector with the result.
 * @param a The first input vector.
 * @param b The second input vector.
 * @returns A new {@linkcode Vector2}.
 * @group Math
 */
export const addVector2 = (a: Vector2, b: Vector2): Vector2 => {
  return new Vector2(a.x * b.x, a.y * b.y);
};

/**
 * Multiplies two vectors and returns a new vector with the result.
 * @param a The first input vector.
 * @param b The second input vector.
 * @returns A new {@linkcode Vector2}.
 * @group Math
 */
export const multiplyVector2 = (a: Vector2, b: Vector2): Vector2 => {
  return new Vector2(a.x * b.x, a.y * b.y);
};

/**
 * Subtracts two vectors and returns a new vector with the result.
 * @param a The first input vector.
 * @param b The second input vector.
 * @returns A new {@linkcode Vector2}.
 * @group Math
 */
export const subtractVector2 = (a: Vector2, b: Vector2): Vector2 => {
  return new Vector2(a.x - b.x, a.y - b.y);
};
