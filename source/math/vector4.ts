/**
 * A vector with 4 components, labeled: `X`, `Y`, `Z`, `W`.
 * @group Math
 */
export class Vector4 {
  /**
   * The components of the vector.
   */
  k = [0, 0, 0, 0];

  /**
   * Get the X component of the vector.
   * @returns The X component of the vector.
   */
  get x(): number {
    return this.k[0];
  }
  /**
   * Set the X component of the vector.
   */
  set x(value: number) {
    this.k[0] = value;
  }

  /**
   * Get the Y component of the vector.
   * @returns The Y component of the vector.
   */
  get y(): number {
    return this.k[1];
  }
  /**
   * Set the Y component of the vector.
   */
  set y(value: number) {
    this.k[1] = value;
  }

  /**
   * Get the Z component of the vector.
   * @returns The Z component of the vector.
   */
  get z(): number {
    return this.k[2];
  }
  /**
   * Set the Z component of the vector.
   */
  set z(value: number) {
    this.k[2] = value;
  }

  /**
   * Get the W component of the vector.
   * @returns The W component of the vector.
   */
  get w(): number {
    return this.k[3];
  }
  /**
   * Set the W component of the vector.
   */
  set w(value: number) {
    this.k[3] = value;
  }

  /**
   * Constructs a new {@linkcode Vector4}.
   * @param x The X component.
   * @param y The Y component.
   * @param z The Z component.
   * @param w The W component.
   */
  constructor(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * Creates a copy of another {@linkcode Vector4}.
   * @param vector The vector to copy.
   * @returns A new vector.
   */
  static fromVector4(vector: Readonly<Vector4>): Vector4 {
    return new Vector4(vector.x, vector.y, vector.z, vector.w);
  }

  /**
   * Sets the vector to new coordinates.
   * @param vector The coordinates to set the vector to.
   * @returns This instance.
   */
  set(vector: Readonly<Vector4>): this {
    return this.setXYZW(vector.x, vector.y, vector.z, vector.w);
  }

  /**
   * Sets the vector to new coordinates.
   * @param x The new X component for the vector.
   * @param y The new Y component for the vector.
   * @param z The new Z component for the vector.
   * @param w The new W component for the vector.
   * @returns This instance.
   */
  setXYZW(x: number, y: number, z: number, w: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  /**
   * Adds the XYZ components of another vector to this vector.
   * @param vector The vector to add to this vector.
   * @returns This instance.
   */
  add3(vector: Readonly<Vector4>): this {
    return this.add3XYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Adds the XYZ components of another vector to this vector.
   * @param x The value to add to the X component.
   * @param y The value to add to the Y component.
   * @param z The value to add to the Z component.
   * @returns This instance.
   */
  add3XYZ(x: number, y: number, z: number): this {
    this.x += x;
    this.y += y;
    this.z += z;
    return this;
  }

  /**
   * Scales another vector and adds its XYZ components to this vector.
   * @param vector The vector to add to this vector.
   * @param scale The scaling to apply to the input vector.
   * @returns This instance.
   */
  addMultiply3(vector: Readonly<Vector4>, scale: number): this {
    return this.addMultiply3XYZ(vector.x, vector.y, vector.z, scale);
  }

  /**
   * Scales another vector and adds its XYZ components to this vector.
   * @param x The value to add to the X component.
   * @param y The value to add to the Y component.
   * @param z The value to add to the Z component.
   * @param scale The scaling to apply to the input vector.
   * @returns This instance.
   */
  addMultiply3XYZ(x: number, y: number, z: number, scale: number): this {
    this.x += x * scale;
    this.y += y * scale;
    this.z += z * scale;
    return this;
  }

  /**
   * Subtracts the XYZ components of another vector from this vector.
   * @param vector The vector to subtract from this vector.
   * @returns This instance.
   */
  subtract3(vector: Readonly<Vector4>): this {
    return this.subtract3XYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Subtracts the XYZ components of another vector from this vector.
   * @param x The value to subtract from the X component.
   * @param y The value to subtract from the Y component.
   * @param z The value to subtract from the Z component.
   * @returns This instance.
   */
  subtract3XYZ(x: number, y: number, z: number): this {
    this.x -= x;
    this.y -= y;
    this.z -= z;
    return this;
  }

  /**
   * Multiplies the XYZ components of this vector by another vector.
   * @param vector The vector to multiply with this vector.
   * @returns This instance.
   */
  multiply3(vector: Readonly<Vector4>): this {
    return this.multiply3XYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Multiplies the XYZ components of this vector by another vector.
   * @param x The value to multiply with the X component.
   * @param y The value to multiply with the Y component.
   * @param z The value to multiply with the Z component.
   * @returns This instance.
   */
  multiply3XYZ(x: number, y: number, z: number): this {
    this.x *= x;
    this.y *= y;
    this.z *= z;
    return this;
  }

  /**
   * Multiplies the XYZ components of the vector by the given scale.
   * @param scale The scaling to apply to the vector.
   * @returns This instance.
   */
  multiply3Scale(scale: number): this {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    return this;
  }

  /**
   * Divides the XYZ components of this vector by another vector.
   * @param vector The vector to divide this vector with.
   * @returns This instance.
   */
  divide3(vector: Readonly<Vector4>): this {
    return this.divide3XYZ(vector.x, vector.y, vector.z);
  }

  /**
   * Divides the XYZ components of this vector by another vector.
   * @param x The value to divide the X component with.
   * @param y The value to divide the Y component with.
   * @param z The value to divide the Z component with.
   * @returns This instance.
   */
  divide3XYZ(x: number, y: number, z: number): this {
    this.x /= x;
    this.y /= y;
    this.z /= z;
    return this;
  }

  /**
   * Divides the XYZ components of the vector by the given scale.
   * @param scale The scaling to apply to the vector.
   * @returns This instance.
   */
  divide3Scale(scale: number): this {
    this.x /= scale;
    this.y /= scale;
    this.z /= scale;
    return this;
  }

  /**
   * Inverts the direction of the vector.
   * @returns This instance.
   */
  invertAdd3(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  /**
   * Inverts the vectors scale.
   * @returns This instance.
   */
  invertMultiply3(): this {
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
    if (this.w < floor) {
      this.w = floor;
    }
    if (this.w > ceil) {
      this.w = ceil;
    }
    return this;
  }

  /**
   * Linearly moves this vector towards a target vector.
   * @param vector The target vector.
   * @param t The location on the scale, from `0` to `1`.
   * @returns This instance.
   */
  lerp(vector: Readonly<Vector4>, t: number): this {
    const tn = 1 - t;
    this.x = this.x * tn + vector.x * t;
    this.y = this.y * tn + vector.y * t;
    this.z = this.z * tn + vector.z * t;
    this.w = this.z * tn + vector.w * t;
    return this;
  }
}
