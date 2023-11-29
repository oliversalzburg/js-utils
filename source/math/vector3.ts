import { Matrix3 } from "./matrix3.js";
import { Transformation } from "./transformation.js";

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
   * @param x - The X component.
   * @param y - The Y component.
   * @param z - The Z component.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Creates a copy of another {@linkcode Vector3}.
   * @param vector - The vector to copy.
   * @returns A new vector.
   */
  static fromVector3(vector: Readonly<Vector3>): Vector3 {
    return new Vector3(vector.x, vector.y, vector.z);
  }

  /**
   * Sets the vector to new coordinates.
   * @param vector - The coordinates to set the vector to.
   * @returns This instance.
   */
  set(vector: Readonly<Vector3>): this {
    return this.setXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Sets the vector to new coordinates.
   * @param x - The new X component for the vector.
   * @param y - The new Y component for the vector.
   * @param z - The new Z component for the vector.
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
   * @param vector - The vector to add to this vector.
   * @returns This instance.
   */
  add(vector: Readonly<Vector3>): this {
    return this.addXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Adds another vector to this vector.
   * @param x - The value to add to the X component.
   * @param y - The value to add to the Y component.
   * @param z - The value to add to the Z component.
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
   * @param vector - The vector to add to this vector.
   * @param scale - The scaling to apply to the input vector.
   * @returns This instance.
   */
  addMultiply(vector: Readonly<Vector3>, scale: number): this {
    return this.addMultiplyXYZ(vector.x, vector.y, vector.z, scale);
  }

  /**
   * Scales another vector and adds it to this vector.
   * @param x - The value to add to the X component.
   * @param y - The value to add to the Y component.
   * @param z - The value to add to the Z component.
   * @param scale - The scaling to apply to the input vector.
   * @returns This instance.
   */
  addMultiplyXYZ(x: number, y: number, z: number, scale: number): this {
    this.x += x * scale;
    this.y += y * scale;
    this.z += z * scale;
    return this;
  }

  /**
   * Subtracts another vector from this vector.
   * @param vector - The vector to subtract from this vector.
   * @returns This instance.
   */
  subtract(vector: Vector3): this {
    return this.subtractXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Subtracts another vector from this vector.
   * @param x - The value to subtract from the X component.
   * @param y - The value to subtract from the Y component.
   * @param z - The value to subtract from the Z component.
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
   * @param vector - The vector to multiply with this vector.
   * @returns This instance.
   */
  multiply(vector: Readonly<Vector3>): this {
    return this.multiplyXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Multiplies this vector by another vector.
   * @param x - The value to multiply with the X component.
   * @param y - The value to multiply with the Y component.
   * @param z - The value to multiply with the Z component.
   * @returns This instance.
   */
  multiplyXYZ(x: number, y: number, z: number): this {
    this.x *= x;
    this.y *= y;
    this.z *= z;
    return this;
  }

  /**
   * Multiplies the vector by the given scale.
   * @param scale - The scaling to apply to the vector.
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
   * @param vector - The vector to divide this vector with.
   * @returns This instance.
   */
  divide(vector: Readonly<Vector3>): this {
    return this.divideXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Divides this vector by another vector.
   * @param x - The value to divide the X component with.
   * @param y - The value to divide the Y component with.
   * @param z - The value to divide the Z component with.
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
   * @param scale - The scaling to apply to the vector.
   * @returns This instance.
   */
  divideScale(scale: number): this {
    this.x /= scale;
    this.y /= scale;
    this.z /= scale;
    return this;
  }

  /**
   * Inverts the direction of the vector.
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
   * @param floor - The lowest value to allow.
   * @param ceil - The largest value to allow.
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
   * @param vector - The vector to compare this vector to.
   * @returns `true` if the vectors are idently, `false` otherwise.
   */
  compare(vector: Readonly<Vector3>): boolean {
    return vector.x === this.x && vector.y === this.y && vector.z === this.z;
  }

  /**
   * Linearly moves this vector towards a target vector.
   * @param vector - The target vector.
   * @param t - The location on the scale, from `0` to `1`.
   * @returns This instance.
   */
  lerp(vector: Readonly<Vector3>, t: number): this {
    const tn = 1 - t;
    this.x = this.x * tn + vector.x * t;
    this.y = this.y * tn + vector.y * t;
    this.z = this.z * tn + vector.z * t;
    return this;
  }

  /**
   * Rotates the vector by the given rotation matrix.
   * @param matrix - The rotation matrix to apply to the vector.
   * @returns This instance.
   */
  rotate(matrix: Readonly<Matrix3>): this {
    const xn = this.x;
    const yn = this.y;
    const zn = this.z;
    this.x = xn * matrix.m00 + yn * matrix.m10 + zn * matrix.m20;
    this.y = xn * matrix.m01 + yn * matrix.m11 + zn * matrix.m21;
    this.z = xn * matrix.m02 + yn * matrix.m12 + zn * matrix.m22;
    return this;
  }

  /**
   * Inversely rotates the vector by the given rotation matrix.
   * @param matrix - The rotation matrix to apply to the vector.
   * @returns This instance.
   */
  rotateInverse(matrix: Readonly<Matrix3>): this {
    const xn = this.x;
    const yn = this.y;
    const zn = this.z;
    this.x = xn * matrix.m00 + yn * matrix.m01 + zn * matrix.m02;
    this.y = xn * matrix.m10 + yn * matrix.m11 + zn * matrix.m12;
    this.z = xn * matrix.m20 + yn * matrix.m21 + zn * matrix.m22;
    return this;
  }

  /**
   * Rotates the vector by the given rotation matrix around the given center.
   * @param center - The center around which to rotate the vector.
   * @param matrix - The rotation matrix to apply to the vector.
   * @returns This instance.
   */
  rotateAround(center: Readonly<Vector3>, matrix: Readonly<Matrix3>): this {
    const xn = this.x - center.x;
    const yn = this.y - center.y;
    const zn = this.z - center.z;
    this.x = xn * matrix.m00 + yn * matrix.m10 + zn * matrix.m20 + center.x;
    this.y = xn * matrix.m01 + yn * matrix.m11 + zn * matrix.m21 + center.y;
    this.z = xn * matrix.m02 + yn * matrix.m12 + zn * matrix.m22 + center.z;
    return this;
  }

  /**
   * Inversely rotates the vector by the given rotation matrix around the given center.
   * @param center - The center around which to rotate the vector.
   * @param matrix - The rotation matrix to apply to the vector.
   * @returns This instance.
   */
  rotateAroundInverse(center: Readonly<Vector3>, matrix: Readonly<Matrix3>): this {
    const xn = this.x - center.x;
    const yn = this.y - center.y;
    const zn = this.z - center.z;
    this.x = xn * matrix.m00 + yn * matrix.m01 + zn * matrix.m02 + center.x;
    this.y = xn * matrix.m10 + yn * matrix.m11 + zn * matrix.m12 + center.y;
    this.z = xn * matrix.m20 + yn * matrix.m21 + zn * matrix.m22 + center.z;
    return this;
  }

  /**
   * Transform the vector with a {@linkcode Transformation}.
   * @param transformation - The transformation to apply.
   * @returns This instance.
   */
  transform(transformation: Readonly<Transformation>): this {
    return this.multiply(transformation.scale)
      .rotate(transformation.rotation)
      .add(transformation.position);
  }

  /**
   * Inversely transform the vector with a {@linkcode Transformation}.
   * @param transformation - The transformation to apply.
   * @returns This instance.
   */
  transformInverse(transformation: Readonly<Transformation>): this {
    return this.subtract(transformation.position)
      .rotateInverse(transformation.rotation)
      .divide(transformation.scale);
  }

  /**
   * Returns the dot product between two vectors.
   * @param vector - The other vector.
   * @returns The dot product between the two vectors.
   */
  dot(vector: Readonly<Vector3>): number {
    return this.dotXYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Returns the dot product between two vectors.
   * @param x - The X component of the other vector.
   * @param y - The Y component of the other vector.
   * @param z - The Z component of the other vector.
   * @returns The dot product between the two vectors.
   */
  dotXYZ(x: number, y: number, z: number): number {
    return this.x * x + this.y * y + this.z * z;
  }

  /**
   * Calculates the dot product of this vector and another vector, and then
   * sets this vector to the result.
   * @param vector - The other vector.
   * @returns This instance.
   */
  cross(vector: Readonly<Vector3>): this {
    const xn = this.z * vector.y - this.y * vector.z;
    const yn = this.x * vector.z - this.z * vector.x;
    const zn = this.y * vector.x - this.x * vector.y;
    this.x = xn;
    this.y = yn;
    this.z = zn;
    return this;
  }

  /**
   * Makes this vector perpendicular to the other 3 vectors.
   * @param vector0 - The first vector.
   * @param vector1 - The second vector.
   * @param vector2 - The third vector.
   * @returns This instance.
   */
  perpendicular(
    vector0: Readonly<Vector3>,
    vector1: Readonly<Vector3>,
    vector2: Readonly<Vector3>,
  ): this {
    const px = vector2.x - vector1.x;
    const py = vector2.y - vector1.y;
    const pz = vector2.z - vector1.z;
    const qx = vector0.x - vector1.x;
    const qy = vector0.y - vector1.y;
    const qz = vector0.z - vector1.z;
    this.x = pz * qy - py * qz;
    this.y = px * qz - pz * qx;
    this.z = py * qx - px * qy;
    return this;
  }

  /**
   * Reflects this vector against the given normal and sets this vector to
   * the result.
   * @param normal - The normal against which to reflect.
   * @returns This instance.
   */
  reflect(normal: Readonly<Vector3>): this {
    const c = this.dot(normal) * 2;
    this.x = this.x - c * normal.x;
    this.y = this.y - c * normal.y;
    this.z = this.z - c * normal.z;
    return this;
  }

  /**
   * Calculates the reflection of this vector, based on the angle of incident
   * into a material with the given refractive index, according to Snell's law.
   * This vector is then set to the result.
   * @param normal - The normal against which to reflect.
   * @param index - The refractive index of the material.
   * @returns This instance.
   */
  fraction(normal: Readonly<Vector3>, index: number): this {
    let c = -this.dot(normal);
    const r = 1 + index * index * (c * c - 1);
    if (r < 0) return this.reflect(normal);
    c = index * c - Math.sqrt(r);
    this.x = index * this.x + c * normal.x;
    this.y = index * this.y + c * normal.y;
    this.z = index * this.z + c * normal.z;
    return this;
  }

  /**
   * Return the components of this vector as an array.
   * @returns The components of this vector as an array.
   */
  asArray(): [number, number, number] {
    return [this.x, this.y, this.z];
  }
}

/**
 * Adds two vectors and returns a new vector with the result.
 * @param a - The first input vector.
 * @param b - The second input vector.
 * @returns A new {@linkcode Vector3}.
 * @group Math
 */
export const addVector3 = (a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 => {
  return new Vector3(a.x * b.x, a.y * b.y, a.z + b.z);
};

/**
 * Multiplies two vectors and returns a new vector with the result.
 * @param a - The first input vector.
 * @param b - The second input vector.
 * @returns A new {@linkcode Vector3}.
 * @group Math
 */
export const multiplyVector3 = (a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 => {
  return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
};

/**
 * Subtracts two vectors and returns a new vector with the result.
 * @param a - The first input vector.
 * @param b - The second input vector.
 * @returns A new {@linkcode Vector3}.
 * @group Math
 */
export const subtractVector3 = (a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 => {
  return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
};

/**
 * Calculates the cross product between two vectors and returns a new vector with the result.
 * @param a - The first input vector.
 * @param b - The second input vector.
 * @returns A new vector, which is the cross product of the two input vectors.
 * @group Math
 */
export const crossVector3 = (a: Readonly<Vector3>, b: Readonly<Vector3>): Vector3 => {
  const c = Vector3.fromVector3(a);
  return c.cross(b);
};

/**
 * Calculates the dot product between two vectors.
 * @param a - The first input vector.
 * @param b - The second input vector.
 * @returns The dot product between the two vectors.
 * @group Math
 */
export const dotVector3 = (a: Readonly<Vector3>, b: Readonly<Vector3>): number => {
  const c = Vector3.fromVector3(a);
  return c.dot(b);
};
