[@oliversalzburg/js-utils](README.md) / Exports

# @oliversalzburg/js-utils

## Classes

-   [AbstractError](classes/AbstractError.md)
-   [InternalError](classes/InternalError.md)
-   [InvalidArgumentError](classes/InvalidArgumentError.md)
-   [InvalidOperationError](classes/InvalidOperationError.md)
-   [NotImplementedError](classes/NotImplementedError.md)
-   [PermissionViolationError](classes/PermissionViolationError.md)
-   [ResourceConflictError](classes/ResourceConflictError.md)
-   [UnexpectedNilError](classes/UnexpectedNilError.md)
-   [UnknownError](classes/UnknownError.md)

## Type Aliases

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| [`Nil`](modules.md#nil)

A type that could be either what you want, or `Nil`.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[nil.ts:12](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/nil.ts#L12)

---

### Nil

Ƭ **Nil**: `null` \| `undefined`

When you want to normalize away `null` | `undefined`, or deal
with either type through a consistent interface.

#### Defined in

[nil.ts:7](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/nil.ts#L7)

---

### SerializedError

Ƭ **SerializedError**: `Record`<`string`, `Record`<`string`, `string`\> \| `string` \| `undefined`\>

The shape of an `Error` instance, after it has been serialized into a simple hash.

#### Defined in

[error-serializer.ts:9](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/error-serializer.ts#L9)

## Functions

### difference

▸ **difference**<`T`\>(`a`, `b`): `T`[]

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

[array.ts:38](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/array.ts#L38)

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

[error-serializer.ts:44](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/error-serializer.ts#L44)

---

### errorToRecord

▸ **errorToRecord**(`error`): `Record`<`string`, `unknown`\>

Converts an error into a regular hash.

#### Parameters

| Name    | Type    | Description           |
| :------ | :------ | :-------------------- |
| `error` | `Error` | The error to convert. |

#### Returns

`Record`<`string`, `unknown`\>

A new object that contains all the properties of the error.

#### Defined in

[error-serializer.ts:53](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/error-serializer.ts#L53)

---

### errorToSimpleSerializable

▸ **errorToSimpleSerializable**<`TError`\>(`error`): [`SerializedError`](modules.md#serializederror)

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

[error-serializer.ts:66](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/error-serializer.ts#L66)

---

### filterType

▸ **filterType**<`T`\>(`array`, `InstanceType`): `T`[]

From an array with unknown contents, retrieve all the elements
that are of a certain type and return them as a new array.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name           | Type                  | Description             |
| :------------- | :-------------------- | :---------------------- |
| `array`        | `unknown`[]           | The array to filter.    |
| `InstanceType` | `ConstructorOf`<`T`\> | The type to search for. |

#### Returns

`T`[]

A new array with the filtered items.

#### Defined in

[array.ts:49](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/array.ts#L49)

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

[string-formatter.ts:10](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/string-formatter.ts#L10)

---

### formatStringTemplate

▸ **formatStringTemplate**(`string`, `parameters`): `string`

Formats a given input string with alphanumeric placeholders.

#### Parameters

| Name         | Type                                         | Description                                        |
| :----------- | :------------------------------------------- | :------------------------------------------------- |
| `string`     | `string`                                     | The input string with placeholders.                |
| `parameters` | `Record`<`string`, `undefined` \| `string`\> | A hash of parameters to place in the placeholders. |

#### Returns

`string`

The formatted string.

**`Example`**

```ts
// returns "Hello World"
formatString("{first} {second}", { first: "Hello", second: "World" });
```

#### Defined in

[string-formatter.ts:25](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/string-formatter.ts#L25)

---

### intersect

▸ **intersect**<`T`\>(`a`, `b`): `T`[]

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

[array.ts:27](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/array.ts#L27)

---

### is

▸ **is**<`T`\>(`nilable`, `InstanceType`): nilable is T

Check if something is a concrete value of the given type.
Can be used as a typeguard.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name           | Type                              | Description                    |
| :------------- | :-------------------------------- | :----------------------------- |
| `nilable`      | [`Maybe`](modules.md#maybe)<`T`\> | The subject that could be nil. |
| `InstanceType` | `ConstructorOf`<`T`\>             | The type to check against.     |

#### Returns

nilable is T

`true` if the input element matches the given type,
`false` otherwise.

#### Defined in

[nil.ts:22](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/nil.ts#L22)

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

`true` if the subject is an `Error`, `false´ otherwise.

#### Defined in

[error-serializer.ts:16](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/error-serializer.ts#L16)

---

### isNil

▸ **isNil**<`T`\>(`subject`): subject is Nil

Check if something is nil.
Can be used as a typeguard.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name      | Type                              | Description                    |
| :-------- | :-------------------------------- | :----------------------------- |
| `subject` | [`Maybe`](modules.md#maybe)<`T`\> | The subject that could be nil. |

#### Returns

subject is Nil

`true` if the subject is nil, `false` otherwise.

#### Defined in

[nil.ts:32](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/nil.ts#L32)

---

### mustExist

▸ **mustExist**<`T`\>(`subject`): `T`

Ensure that the passed subject is not nil; throw otherwise.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name      | Type                              | Description                     |
| :-------- | :-------------------------------- | :------------------------------ |
| `subject` | [`Maybe`](modules.md#maybe)<`T`\> | A subject that is possible nil. |

#### Returns

`T`

The subject, if it isn't nil.

**`Throws`**

When the subject is nil.

#### Defined in

[nil.ts:51](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/nil.ts#L51)

---

### shuffleArray

▸ **shuffleArray**<`T`\>(`array`): `T`[]

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

[array.ts:9](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/array.ts#L9)

---

### sleep

▸ **sleep**(`duration`): `Promise`<`void`\>

Wait a given period before continuing execution.

#### Parameters

| Name       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `duration` | `number` | How many milliseconds to wait. |

#### Returns

`Promise`<`void`\>

Nothing

#### Defined in

[sleep.ts:6](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/sleep.ts#L6)

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

[error-serializer.ts:27](https://github.com/oliversalzburg/js-utils/blob/df89c53/source/error-serializer.ts#L27)
