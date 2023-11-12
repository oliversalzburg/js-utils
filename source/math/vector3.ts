import { NotImplementedError } from "source/errors";

/**
 * A vector with 3 components, labeled: `X`, `Y`, `Z`.
 * @group Math
 */
export class Vector3 {
  /**
   * The X component of the vector.
   */
  x: number;

  /**
   * The Y component of the vector.
   */
  y: number;

  /**
   * The Z component of the vector.
   */
  z: number;

  /**
   * Constructs a new {@linkcode Vector3}.
   * @param x The X component.
   * @param y The Y component.
   * @param z The Z component.
   */
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Sets the vector to new coordinates.
   * @param vector The coordinates to set the vector to.
   * @returns This instance.
   */
  set(vector: Readonly<Vector3>): this {
    return this.setXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Sets the vector to new coordinates.
   * @param x The new X component for the vector.
   * @param y The new Y component for the vector.
   * @param z The new Z component for the vector.
   * @returns This instance.
   */
  setXYZ(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * Adds another vector to this vector.
   * @param vector The vector to add to this vector.
   * @returns This instance.
   */
  add(vector: Readonly<Vector3>): this {
    return this.addXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Adds another vector to this vector.
   * @param x The value to add to the X component.
   * @param y The value to add to the Y component.
   * @param z The value to add to the Z component.
   * @returns This instance.
   */
  addXYZ(x: number, y: number, z: number): this {
    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }

  /**
   * Scales another vector and adds it to this vector.
   * @param vector The vector to add to this vector.
   * @param scale The scaling to apply to the input vector.
   * @returns This instance.
   */
  addMultiply(vector: Readonly<Vector3>, scale: number): this {
    return this.addMultiplyXYZ(vector.x, vector.y, vector.z, scale);
  }

  /**
   * Scales another vector and adds it to this vector.
   * @param x The value to add to the X component.
   * @param y The value to add to the Y component.
   * @param z The value to add to the Z component.
   * @param scale The scaling to apply to the input vector.
   * @returns This instance.
   */
  addMultiplyXYZ(x: number, y: number, z: number, scale: number): this {
    this.x += x * scale;
    this.y += y * scale;
    this.z += z * scale;
    return this;
  }

  /**
   * Subtracts another vector to this vector.
   * @param vector The vector to subtract from this vector.
   * @returns This instance.
   */
  subtract(vector: Vector3): this {
    return this.subtractXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Subtracts another vector to this vector.
   * @param x The value to subtract from the X component.
   * @param y The value to subtract from the Y component.
   * @param z The value to subtract from the Z component.
   * @returns This instance.
   */
  subtractXYZ(x: number, y: number, z: number): this {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    return this;
  }

  /**
   * Multiplies this vector by another vector.
   * @param vector The vector to multiply with this vector.
   * @returns This instance.
   */
  multiply(vector: Readonly<Vector3>): this {
    return this.multiplyXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Multiplies this vector by another vector.
   * @param x The value to multiply with the X component.
   * @param y The value to multiply with the Y component.
   * @param z The value to multiply with the Z component.
   * @returns This instance.
   */
  multiplyXYZ(x: number, y: number, z: number): this {
    this.x *= x;
    this.y *= y;
    this.z *= y;
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
    this.z *= scale;
    return this;
  }

  /**
   * Divides this vector by another vector.
   * @param vector The vector to divide this vector with.
   * @returns This instance.
   */
  divide(vector: Readonly<Vector3>): this {
    return this.divideXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Divides this vector by another vector.
   * @param x The value to divide the X component with.
   * @param y The value to divide the Y component with.
   * @param z The value to divide the Z component with.
   * @returns This instance.
   */
  divideXYZ(x: number, y: number, z: number): this {
    this.x /= x;
    this.y /= y;
    this.z /= z;
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
    this.z /= scale;
    return this;
  }

  /**
   * Inverts the sign of the vector.
   * @returns This instance.
   */
  invertAdd(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  /**
   * Inverts the vectors scale.
   * @returns This instance.
   */
  invertMultiply(): this {
    this.x = 1 / this.x;
    this.y = 1 / this.y;
    this.z = 1 / this.z;
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
    if (this.z < floor) {
      this.z = floor;
    }
    if (this.z > ceil) {
      this.z = ceil;
    }
    return this;
  }

  /**
   * Calculates the length of the vector.
   * @returns The length of the vector.
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
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
    this.z /= length;

    return this;
  }

  /**
   * Compares two vectors.
   * @param vector The vector to compare this vector to.
   * @returns `true` if the vectors are idently, `false` otherwise.
   */
  compare(vector: Readonly<Vector3>): boolean {
    return vector.x === this.x && vector.y === this.y && vector.z === this.z;
  }

  /**
   * Linearly moves this vector towards a target vector.
   * @param vector The target vector.
   * @param t The location on the scale, from `0` to `1`.
   * @returns This instance.
   */
  lerp(vector: Readonly<Vector3>, t: number): this {
    const tn = 1.0 - t;
    this.x = this.x * tn + vector.x * t;
    this.y = this.y * tn + vector.y * t;
    this.z = this.z * tn + vector.z * t;
    return this;
  }

  /**
   * Rotates the vector by the given angle.
   * @param angle The angle in degrees.
   */
  rotate(angle: number): this {
    throw new NotImplementedError("Missing `Matrix3` implementation.");
  }

  /**
   * Returns the dot product between two vectors.
   * @param vector The other vector.
   * @returns The dot product between the two vectors.
   */
  dot(vector: Readonly<Vector3>): number {
    return this.dotXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Returns the dot product between two vectors.
   * @param x The X component of the other vector.
   * @param y The Y component of the other vector.
   * @param z The Z component of the other vector.
   * @returns The dot product between the two vectors.
   */
  dotXYZ(x: number, y: number, z: number): number {
    return this.x * x + this.y * y + this.z * z;
  }
}
