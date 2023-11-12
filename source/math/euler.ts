import { Vector3 } from "./vector3.js";

/**
 * A rotation in Euler angles.
 * @group Math
 */
export class Euler extends Vector3 {
  /**
   * Is this rotation reversed?
   */
  reverse: boolean;

  /**
   * Constructs a new {@linkcode Euler} rotation.
   * @param x The X component of the rotation vector.
   * @param y The Y component of the rotation vector.
   * @param z The Z component of the rotation vector.
   * @param reverse Should this rotation be reversed?
   */
  constructor(x: number, y: number, z: number, reverse: boolean) {
    super(x, y, z);
    this.reverse = reverse;
  }
}
