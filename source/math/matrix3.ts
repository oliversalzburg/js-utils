import { Euler } from "./euler.js";
import { Quaternion } from "./quaternion.js";
import { Vector3 } from "./vector3.js";

/**
 * A matrix with 3 x 3 components.
 * @group Math
 */
export class Matrix3 {
  /**
   * The components of the matrix.
   */
  m = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  /**
   * Get position `0,0` of this matrix.
   * @returns The position `0,0` of this matrix.
   */
  get m00(): number {
    return this.m[0][0];
  }
  /**
   * Set position `0,0` of this matrix.
   */
  set m00(value: number) {
    this.m[0][0] = value;
  }

  /**
   * Get position `1,0` of this matrix.
   * @returns The position `1,0` of this matrix.
   */
  get m10(): number {
    return this.m[1][0];
  }
  /**
   * Set position `1,0` of this matrix.
   */
  set m10(value: number) {
    this.m[1][0] = value;
  }

  /**
   * Get position `2,0` of this matrix.
   * @returns The position `2,0` of this matrix.
   */
  get m20(): number {
    return this.m[2][0];
  }
  /**
   * Set position `2,0` of this matrix.
   */
  set m20(value: number) {
    this.m[2][0] = value;
  }

  /**
   * Get position `0,1` of this matrix.
   * @returns The position `0,1` of this matrix.
   */
  get m01(): number {
    return this.m[0][1];
  }
  /**
   * Set position `0,1` of this matrix.
   */
  set m01(value: number) {
    this.m[0][1] = value;
  }

  /**
   * Get position `1,1` of this matrix.
   * @returns The position `1,1` of this matrix.
   */
  get m11(): number {
    return this.m[1][1];
  }
  /**
   * Set position `1,1` of this matrix.
   */
  set m11(value: number) {
    this.m[1][1] = value;
  }

  /**
   * Get position `2,1` of this matrix.
   * @returns The position `2,1` of this matrix.
   */
  get m21(): number {
    return this.m[2][1];
  }
  /**
   * Set position `2,1` of this matrix.
   */
  set m21(value: number) {
    this.m[2][1] = value;
  }

  /**
   * Get position `0,2` of this matrix.
   * @returns The position `0,2` of this matrix.
   */
  get m02(): number {
    return this.m[0][2];
  }
  /**
   * Set position `0,2` of this matrix.
   */
  set m02(value: number) {
    this.m[0][2] = value;
  }

  /**
   * Get position `1,2` of this matrix.
   * @returns The position `1,2` of this matrix.
   */
  get m12(): number {
    return this.m[1][2];
  }
  /**
   * Set position `1,2` of this matrix.
   */
  set m12(value: number) {
    this.m[1][2] = value;
  }

  /**
   * Get position `2,2` of this matrix.
   * @returns The position `2,2` of this matrix.
   */
  get m22(): number {
    return this.m[2][2];
  }
  /**
   * Set position `2,2` of this matrix.
   */
  set m22(value: number) {
    this.m[2][2] = value;
  }

  /**
   * Constructs a new {@linkcode Matrix3}.
   * @param m00 Position `0,0` of this matrix.
   * @param m10 Position `1,0` of this matrix.
   * @param m20 Position `2,0` of this matrix.
   * @param m01 Position `0,1` of this matrix.
   * @param m11 Position `1,1` of this matrix.
   * @param m21 Position `2,1` of this matrix.
   * @param m02 Position `0,2` of this matrix.
   * @param m12 Position `1,2` of this matrix.
   * @param m22 Position `2,2` of this matrix.
   */
  constructor(
    m00 = 1.0,
    m10 = 0.0,
    m20 = 0.0,
    m01 = 0.0,
    m11 = 1.0,
    m21 = 0.0,
    m02 = 0.0,
    m12 = 0.0,
    m22 = 1.0,
  ) {
    this.m00 = m00;
    this.m10 = m10;
    this.m20 = m20;
    this.m01 = m01;
    this.m11 = m11;
    this.m21 = m21;
    this.m02 = m02;
    this.m12 = m12;
    this.m22 = m22;
  }

  /**
   * Creates a new {@linkcode Matrix3} from another {@linkcode Matrix3}.
   * @param matrix The matrix to copy.
   * @returns A new matrix.
   */
  static fromMatrix3(matrix: Readonly<Matrix3>): Matrix3 {
    return new Matrix3().set(matrix);
  }

  /**
   * Creates a new {@linkcode Matrix3} from a rotation in Euler angles.
   * @param degrees The rotation in Euler angles.
   * @returns A new matrix.
   */
  static fromEuler(degrees: Readonly<Euler>): Matrix3 {
    return new Matrix3().setEuler(degrees);
  }

  /**
   * Creates a new {@linkcode Matrix3} from a rotation around an axis.
   * @param axis The axis around which to rotate.
   * @param degrees The rotation in degrees.
   * @returns A new matrix.
   */
  static fromVector3(axis: Readonly<Vector3>, degrees: number): Matrix3 {
    return new Matrix3().setVector3(axis, degrees);
  }

  /**
   * Creates a new {@linkcode Matrix3} from a quaternion.
   * @param quaternion The quaternion describes the rotation.
   * @returns A new matrix.
   */
  static fromQuaternion(quaternion: Readonly<Quaternion>): Matrix3 {
    return new Matrix3().setQuaternion(quaternion);
  }

  /**
   * Sets the matrix to new values from another matrix.
   * @param matrix The matrix to copy.
   * @returns This instance.
   */
  set(matrix: Readonly<Matrix3>): this {
    this.setM(
      matrix.m00,
      matrix.m10,
      matrix.m20,
      matrix.m01,
      matrix.m11,
      matrix.m21,
      matrix.m02,
      matrix.m12,
      matrix.m22,
    );
    return this;
  }

  /**
   * Update the matrix by individual components.
   * @param m00 Position `0,0` of this matrix.
   * @param m10 Position `1,0` of this matrix.
   * @param m20 Position `2,0` of this matrix.
   * @param m01 Position `0,1` of this matrix.
   * @param m11 Position `1,1` of this matrix.
   * @param m21 Position `2,1` of this matrix.
   * @param m02 Position `0,2` of this matrix.
   * @param m12 Position `1,2` of this matrix.
   * @param m22 Position `2,2` of this matrix.
   * @returns This instance.
   */
  setM(
    m00: number,
    m10: number,
    m20: number,
    m01: number,
    m11: number,
    m21: number,
    m02: number,
    m12: number,
    m22: number,
  ): this {
    this.m00 = m00;
    this.m10 = m10;
    this.m20 = m20;
    this.m01 = m01;
    this.m11 = m11;
    this.m21 = m21;
    this.m02 = m02;
    this.m12 = m12;
    this.m22 = m22;
    return this;
  }

  /**
   * Sets the matrix to a rotation in Euler angles.
   * @param degrees The rotation in Euler angles.
   * @returns This instance.
   */
  setEuler(degrees: Readonly<Euler>): this {
    const xsi = Math.sin(degrees.x);
    const xco = Math.cos(degrees.x);
    const ysi = Math.sin(degrees.y);
    const yco = Math.cos(degrees.y);
    const zsi = Math.sin(degrees.z);
    const zco = Math.cos(degrees.z);

    if (degrees.reverse) {
      this.m00 = yco * zco;
      this.m10 = yco * zsi;
      this.m20 = -ysi;
      this.m01 = xsi * ysi * zco - xco * zsi;
      this.m11 = xsi * ysi * zsi + xco * zco;
      this.m21 = xsi * yco;
      this.m02 = xco * ysi * zco + xsi * zsi;
      this.m12 = xco * ysi * zsi - xsi * zco;
      this.m22 = xco * yco;
    } else {
      this.m00 = yco * zco;
      this.m10 = xco * zsi + xsi * ysi * zco;
      this.m20 = xsi * zsi - xco * ysi * zco;
      this.m01 = -yco * zsi;
      this.m11 = xco * zco - xsi * ysi * zsi;
      this.m21 = xsi * zco + xco * ysi * zsi;
      this.m02 = ysi;
      this.m12 = -xsi * yco;
      this.m22 = xco * yco;
    }
    return this;
  }

  /**
   * Sets the matrix to a rotation around an axis.
   * @param axis The axis around which to rotate.
   * @param degrees The rotation in degrees.
   * @returns This instance.
   */
  setVector3(axis: Readonly<Vector3>, degrees: number): this {
    const s = Math.sin(degrees);
    const c = Math.cos(degrees);
    const t = 1.0 - c;
    const txy = t * axis.x * axis.y;
    const txz = t * axis.x * axis.z;
    const tyz = t * axis.y * axis.z;
    const sx = s * axis.x;
    const sy = s * axis.y;
    const sz = s * axis.z;
    this.m00 = t * axis.x * axis.x + c;
    this.m10 = txy + sz;
    this.m20 = txz - sy;
    this.m01 = txy - sz;
    this.m11 = t * axis.y * axis.y + c;
    this.m21 = tyz + sx;
    this.m02 = txz + sy;
    this.m12 = tyz - sx;
    this.m22 = t * axis.z * axis.z + c;
    return this;
  }

  /**
   * Sets the matrix to a rotation described by a quaternion.
   * @param quaternion The quaternion describing the rotation.
   * @returns This instance.
   */
  setQuaternion(quaternion: Readonly<Quaternion>): this {
    const x2 = quaternion.x + quaternion.x;
    const y2 = quaternion.y + quaternion.y;
    const z2 = quaternion.z + quaternion.z;
    const xx = quaternion.x * x2;
    const xy = quaternion.x * y2;
    const xz = quaternion.x * z2;
    const yy = quaternion.y * y2;
    const yz = quaternion.y * z2;
    const zz = quaternion.z * z2;
    const wx = quaternion.w * x2;
    const wy = quaternion.w * y2;
    const wz = quaternion.w * z2;

    this.m00 = 1.0 - (yy + zz);
    this.m01 = xy - wz;
    this.m02 = xz + wy;

    this.m10 = xy + wz;
    this.m11 = 1.0 - (xx + zz);
    this.m12 = yz - wx;

    this.m20 = xz - wy;
    this.m21 = yz + wx;
    this.m22 = 1.0 - (xx + yy);
    return this;
  }

  /**
   * Normalizes the matrix.
   * @returns This instance.
   */
  normalize(): this {
    const x = new Matrix3();

    x.m00 = this.m00;
    x.m10 = this.m01;
    x.m20 = this.m02;
    x.m01 = this.m10;
    x.m11 = this.m11;
    x.m21 = this.m12;
    x.m02 = this.m20;
    x.m12 = this.m21;
    x.m22 = this.m22;
    x.multiplyL(this);

    x.m00 = (3.0 - x.m00) / 2.0;
    x.m10 = -x.m10 / 2.0;
    x.m20 = -x.m20 / 2.0;
    x.m01 = -x.m01 / 2.0;
    x.m11 = (3.0 - x.m11) / 2.0;
    x.m21 = -x.m21 / 2.0;
    x.m02 = -x.m02 / 2.0;
    x.m12 = -x.m12 / 2.0;
    x.m22 = (3.0 - x.m22) / 2.0;
    this.multiplyL(x);
    return this;
  }

  /**
   * Inverts the matrix.
   * @returns This instance.
   */
  invert(): this {
    let buff;

    buff = this.m01;
    this.m01 = this.m10;
    this.m10 = buff;
    buff = this.m02;
    this.m02 = this.m20;
    this.m20 = buff;
    buff = this.m12;
    this.m12 = this.m21;
    this.m21 = buff;
    return this;
  }

  /**
   * Multiply with another matrix from the right.
   * @param matrix The matrix to multiply with.
   * @returns This instance.
   */
  multiplyR(matrix: Readonly<Matrix3>): this {
    const z11 = matrix.m00 * this.m00 + matrix.m01 * this.m10 + matrix.m02 * this.m20;
    const z21 = matrix.m10 * this.m00 + matrix.m11 * this.m10 + matrix.m12 * this.m20;
    const z31 = matrix.m20 * this.m00 + matrix.m21 * this.m10 + matrix.m22 * this.m20;
    const z12 = matrix.m00 * this.m01 + matrix.m01 * this.m11 + matrix.m02 * this.m21;
    const z22 = matrix.m10 * this.m01 + matrix.m11 * this.m11 + matrix.m12 * this.m21;
    const z32 = matrix.m20 * this.m01 + matrix.m21 * this.m11 + matrix.m22 * this.m21;
    const z13 = matrix.m00 * this.m02 + matrix.m01 * this.m12 + matrix.m02 * this.m22;
    const z23 = matrix.m10 * this.m02 + matrix.m11 * this.m12 + matrix.m12 * this.m22;
    const z33 = matrix.m20 * this.m02 + matrix.m21 * this.m12 + matrix.m22 * this.m22;
    this.m00 = z11;
    this.m10 = z21;
    this.m20 = z31;
    this.m01 = z12;
    this.m11 = z22;
    this.m21 = z32;
    this.m02 = z13;
    this.m12 = z23;
    this.m22 = z33;
    return this;
  }

  /**
   * Inversely multiply with another matrix from the right.
   * @param matrix The matrix to multiply with.
   * @returns This instance.
   */
  multiplyInverseR(matrix: Readonly<Matrix3>): this {
    const z11 = matrix.m00 * this.m00 + matrix.m10 * this.m10 + matrix.m20 * this.m20;
    const z21 = matrix.m01 * this.m00 + matrix.m11 * this.m10 + matrix.m21 * this.m20;
    const z31 = matrix.m02 * this.m00 + matrix.m12 * this.m10 + matrix.m22 * this.m20;
    const z12 = matrix.m00 * this.m01 + matrix.m10 * this.m11 + matrix.m20 * this.m21;
    const z22 = matrix.m01 * this.m01 + matrix.m11 * this.m11 + matrix.m21 * this.m21;
    const z32 = matrix.m02 * this.m01 + matrix.m12 * this.m11 + matrix.m22 * this.m21;
    const z13 = matrix.m00 * this.m02 + matrix.m10 * this.m12 + matrix.m20 * this.m22;
    const z23 = matrix.m01 * this.m02 + matrix.m11 * this.m12 + matrix.m21 * this.m22;
    const z33 = matrix.m02 * this.m02 + matrix.m12 * this.m12 + matrix.m22 * this.m22;
    this.m00 = z11;
    this.m10 = z21;
    this.m20 = z31;
    this.m01 = z12;
    this.m11 = z22;
    this.m21 = z32;
    this.m02 = z13;
    this.m12 = z23;
    this.m22 = z33;
    return this;
  }

  /**
   * Multiply with another matrix from the left.
   * @param matrix The matrix to multiply with.
   * @returns This instance.
   */
  multiplyL(matrix: Readonly<Matrix3>): this {
    const z11 = this.m00 * matrix.m00 + this.m01 * matrix.m10 + this.m02 * matrix.m20;
    const z21 = this.m10 * matrix.m00 + this.m11 * matrix.m10 + this.m12 * matrix.m20;
    const z31 = this.m20 * matrix.m00 + this.m21 * matrix.m10 + this.m22 * matrix.m20;
    const z12 = this.m00 * matrix.m01 + this.m01 * matrix.m11 + this.m02 * matrix.m21;
    const z22 = this.m10 * matrix.m01 + this.m11 * matrix.m11 + this.m12 * matrix.m21;
    const z32 = this.m20 * matrix.m01 + this.m21 * matrix.m11 + this.m22 * matrix.m21;
    const z13 = this.m00 * matrix.m02 + this.m01 * matrix.m12 + this.m02 * matrix.m22;
    const z23 = this.m10 * matrix.m02 + this.m11 * matrix.m12 + this.m12 * matrix.m22;
    const z33 = this.m20 * matrix.m02 + this.m21 * matrix.m12 + this.m22 * matrix.m22;
    this.m00 = z11;
    this.m10 = z21;
    this.m20 = z31;
    this.m01 = z12;
    this.m11 = z22;
    this.m21 = z32;
    this.m02 = z13;
    this.m12 = z23;
    this.m22 = z33;
    return this;
  }

  /**
   * Inversely multiply with another matrix from the right.
   * @param matrix The matrix to multiply with.
   * @returns This instance.
   */
  multiplyInverseL(matrix: Readonly<Matrix3>): this {
    const z11 = this.m00 * matrix.m00 + this.m01 * matrix.m01 + this.m02 * matrix.m02;
    const z21 = this.m10 * matrix.m00 + this.m11 * matrix.m01 + this.m12 * matrix.m02;
    const z31 = this.m20 * matrix.m00 + this.m21 * matrix.m01 + this.m22 * matrix.m02;
    const z12 = this.m00 * matrix.m10 + this.m01 * matrix.m11 + this.m02 * matrix.m12;
    const z22 = this.m10 * matrix.m10 + this.m11 * matrix.m11 + this.m12 * matrix.m12;
    const z32 = this.m20 * matrix.m10 + this.m21 * matrix.m11 + this.m22 * matrix.m12;
    const z13 = this.m00 * matrix.m20 + this.m01 * matrix.m21 + this.m02 * matrix.m22;
    const z23 = this.m10 * matrix.m20 + this.m11 * matrix.m21 + this.m12 * matrix.m22;
    const z33 = this.m20 * matrix.m20 + this.m21 * matrix.m21 + this.m22 * matrix.m22;
    this.m00 = z11;
    this.m10 = z21;
    this.m20 = z31;
    this.m01 = z12;
    this.m11 = z22;
    this.m21 = z32;
    this.m02 = z13;
    this.m12 = z23;
    this.m22 = z33;
    return this;
  }

  /**
   * Sets this matrix up as a transformation matrix to look in a given direction.
   * @param direction The direction to look in.
   * @param upVector The vector indicating the up direction. If not provided
   * a best effort is made to find a good one.
   * @returns This instance.
   */
  lookAt(direction: Readonly<Vector3>, upVector?: Readonly<Vector3>): this {
    const right = new Vector3(this.m00, this.m01, this.m02);
    const up = new Vector3(this.m10, this.m11, this.m12);
    const forward = new Vector3(this.m20, this.m21, this.m22);

    forward.set(direction).normalize();

    // Select positive y axis or positive z alternatively as up-vector
    let lookUp = upVector;
    if (!lookUp) {
      lookUp = new Vector3();
      if (Math.abs(forward.y) > 0.8) {
        lookUp.setXYZ(0.0, 0.0, 1.0);
      } else {
        lookUp.setXYZ(0.0, 1.0, 0.0);
      }
    }

    right.set(forward).cross(lookUp).normalize();
    up.set(right).cross(forward).normalize();

    this.setM(right.x, right.y, right.z, up.x, up.y, up.z, forward.x, forward.y, forward.z);

    return this;
  }

  /**
   * Return the components of this matrix as an array.
   * @returns The components of this matrix as an array.
   */
  asArray(): [number, number, number, number, number, number, number, number, number] {
    return [
      this.m00,
      this.m01,
      this.m02,
      this.m10,
      this.m11,
      this.m12,
      this.m20,
      this.m21,
      this.m22,
    ];
  }
}
