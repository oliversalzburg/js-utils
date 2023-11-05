[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / RandomHelper

# Class: RandomHelper

Helps with generating random numbers.

## Constructors

### constructor

• **new RandomHelper**(`seed?`): [`RandomHelper`](RandomHelper.md)

Creates a pseudo-random value generator. The seed must be an integer.

Uses an optimized version of the Park-Miller PRNG.
http://www.firstpr.com.au/dsp/rand31/

#### Parameters

| Name   | Type     | Default value | Description                               |
| :----- | :------- | :------------ | :---------------------------------------- |
| `seed` | `number` | `0`           | The seed for the random number generator. |

#### Returns

[`RandomHelper`](RandomHelper.md)

#### Defined in

[random.ts:20](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/random.ts#L20)

## Methods

### next

▸ **next**(): `number`

Returns a pseudo-random value between 1 and 2^32 - 2.

#### Returns

`number`

A pseudo-random value between 1 and 2^32 - 2.

#### Defined in

[random.ts:81](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/random.ts#L81)

---

### nextBoolean

▸ **nextBoolean**(): `boolean`

Returns either `true` or `false`.

#### Returns

`boolean`

Either `true` or `false`.

#### Defined in

[random.ts:89](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/random.ts#L89)

---

### nextFloat

▸ **nextFloat**(): `number`

Returns a pseudo-random floating point number in range [0, 1).

#### Returns

`number`

a pseudo-random floating point number in range [0, 1).

#### Defined in

[random.ts:97](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/random.ts#L97)

---

### simplex2

▸ **simplex2**(`xin`, `yin`): `number`

Returns a 2D simplex noise value for a given input coordinate.

#### Parameters

| Name  | Type     | Description             |
| :---- | :------- | :---------------------- |
| `xin` | `number` | The X input coordinate. |
| `yin` | `number` | The Y input coordinate. |

#### Returns

`number`

The noise value for the input coordinates.

#### Defined in

[random.ts:108](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/random.ts#L108)
