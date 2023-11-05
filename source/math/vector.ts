/**
 * A vector with 2 components.
 */
export class Vector2 {
  x: number;
  y: number;

  /**
   * Constructs a new {@link Vector2}.
   * @param x The X component.
   * @param y The Y component.
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns the dot product between the two vectors.
   * @param x The X component of the other vector.
   * @param y The Y component of the other vector.
   * @returns The dot product between the two vectors.
   */
  dot2(x: number, y: number) {
    return this.x * x + this.y * y;
  }
}

/**
 * A vector with 3 components.
 */
export class Vector3 extends Vector2 {
  z: number;

  /**
   * Constructs a new {@link Vector3}.
   * @param x The X component.
   * @param y The Y component.
   * @param z The Z component.
   */
  constructor(x: number, y: number, z: number) {
    super(x, y);
    this.z = z;
  }
}
