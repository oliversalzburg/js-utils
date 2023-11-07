[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / Vector3

# Class: Vector3

A vector with 3 components.

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

math/vector3.ts:26

## Properties

### x

• **x**: `number`

The X component of the vector.

#### Defined in

math/vector3.ts:8

---

### y

• **y**: `number`

The Y component of the vector.

#### Defined in

math/vector3.ts:13

---

### z

• **z**: `number`

The Z component of the vector.

#### Defined in

math/vector3.ts:18

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

math/vector3.ts:37

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

math/vector3.ts:48
