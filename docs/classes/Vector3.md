[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / Vector3

# Class: Vector3

A vector with 3 components.

## Hierarchy

-   [`Vector2`](Vector2.md)

    ↳ **`Vector3`**

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

#### Overrides

[Vector2](Vector2.md).[constructor](Vector2.md#constructor)

#### Defined in

[math/vector.ts:51](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/vector.ts#L51)

## Properties

### x

• **x**: `number`

The X component of the vector.

#### Inherited from

[Vector2](Vector2.md).[x](Vector2.md#x)

#### Defined in

[math/vector.ts:8](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/vector.ts#L8)

---

### y

• **y**: `number`

The Y component of the vector.

#### Inherited from

[Vector2](Vector2.md).[y](Vector2.md#y)

#### Defined in

[math/vector.ts:13](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/vector.ts#L13)

---

### z

• **z**: `number`

The Z component of the vector.

#### Defined in

[math/vector.ts:43](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/vector.ts#L43)

## Methods

### dot2

▸ **dot2**(`x`, `y`): `number`

Returns the dot product between the two vectors.

#### Parameters

| Name | Type     | Description                          |
| :--- | :------- | :----------------------------------- |
| `x`  | `number` | The X component of the other vector. |
| `y`  | `number` | The Y component of the other vector. |

#### Returns

`number`

The dot product between the two vectors.

#### Inherited from

[Vector2](Vector2.md).[dot2](Vector2.md#dot2)

#### Defined in

[math/vector.ts:31](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/vector.ts#L31)
