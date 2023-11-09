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
   * @param x The new X component for the vector.
   * @param y The new Y component for the vector.
   * @param z The new Z component for the vector.
   */
  setXYZ(x: number, y: number, z: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Returns the dot product between two vectors.
   * @param vector The other vector.
   * @returns The dot product between the two vectors.
   */
  dot(vector: Vector3): number {
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
