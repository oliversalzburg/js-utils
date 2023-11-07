/**
 * A vector with 2 components.
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
   * Constructs a new {@link Vector2}.
   * @param x The X component.
   * @param y The Y component.
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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
}
