[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / Vector2

# Class: Vector2

A vector with 2 components, labeled: `X`, `Y`.

## Constructors

### constructor

• **new Vector2**(`x`, `y`): [`Vector2`](Vector2.md)

Constructs a new [Vector2](Vector2.md).

#### Parameters

| Name | Type     | Description      |
| :--- | :------- | :--------------- |
| `x`  | `number` | The X component. |
| `y`  | `number` | The Y component. |

#### Returns

[`Vector2`](Vector2.md)

#### Defined in

[math/vector2.ts:20](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L20)

## Properties

### x

• **x**: `number`

The X component of the vector.

#### Defined in

[math/vector2.ts:8](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L8)

---

### y

• **y**: `number`

The Y component of the vector.

#### Defined in

[math/vector2.ts:13](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L13)

## Methods

### add

▸ **add**(`vector`): [`Vector2`](Vector2.md)

Adds another vector to this vector.

#### Parameters

| Name     | Type                    | Description                       |
| :------- | :---------------------- | :-------------------------------- |
| `vector` | [`Vector2`](Vector2.md) | The vector to add to this vector. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:51](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L51)

---

### addMultiply

▸ **addMultiply**(`vector`, `scale`): [`Vector2`](Vector2.md)

Scales another vector and adds it to this vector.

#### Parameters

| Name     | Type                    | Description                               |
| :------- | :---------------------- | :---------------------------------------- |
| `vector` | [`Vector2`](Vector2.md) | The vector to add to this vector.         |
| `scale`  | `number`                | The scaling to apply to the input vector. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:73](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L73)

---

### addMultiplyXY

▸ **addMultiplyXY**(`x`, `y`, `scale`): [`Vector2`](Vector2.md)

Scales another vector and adds it to this vector.

#### Parameters

| Name    | Type     | Description                               |
| :------ | :------- | :---------------------------------------- |
| `x`     | `number` | The value to add to the X component.      |
| `y`     | `number` | The value to add to the Y component.      |
| `scale` | `number` | The scaling to apply to the input vector. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:84](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L84)

---

### addXY

▸ **addXY**(`x`, `y`): [`Vector2`](Vector2.md)

Adds another vector to this vector.

#### Parameters

| Name | Type     | Description                          |
| :--- | :------- | :----------------------------------- |
| `x`  | `number` | The value to add to the X component. |
| `y`  | `number` | The value to add to the Y component. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:61](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L61)

---

### clamp

▸ **clamp**(`floor`, `ceil`): [`Vector2`](Vector2.md)

Clamps the components of the vector at the given boundary.

#### Parameters

| Name    | Type     | Description                 |
| :------ | :------- | :-------------------------- |
| `floor` | `number` | The lowest value to allow.  |
| `ceil`  | `number` | The largest value to allow. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:201](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L201)

---

### compare

▸ **compare**(`vector`): `boolean`

Compares two vectors.

#### Parameters

| Name     | Type                                  | Description                           |
| :------- | :------------------------------------ | :------------------------------------ |
| `vector` | `Readonly`\<[`Vector2`](Vector2.md)\> | The vector to compare this vector to. |

#### Returns

`boolean`

`true` if the vectors are idently, `false` otherwise.

#### Defined in

[math/vector2.ts:247](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L247)

---

### divide

▸ **divide**(`vector`): [`Vector2`](Vector2.md)

Divides this vector by another vector.

#### Parameters

| Name     | Type                    | Description                            |
| :------- | :---------------------- | :------------------------------------- |
| `vector` | [`Vector2`](Vector2.md) | The vector to divide this vector with. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:148](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L148)

---

### divideScale

▸ **divideScale**(`scale`): [`Vector2`](Vector2.md)

Divides the vector by the given scale.

#### Parameters

| Name    | Type     | Description                         |
| :------ | :------- | :---------------------------------- |
| `scale` | `number` | The scaling to apply to the vector. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:169](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L169)

---

### divideXY

▸ **divideXY**(`x`, `y`): [`Vector2`](Vector2.md)

Divides this vector by another vector.

#### Parameters

| Name | Type     | Description                               |
| :--- | :------- | :---------------------------------------- |
| `x`  | `number` | The value to divide the X component with. |
| `y`  | `number` | The value to divide the Y component with. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:158](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L158)

---

### dot

▸ **dot**(`vector`): `number`

Returns the dot product between two vectors.

#### Parameters

| Name     | Type                    | Description       |
| :------- | :---------------------- | :---------------- |
| `vector` | [`Vector2`](Vector2.md) | The other vector. |

#### Returns

`number`

The dot product between the two vectors.

#### Defined in

[math/vector2.ts:269](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L269)

---

### dotXY

▸ **dotXY**(`x`, `y`): `number`

Returns the dot product between two vectors.

#### Parameters

| Name | Type     | Description                          |
| :--- | :------- | :----------------------------------- |
| `x`  | `number` | The X component of the other vector. |
| `y`  | `number` | The Y component of the other vector. |

#### Returns

`number`

The dot product between the two vectors.

#### Defined in

[math/vector2.ts:279](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L279)

---

### invertAdd

▸ **invertAdd**(): [`Vector2`](Vector2.md)

Inverts the vector.

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:179](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L179)

---

### invertMultiply

▸ **invertMultiply**(): [`Vector2`](Vector2.md)

Inverts the vectors scale.

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:189](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L189)

---

### length

▸ **length**(): `number`

Calculates the length of the vector.

#### Returns

`number`

The length of the vector.

#### Defined in

[math/vector2.ts:221](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L221)

---

### lerp

▸ **lerp**(`vector`, `t`): [`Vector2`](Vector2.md)

Linearly moves this vector towards a target vector.

#### Parameters

| Name     | Type                                  | Description                                 |
| :------- | :------------------------------------ | :------------------------------------------ |
| `vector` | `Readonly`\<[`Vector2`](Vector2.md)\> | The target vector.                          |
| `t`      | `number`                              | The location on the scale, from `0` to `1`. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:257](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L257)

---

### multiply

▸ **multiply**(`vector`): [`Vector2`](Vector2.md)

Multiplies this vector by another vector.

#### Parameters

| Name     | Type                    | Description                              |
| :------- | :---------------------- | :--------------------------------------- |
| `vector` | [`Vector2`](Vector2.md) | The vector to multiply with this vector. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:116](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L116)

---

### multiplyScale

▸ **multiplyScale**(`scale`): [`Vector2`](Vector2.md)

Multiplies the vector by the given scale.

#### Parameters

| Name    | Type     | Description                         |
| :------ | :------- | :---------------------------------- |
| `scale` | `number` | The scaling to apply to the vector. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:137](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L137)

---

### multiplyXY

▸ **multiplyXY**(`x`, `y`): [`Vector2`](Vector2.md)

Multiplies this vector by another vector.

#### Parameters

| Name | Type     | Description                                 |
| :--- | :------- | :------------------------------------------ |
| `x`  | `number` | The value to multiply with the X component. |
| `y`  | `number` | The value to multiply with the Y component. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:126](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L126)

---

### normalize

▸ **normalize**(): [`Vector2`](Vector2.md)

Normalizes the vector.

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:229](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L229)

---

### set

▸ **set**(`vector`): [`Vector2`](Vector2.md)

Sets the vector to new coordinates.

#### Parameters

| Name     | Type                    | Description                           |
| :------- | :---------------------- | :------------------------------------ |
| `vector` | [`Vector2`](Vector2.md) | The coordinates to set the vector to. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:30](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L30)

---

### setXY

▸ **setXY**(`x`, `y`): [`Vector2`](Vector2.md)

Sets the vector to new coordinates.

#### Parameters

| Name | Type     | Description                         |
| :--- | :------- | :---------------------------------- |
| `x`  | `number` | The new X component for the vector. |
| `y`  | `number` | The new Y component for the vector. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:40](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L40)

---

### subtract

▸ **subtract**(`vector`): [`Vector2`](Vector2.md)

Subtracts another vector to this vector.

#### Parameters

| Name     | Type                    | Description                              |
| :------- | :---------------------- | :--------------------------------------- |
| `vector` | [`Vector2`](Vector2.md) | The vector to subtract from this vector. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:95](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L95)

---

### subtractXY

▸ **subtractXY**(`x`, `y`): [`Vector2`](Vector2.md)

Subtracts another vector to this vector.

#### Parameters

| Name | Type     | Description                                 |
| :--- | :------- | :------------------------------------------ |
| `x`  | `number` | The value to subtract from the X component. |
| `y`  | `number` | The value to subtract from the Y component. |

#### Returns

[`Vector2`](Vector2.md)

This instance.

#### Defined in

[math/vector2.ts:105](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector2.ts#L105)
