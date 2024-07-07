import { Matrix3 } from "./matrix3.js";
import { Vector3 } from "./vector3.js";

/**
 * Encapsulates an entire transformation, including rotation, position, and scale.
 */
export class Transformation {
  /**
   * The rotation to apply through this transformation.
   */
  rotation: Matrix3;

  /**
   * The position to apply through this transformation.
   */
  position: Vector3;

  /**
   * The scale to apply through this transformation.
   */
  scale: Vector3;

  /**
   * Construct a new {@linkcode Transformation}.
   * @param rotation - The rotation to apply through the transformation.
   * @param position - The position to apply through the transformation.
   * @param scale - The scale to apply through the transformation.
   */
  constructor(rotation: Readonly<Matrix3>, position: Readonly<Vector3>, scale: Readonly<Vector3>) {
    this.rotation = Matrix3.fromMatrix3(rotation);
    this.position = Vector3.fromVector3(position);
    this.scale = Vector3.fromVector3(scale);
  }
}
