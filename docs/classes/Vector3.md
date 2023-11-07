[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / Vector3

# Class: Vector3

A vector with 3 components, labeled: `X`, `Y`, `Z`.

## Constructors

### constructor

• **new Vector3**(`x`, `y`, `z`): [`Vector3`](Vector3.md)

Constructs a new [Vector3](Vector3.md).

#### Parameters

| Name | Type     | Description      |
| :--- | :------- | :--------------- |
| `x`  | `number` | The X component. |
| `y`  | `number` | The Y component. |
| `z`  | `number` | The Z component. |

#### Returns

[`Vector3`](Vector3.md)

#### Defined in

[math/vector3.ts:26](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector3.ts#L26)

## Properties

### x

• **x**: `number`

The X component of the vector.

#### Defined in

[math/vector3.ts:8](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector3.ts#L8)

---

### y

• **y**: `number`

The Y component of the vector.

#### Defined in

[math/vector3.ts:13](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector3.ts#L13)

---

### z

• **z**: `number`

The Z component of the vector.

#### Defined in

[math/vector3.ts:18](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector3.ts#L18)

## Methods

### dot

▸ **dot**(`vector`): `number`

Returns the dot product between two vectors.

#### Parameters

| Name     | Type                    | Description       |
| :------- | :---------------------- | :---------------- |
| `vector` | [`Vector3`](Vector3.md) | The other vector. |

#### Returns

`number`

The dot product between the two vectors.

#### Defined in

[math/vector3.ts:49](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector3.ts#L49)

---

### dotXYZ

▸ **dotXYZ**(`x`, `y`, `z`): `number`

Returns the dot product between two vectors.

#### Parameters

| Name | Type     | Description                          |
| :--- | :------- | :----------------------------------- |
| `x`  | `number` | The X component of the other vector. |
| `y`  | `number` | The Y component of the other vector. |
| `z`  | `number` | The Z component of the other vector. |

#### Returns

`number`

The dot product between the two vectors.

#### Defined in

[math/vector3.ts:60](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector3.ts#L60)

---

### setXYZ

▸ **setXYZ**(`x`, `y`, `z`): `void`

Sets the vector to new coordinates.

#### Parameters

| Name | Type     | Description                         |
| :--- | :------- | :---------------------------------- |
| `x`  | `number` | The new X component for the vector. |
| `y`  | `number` | The new Y component for the vector. |
| `z`  | `number` | The new Z component for the vector. |

#### Returns

`void`

#### Defined in

[math/vector3.ts:38](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/math/vector3.ts#L38)
