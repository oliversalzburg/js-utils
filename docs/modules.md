[@oliversalzburg/js-utils](README.md) / Exports

# @oliversalzburg/js-utils

## Classes

-   [AbstractError](classes/AbstractError.md)
-   [InternalError](classes/InternalError.md)
-   [InvalidArgumentError](classes/InvalidArgumentError.md)
-   [InvalidOperationError](classes/InvalidOperationError.md)
-   [NotImplementedError](classes/NotImplementedError.md)
-   [PermissionViolationError](classes/PermissionViolationError.md)
-   [RandomHelper](classes/RandomHelper.md)
-   [ResourceConflictError](classes/ResourceConflictError.md)
-   [UnexpectedNilError](classes/UnexpectedNilError.md)
-   [UnknownError](classes/UnknownError.md)
-   [Vector2](classes/Vector2.md)
-   [Vector3](classes/Vector3.md)

## Type Aliases

### Maybe

Ƭ **Maybe**\<`T`\>: `T` \| [`Nil`](modules.md#nil)

A type that could be either what you want, or `Nil`.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[nil.ts:12](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/nil.ts#L12)

---

### Nil

Ƭ **Nil**: `null` \| `undefined`

When you want to normalize away `null` | `undefined`, or deal
with either type through a consistent interface.

#### Defined in

[nil.ts:7](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/nil.ts#L7)

---

### SerializedError

Ƭ **SerializedError**: `Record`\<`string`, `Record`\<`string`, `string`\> \| `string` \| `undefined`\>

The shape of an `Error` instance, after it has been serialized into a simple hash.

#### Defined in

[error-serializer.ts:9](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/error-serializer.ts#L9)

## Variables

### TWO_PI

• `Const` **TWO_PI**: `number`

#### Defined in

[math/core.ts:1](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/math/core.ts#L1)

## Functions

### Isqrt

▸ **Isqrt**(`value`): `number`

Finds the integer square root of a positive number.

#### Parameters

| Name    | Type     | Description                                |
| :------ | :------- | :----------------------------------------- |
| `value` | `number` | The value to calcuate the square root for. |

#### Returns

`number`

The square root for the given value.

#### Defined in

[math/core.ts:58](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/math/core.ts#L58)

---

### cosDeg

▸ **cosDeg**(`value`): `number`

Calculates the cosine for a given degree value.

#### Parameters

| Name    | Type     | Description                                       |
| :------ | :------- | :------------------------------------------------ |
| `value` | `number` | The value in degrees to calculate the cosine for. |

#### Returns

`number`

The cosine for the given value.

#### Defined in

[math/core.ts:35](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/math/core.ts#L35)

---

### deg2rad

▸ **deg2rad**(`degrees`): `number`

Converts the degrees to radians.

#### Parameters

| Name      | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `degrees` | `number` | The degrees to convert to radians. |

#### Returns

`number`

The degrees in radians.

#### Defined in

[math/core.ts:8](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/math/core.ts#L8)

---

### difference

▸ **difference**\<`T`\>(`a`, `b`): `T`[]

Returns an array that holds all items that only appear in `a`.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type  | Description       |
| :--- | :---- | :---------------- |
| `a`  | `T`[] | The first array.  |
| `b`  | `T`[] | The second array. |

#### Returns

`T`[]

A new array which holds the items that ony appear
in `a`.

#### Defined in

[array.ts:38](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/array.ts#L38)

---

### distance

▸ **distance**(`x1`, `y1`, `x2`, `y2`): `number`

Calculates the distance between two vectors.

#### Parameters

| Name | Type     | Description                           |
| :--- | :------- | :------------------------------------ |
| `x1` | `number` | The X component of the first vector.  |
| `y1` | `number` | The Y comoinent of the first vector.  |
| `x2` | `number` | The X component of the second vector. |
| `y2` | `number` | The Y component of the second vector. |

#### Returns

`number`

The distance between the two vectors.

#### Defined in

[math/core.ts:47](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/math/core.ts#L47)

---

### errorToJSON

▸ **errorToJSON**(`error`): `string`

Serializes an error into a JSON string.

#### Parameters

| Name    | Type    | Description             |
| :------ | :------ | :---------------------- |
| `error` | `Error` | The error to stringify. |

#### Returns

`string`

A JSON string representing the error.

#### Defined in

[error-serializer.ts:44](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/error-serializer.ts#L44)

---

### errorToRecord

▸ **errorToRecord**(`error`): `Record`\<`string`, `unknown`\>

Converts an error into a regular hash.

#### Parameters

| Name    | Type    | Description           |
| :------ | :------ | :-------------------- |
| `error` | `Error` | The error to convert. |

#### Returns

`Record`\<`string`, `unknown`\>

A new object that contains all the properties of the error.

#### Defined in

[error-serializer.ts:53](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/error-serializer.ts#L53)

---

### errorToSimpleSerializable

▸ **errorToSimpleSerializable**\<`TError`\>(`error`): [`SerializedError`](modules.md#serializederror)

Serializes an error into a simpler shape.

#### Type parameters

| Name     | Type                                                                                              |
| :------- | :------------------------------------------------------------------------------------------------ |
| `TError` | extends [`AbstractError`](classes/AbstractError.md) = [`AbstractError`](classes/AbstractError.md) |

#### Parameters

| Name    | Type     | Description             |
| :------ | :------- | :---------------------- |
| `error` | `TError` | The error to serialize. |

#### Returns

[`SerializedError`](modules.md#serializederror)

A simple representation of the error.

#### Defined in

[error-serializer.ts:66](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/error-serializer.ts#L66)

---

### filterType

▸ **filterType**\<`T`\>(`array`, `InstanceType`): `T`[]

From an array with unknown contents, retrieve all the elements
that are of a certain type and return them as a new array.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name           | Type                   | Description             |
| :------------- | :--------------------- | :---------------------- |
| `array`        | `unknown`[]            | The array to filter.    |
| `InstanceType` | `ConstructorOf`\<`T`\> | The type to search for. |

#### Returns

`T`[]

A new array with the filtered items.

#### Defined in

[array.ts:49](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/array.ts#L49)

---

### formatString

▸ **formatString**(`string`, `...formatArguments`): `string`

Formats a given input string with numeric placeholders.

#### Parameters

| Name                 | Type       | Description                                         |
| :------------------- | :--------- | :-------------------------------------------------- |
| `string`             | `string`   | The input string with placeholders.                 |
| `...formatArguments` | `string`[] | An array of strings to place into the placeholders. |

#### Returns

`string`

The formatted string.

**`Example`**

```ts
// returns "Hello World"
formatString("{0} {1}", ["Hello", "World"]);
```

#### Defined in

[string-formatter.ts:10](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/string-formatter.ts#L10)

---

### formatStringTemplate

▸ **formatStringTemplate**(`string`, `parameters`): `string`

Formats a given input string with alphanumeric placeholders.

#### Parameters

| Name         | Type                                          | Description                                        |
| :----------- | :-------------------------------------------- | :------------------------------------------------- |
| `string`     | `string`                                      | The input string with placeholders.                |
| `parameters` | `Record`\<`string`, `undefined` \| `string`\> | A hash of parameters to place in the placeholders. |

#### Returns

`string`

The formatted string.

**`Example`**

```ts
// returns "Hello World"
formatString("{first} {second}", { first: "Hello", second: "World" });
```

#### Defined in

[string-formatter.ts:25](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/string-formatter.ts#L25)

---

### intersect

▸ **intersect**\<`T`\>(`a`, `b`): `T`[]

Returns an array that holds all items that appear in both
passed arrays.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type  | Description       |
| :--- | :---- | :---------------- |
| `a`  | `T`[] | The first array.  |
| `b`  | `T`[] | The second array. |

#### Returns

`T`[]

A new array which holds the items that appear in
both passed arrays.

#### Defined in

[array.ts:27](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/array.ts#L27)

---

### is

▸ **is**\<`T`\>(`nilable`, `InstanceType`): nilable is T

Check if something is a concrete value of the given type.
Can be used as a typeguard.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name           | Type                               | Description                    |
| :------------- | :--------------------------------- | :----------------------------- |
| `nilable`      | [`Maybe`](modules.md#maybe)\<`T`\> | The subject that could be nil. |
| `InstanceType` | `ConstructorOf`\<`T`\>             | The type to check against.     |

#### Returns

nilable is T

`true` if the input element matches the given type,
`false` otherwise.

#### Defined in

[nil.ts:32](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/nil.ts#L32)

---

### isError

▸ **isError**(`subject`): subject is Error

Determine if the given unknown subject is an `Error` instance.

#### Parameters

| Name      | Type      | Description            |
| :-------- | :-------- | :--------------------- |
| `subject` | `unknown` | The object to inspect. |

#### Returns

subject is Error

`true` if the subject is an `Error`, `false` otherwise.

#### Defined in

[error-serializer.ts:16](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/error-serializer.ts#L16)

---

### isInteger

▸ **isInteger**(`value`): `boolean`

Checks whether a number is an integer.

#### Parameters

| Name    | Type     | Description         |
| :------ | :------- | :------------------ |
| `value` | `number` | The value to check. |

#### Returns

`boolean`

`true` when the value is an integer, `false` otherwise.

#### Defined in

[math/core.ts:76](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/math/core.ts#L76)

---

### isNil

▸ **isNil**\<`T`\>(`subject`): subject is Nil

Check if something is nil.
Can be used as a typeguard.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name      | Type                               | Description                    |
| :-------- | :--------------------------------- | :----------------------------- |
| `subject` | [`Maybe`](modules.md#maybe)\<`T`\> | The subject that could be nil. |

#### Returns

subject is Nil

`true` if the subject is nil, `false` otherwise.

#### Defined in

[nil.ts:20](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/nil.ts#L20)

---

### mustExist

▸ **mustExist**\<`T`\>(`subject`): `T`

Ensure that the passed subject is not nil; throw otherwise.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name      | Type                               | Description                     |
| :-------- | :--------------------------------- | :------------------------------ |
| `subject` | [`Maybe`](modules.md#maybe)\<`T`\> | A subject that is possible nil. |

#### Returns

`T`

The subject, if it isn't nil.

**`Throws`**

When the subject is nil.

#### Defined in

[nil.ts:55](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/nil.ts#L55)

---

### rad2deg

▸ **rad2deg**(`radians`): `number`

Convertrs the radians to degrees.

#### Parameters

| Name      | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `radians` | `number` | The radians to convert to degrees. |

#### Returns

`number`

The radians as degrees.

#### Defined in

[math/core.ts:17](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/math/core.ts#L17)

---

### randomRange

▸ **randomRange**(`min`, `max`): `number`

Returns a random value in a given range.
Uses the JS-internal `Math.random()`. Use {MathHelper} for a PRNG with more features.

#### Parameters

| Name  | Type     | Description      |
| :---- | :------- | :--------------- |
| `min` | `number` | The lower bound. |
| `max` | `number` | The upper bound. |

#### Returns

`number`

A random value between the lower and upper bound.

#### Defined in

[random.ts:177](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/random.ts#L177)

---

### seedFromString

▸ **seedFromString**(`input`): `number`

Generates a numberic seed, to be used as an input for a PRNG,
from a string.

#### Parameters

| Name    | Type     | Description                  |
| :------ | :------- | :--------------------------- |
| `input` | `string` | The string to use as a seed. |

#### Returns

`number`

A numeric seed value for a PRNG.

#### Defined in

[random.ts:187](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/random.ts#L187)

---

### shuffleArray

▸ **shuffleArray**\<`T`\>(`array`): `T`[]

Places the items in the array in random order.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type  | Description           |
| :------ | :---- | :-------------------- |
| `array` | `T`[] | The array to shuffle. |

#### Returns

`T`[]

The passed array in random order.

#### Defined in

[array.ts:9](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/array.ts#L9)

---

### sinDeg

▸ **sinDeg**(`value`): `number`

Calculates the sine for a given degree value.

#### Parameters

| Name    | Type     | Description                                     |
| :------ | :------- | :---------------------------------------------- |
| `value` | `number` | The value in degrees to calculate the sine for. |

#### Returns

`number`

The sine for the given value.

#### Defined in

[math/core.ts:26](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/math/core.ts#L26)

---

### sleep

▸ **sleep**(`duration`): `Promise`\<`void`\>

Wait a given period before continuing execution.

#### Parameters

| Name       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `duration` | `number` | How many milliseconds to wait. |

#### Returns

`Promise`\<`void`\>

Nothing

#### Defined in

[sleep.ts:6](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/sleep.ts#L6)

---

### unknownToError

▸ **unknownToError**(`subject`): [`AbstractError`](classes/AbstractError.md)

Returns an `AbstractError` that best represents the passed subject.
If the passed subject is already an `AbstractError`, it is returned as-is.
Otherwise, it will be converted into an appropriate error type.

#### Parameters

| Name      | Type      | Description            |
| :-------- | :-------- | :--------------------- |
| `subject` | `unknown` | The subject to inspect |

#### Returns

[`AbstractError`](classes/AbstractError.md)

An `AbstractError` instance.

#### Defined in

[error-serializer.ts:27](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/error-serializer.ts#L27)
