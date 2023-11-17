import { Euler } from "./euler.js";
import { Matrix3 } from "./matrix3.js";
import { Vector3 } from "./vector3.js";
import { Vector4 } from "./vector4.js";

/**
 * A quaternion.
 * @group Math
 */
export class Quaternion extends Vector4 {
  /**
   * Constructs a new {@linkcode Quaternion}.
   * @param x - The X component.
   * @param y - The Y component.
   * @param z - The Z component.
   * @param w - The W component.
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(x = 0, y = 0, z = 0, w = 0) {
    super(x, y, z, w);
  }

  /**
   * Creates a new {@linkcode Quaternion} from a rotation matrix.
   * @param matrix - The matrix to construct the quaternion from.
   * @returns A new quaternion.
   */
  static fromMatrix3(matrix: Readonly<Matrix3>): Quaternion {
    return new Quaternion().setMatrix3(matrix);
  }

  /**
   * Creates a new {@linkcode Quaternion} from a rotation in Euler angles.
   * @param degrees - The rotation in Euler angles.
   * @returns A new quaternion.
   */
  static fromEuler(degrees: Readonly<Euler>): Quaternion {
    return new Quaternion().setEuler(degrees);
  }

  /**
   * Creates a new {@linkcode Quaternion} from a rotation around an axis.
   * @param axis - The axis around which to rotate.
   * @param degrees - The rotation in degrees.
   * @returns A new quaternion.
   */
  static fromVector3(axis: Readonly<Vector3>, degrees: number): Quaternion {
    return new Quaternion().setVector3(axis, degrees);
  }

  /**
   * Creates a new {@linkcode Quaternion} from a {@linkcode Vector4}.
   * @param vector - The vector to copy the components from.
   * @returns A new quaternion.
   */
  static fromVector4(vector: Readonly<Vector4>): Quaternion {
    return new Quaternion().setVector4(vector);
  }

  /**
   * Creates a new {@linkcode Quaternion} from another {@linkcode Quaternion}.
   * @param quaternion - The quaternion to copy.
   * @returns A new quaternion.
   */
  static fromQuaternion(quaternion: Readonly<Quaternion>): Quaternion {
    return new Quaternion().set(quaternion);
  }

  /**
   * Sets the quaternion to the values of another quaternion.
   * @param quaternion - The quaternion to copy.
   * @returns This instance.
   */
  set(quaternion: Readonly<Quaternion>): this {
    this.x = quaternion.x;
    this.y = quaternion.y;
    this.z = quaternion.z;
    this.w = quaternion.w;
    return this;
  }

  /**
   * Sets all components of the quaternion to the given value.
   * @param value - The value to assign to the components of the quaternion.
   * @returns This instance.
   */
  setValue(value: number): this {
    this.x = value;
    this.y = value;
    this.z = value;
    this.w = 1;
    return this;
  }

  /**
   * Sets the components of the quaternion to the given values.
   * @param x - The X component for the quaternion.
   * @param y - The Y component for the quaternion.
   * @param z - The Z component for the quaternion.
   * @param w - The W component for the quaternion.
   * @returns This instance.
   */
  setXYZW(x: number, y: number, z = 0, w = 1): this {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  /**
   * Sets the quaternion to the rotation of the given matrix.
   * @param matrix - The matrix describing the rotation of the quaternion.
   * @returns This instance.
   */
  setMatrix3(matrix: Readonly<Matrix3>): this {
    const nxt = [1, 2, 0];
    // check the diagonal
    const tr = matrix.m00 + matrix.m11 + matrix.m22;
    if (tr > 0) {
      let s = Math.sqrt(tr + 1);
      this.w = s / 2;
      s = 0.5 / s;
      this.x = (matrix.m21 - matrix.m12) * s;
      this.y = (matrix.m02 - matrix.m20) * s;
      this.z = (matrix.m10 - matrix.m01) * s;
    } else {
      let h = 0;
      if (matrix.m11 > matrix.m00) h = 1;
      if (matrix.m22 > matrix.m[h][h]) h = 2;
      const i = nxt[h];
      const j = nxt[i];

      let s = Math.sqrt(matrix.m[h][h] - (matrix.m[i][i] + matrix.m[j][j]) + 1);
      this.k[h] = s * 0.5;
      if (s !== 0) s = 0.5 / s;
      this.w = (matrix.m[j][i] - matrix.m[i][j]) * s;
      this.k[i] = (matrix.m[i][h] + matrix.m[h][i]) * s;
      this.k[j] = (matrix.m[j][h] + matrix.m[h][j]) * s;
    }
    return this;
  }

  /**
   * Sets the quaternion to a rotation in Euler angles.
   * @param degrees - The rotation in Euler angles.
   * @returns This instance.
   */
  setEuler(degrees: Readonly<Euler>): this {
    const cr = Math.cos(degrees.x / 2);
    const cp = Math.cos(degrees.y / 2);
    const cy = Math.cos(degrees.z / 2);

    const sr = Math.sin(degrees.x / 2);
    const sp = Math.sin(degrees.y / 2);
    const sy = Math.sin(degrees.z / 2);

    const cpcy = cp * cy;
    const spsy = sp * sy;

    this.x = sr * cpcy - cr * spsy;
    this.y = cr * sp * cy + sr * cp * sy;
    this.z = cr * cp * sy - sr * sp * cy;
    this.w = cr * cpcy + sr * spsy;
    return this;
  }

  /**
   * Sets the quaternion to a rotation around an axis.
   * @param axis - The axis around which to rotate.
   * @param degrees - The rotation in degrees.
   * @returns This instance.
   */
  setVector3(axis: Readonly<Vector3>, degrees: number): this {
    const si = Math.sin(degrees / 2);
    this.x = axis.x * si;
    this.y = axis.y * si;
    this.z = axis.z * si;
    this.w = Math.cos(degrees / 2);
    return this;
  }

  /**
   * Sets the quaternion to the components of a {@linkcode Vector4}.
   * @param vector - The vector to copy.
   * @returns This instance.
   */
  setVector4(vector: Readonly<Vector4>): this {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
    this.w = vector.w;
    return this;
  }

  /**
   * Normalize the quaternion.
   * @returns This instance.
   */
  normalize(): this {
    const l = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    if (l === 0) return this;
    this.x = this.x / l;
    this.y = this.y / l;
    this.z = this.z / l;
    this.w = this.w / l;
    return this;
  }

  /**
   * Invert the quaternion.
   * @returns This instance.
   */
  invert(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  /**
   * Multiply with another quaternion from the right.
   * @param quaternion - The quaternion to multiply with.
   * @returns This instance.
   */
  multiplyR(quaternion: Readonly<Quaternion>): this {
    const A = (this.w + this.x) * (quaternion.w + quaternion.x);
    const B = (this.z - this.y) * (quaternion.y - quaternion.z);
    const C = (this.x - this.w) * (quaternion.y - quaternion.z);
    const D = (this.y + this.z) * (quaternion.x - quaternion.w);
    const E = (this.x + this.z) * (quaternion.x + quaternion.y);
    const F = (this.x - this.z) * (quaternion.x - quaternion.y);
    const G = (this.w + this.y) * (quaternion.w - quaternion.z);
    const H = (this.w - this.y) * (quaternion.w + quaternion.z);

    this.w = B + (-E - F + G + H) / 2;
    this.x = A - (E + F + G + H) / 2;
    this.y = -C + (E - F + G - H) / 2;
    this.z = -D + (E - F - G + H) / 2;
    return this;
  }

  /**
   * Performs spherical linear interpolation between two rotations, and sets this
   * quaternion to the resulting rotation.
   * @param q1 - The initial rotation.
   * @param q2 - The target rotation.
   * @param t - The location on the scale from `0` to `1`.
   * @returns This instance.
   */
  slerp(q1: Readonly<Quaternion>, q2: Readonly<Quaternion>, t: number): this {
    const q2a = [0, 0, 0, 0];
    let omega, sinom, scale0, scale1;
    // calc cosine
    let cosom = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

    // adjust signs (if necessary)
    if (cosom < 0) {
      cosom = -cosom;
      q2a[0] = -q2.x;
      q2a[1] = -q2.y;
      q2a[2] = -q2.z;
      q2a[3] = -q2.w;
    } else {
      q2a[0] = q2.x;
      q2a[1] = q2.y;
      q2a[2] = q2.z;
      q2a[3] = q2.w;
    }

    // Delta below only linear interpolation is done
    if (1 - cosom > 0.0001) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1 - t;
      scale1 = t;
    }

    // calculate final values
    this.x = scale0 * q1.x + scale1 * q2a[0];
    this.y = scale0 * q1.y + scale1 * q2a[1];
    this.z = scale0 * q1.z + scale1 * q2a[2];
    this.w = scale0 * q1.w + scale1 * q2a[3];
    return this;
  }
}
