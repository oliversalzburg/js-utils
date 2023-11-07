[@oliversalzburg/js-utils](README.md) / Exports

# @oliversalzburg/js-utils

## Classes

-   [AbstractError](classes/AbstractError.md)
-   [Canvas](classes/Canvas.md)
-   [InternalError](classes/InternalError.md)
-   [InvalidArgumentError](classes/InvalidArgumentError.md)
-   [InvalidOperationError](classes/InvalidOperationError.md)
-   [NotImplementedError](classes/NotImplementedError.md)
-   [PermissionViolationError](classes/PermissionViolationError.md)
-   [Random](classes/Random.md)
-   [RenderLoop](classes/RenderLoop.md)
-   [ResourceConflictError](classes/ResourceConflictError.md)
-   [UnexpectedNilError](classes/UnexpectedNilError.md)
-   [UnknownError](classes/UnknownError.md)
-   [Vector2](classes/Vector2.md)
-   [Vector3](classes/Vector3.md)

## Type Aliases

### AnyConstructor

Ƭ **AnyConstructor**: (...`args`: `any`[]) => `any`

#### Type declaration

• (`...args`): `any`

Any constructor

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Defined in

[core.ts:16](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/core.ts#L16)

---

### AnyFunction

Ƭ **AnyFunction**: (...`args`: `any`[]) => `any`

#### Type declaration

▸ (`...args`): `any`

Describes literally any function.

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Defined in

[core.ts:11](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/core.ts#L11)

---

### ConstructorOf

Ƭ **ConstructorOf**\<`T`\>: (...`args`: `any`[]) => `T`

#### Type parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `T`  | `Record`\<`string`, `unknown`\> |

#### Type declaration

• (`...args`): `T`

Describes a function that is a constructor for T.

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`T`

#### Defined in

[core.ts:6](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/core.ts#L6)

---

### FunctionReturning

Ƭ **FunctionReturning**\<`T`\>: (...`args`: `any`[]) => `T`

#### Type parameters

| Name | Type  |
| :--- | :---- |
| `T`  | `any` |

#### Type declaration

▸ (`...args`): `T`

Describes a function returning an instance of T.

##### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

##### Returns

`T`

#### Defined in

[core.ts:21](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/core.ts#L21)

---

### Maybe

Ƭ **Maybe**\<`T`\>: `T` \| [`Nil`](modules.md#nil)

A type that could be either what you want, or `Nil`.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[nil.ts:12](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/nil.ts#L12)

---

### Mixin

Ƭ **Mixin**\<`T`\>: `InstanceType`\<`ReturnType`\<`T`\>\>

Describes a class "mixin", which is a function that returns a dynamically
constructed class, based on the passed parameters.

#### Type parameters

| Name | Type                                                        |
| :--- | :---------------------------------------------------------- |
| `T`  | extends [`FunctionReturning`](modules.md#functionreturning) |

#### Defined in

[core.ts:27](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/core.ts#L27)

---

### Nil

Ƭ **Nil**: `null` \| `undefined`

When you want to normalize away `null` | `undefined`, or deal
with either type through a consistent interface.

#### Defined in

[nil.ts:7](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/nil.ts#L7)

---

### RenderLoopCallback

Ƭ **RenderLoopCallback**: (`delta`: `number`, `timestamp`: `number`) => `unknown`

#### Type declaration

▸ (`delta`, `timestamp`): `unknown`

The signature of a function that is called to draw a frame.

##### Parameters

| Name        | Type     |
| :---------- | :------- |
| `delta`     | `number` |
| `timestamp` | `number` |

##### Returns

`unknown`

#### Defined in

[graphics/render-loop.ts:6](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/render-loop.ts#L6)

---

### SerializedError

Ƭ **SerializedError**: `Record`\<`string`, `Record`\<`string`, `string`\> \| `string` \| `undefined`\>

The shape of an `Error` instance, after it has been serialized into a simple hash.

#### Defined in

[error-serializer.ts:8](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/error-serializer.ts#L8)

## Variables

### PALETTES

• `Const` **PALETTES**: `number`[][]

#### Defined in

[graphics/core.ts:5](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L5)

---

### TWO_PI

• `Const` **TWO_PI**: `number`

#### Defined in

[math/core.ts:1](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/core.ts#L1)

---

### random

• `Const` **random**: [`Random`](classes/Random.md)

#### Defined in

[random.ts:196](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/random.ts#L196)

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

[math/core.ts:58](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/core.ts#L58)

---

### blend

▸ **blend**(`src`, `dst`, `alpha`): `number`

Returns a new color that is a blend between a source and a destination
color linerally. The alpha component in these colors is ignored. Instead, the provided
`alpha` value is used to blend between the two colors.

#### Parameters

| Name    | Type     | Description                          |
| :------ | :------- | :----------------------------------- |
| `src`   | `number` | The source color.                    |
| `dst`   | `number` | The destination color.               |
| `alpha` | `number` | The alpha value to use for blending. |

#### Returns

`number`

The blended color.

#### Defined in

[graphics/core.ts:413](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L413)

---

### blendAdditive

▸ **blendAdditive**(`src`, `dst`, `alpha`): `number`

Returns a new color that is a blend between a source and a destination
color additively. The alpha component in these colors is ignored. Instead, the provided
`alpha` value is used to blend between the two colors.

#### Parameters

| Name    | Type     | Description                          |
| :------ | :------- | :----------------------------------- |
| `src`   | `number` | The source color.                    |
| `dst`   | `number` | The destination color.               |
| `alpha` | `number` | The alpha value to use for blending. |

#### Returns

`number`

The blended color.

#### Defined in

[graphics/core.ts:439](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L439)

---

### blendSubtractive

▸ **blendSubtractive**(`src`, `dst`, `alpha`): `number`

Returns a new color that is a blend between a source and a destination
color subtractively. The alpha component in these colors is ignored. Instead, the provided
`alpha` value is used to blend between the two colors.

#### Parameters

| Name    | Type     | Description                          |
| :------ | :------- | :----------------------------------- |
| `src`   | `number` | The source color.                    |
| `dst`   | `number` | The destination color.               |
| `alpha` | `number` | The alpha value to use for blending. |

#### Returns

`number`

The blended color.

#### Defined in

[graphics/core.ts:463](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L463)

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

[math/core.ts:35](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/core.ts#L35)

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

[math/core.ts:8](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/core.ts#L8)

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

[array.ts:38](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/array.ts#L38)

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

[math/core.ts:47](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/core.ts#L47)

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

[error-serializer.ts:43](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/error-serializer.ts#L43)

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

[error-serializer.ts:52](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/error-serializer.ts#L52)

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

[error-serializer.ts:65](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/error-serializer.ts#L65)

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

| Name           | Type                                               | Description             |
| :------------- | :------------------------------------------------- | :---------------------- |
| `array`        | `unknown`[]                                        | The array to filter.    |
| `InstanceType` | [`ConstructorOf`](modules.md#constructorof)\<`T`\> | The type to search for. |

#### Returns

`T`[]

A new array with the filtered items.

#### Defined in

[array.ts:49](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/array.ts#L49)

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

[string-formatter.ts:10](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/string-formatter.ts#L10)

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

[string-formatter.ts:25](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/string-formatter.ts#L25)

---

### fromRGB

▸ **fromRGB**(`r`, `g`, `b`): `number`

Constructs a 32bit integer value that represents an RGBA color value.
The A component is fixed to `255`

#### Parameters

| Name | Type     | Description      |
| :--- | :------- | :--------------- |
| `r`  | `number` | The R component. |
| `g`  | `number` | The G component. |
| `b`  | `number` | The B component. |

#### Returns

`number`

The constructed color value.

#### Defined in

[graphics/core.ts:364](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L364)

---

### fromRGBA

▸ **fromRGBA**(`r`, `g`, `b`, `a`): `number`

Constructs a 32bit integer value that represents an RGBA color value.

#### Parameters

| Name | Type     | Description      |
| :--- | :------- | :--------------- |
| `r`  | `number` | The R component. |
| `g`  | `number` | The G component. |
| `b`  | `number` | The B component. |
| `a`  | `number` | The A component. |

#### Returns

`number`

The constructed color value.

#### Defined in

[graphics/core.ts:347](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L347)

---

### getA

▸ **getA**(`color`): `number`

Extracts the A component from a color value.

#### Parameters

| Name    | Type     | Description      |
| :------ | :------- | :--------------- |
| `color` | `number` | The color value. |

#### Returns

`number`

The A component of the color value.

#### Defined in

[graphics/core.ts:400](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L400)

---

### getB

▸ **getB**(`color`): `number`

Extracts the B component from a color value.

#### Parameters

| Name    | Type     | Description      |
| :------ | :------- | :--------------- |
| `color` | `number` | The color value. |

#### Returns

`number`

The B component of the color value.

#### Defined in

[graphics/core.ts:391](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L391)

---

### getG

▸ **getG**(`color`): `number`

Extracts the G component from a color value.

#### Parameters

| Name    | Type     | Description      |
| :------ | :------- | :--------------- |
| `color` | `number` | The color value. |

#### Returns

`number`

The G component of the color value.

#### Defined in

[graphics/core.ts:382](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L382)

---

### getR

▸ **getR**(`color`): `number`

Extracts the R component from a color value.

#### Parameters

| Name    | Type     | Description      |
| :------ | :------- | :--------------- |
| `color` | `number` | The color value. |

#### Returns

`number`

The R component of the color value.

#### Defined in

[graphics/core.ts:373](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L373)

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

[array.ts:27](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/array.ts#L27)

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

| Name           | Type                                               | Description                    |
| :------------- | :------------------------------------------------- | :----------------------------- |
| `nilable`      | [`Maybe`](modules.md#maybe)\<`T`\>                 | The subject that could be nil. |
| `InstanceType` | [`ConstructorOf`](modules.md#constructorof)\<`T`\> | The type to check against.     |

#### Returns

nilable is T

`true` if the input element matches the given type,
`false` otherwise.

#### Defined in

[nil.ts:32](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/nil.ts#L32)

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

[error-serializer.ts:15](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/error-serializer.ts#L15)

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

[math/core.ts:76](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/core.ts#L76)

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

[nil.ts:20](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/nil.ts#L20)

---

### mustExist

▸ **mustExist**\<`T`\>(`subject`, `errorMessage?`): `T`

Ensure that the passed subject is not nil; throw otherwise.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                               | Description                                                 |
| :-------------- | :--------------------------------- | :---------------------------------------------------------- |
| `subject`       | [`Maybe`](modules.md#maybe)\<`T`\> | A subject that is possible nil.                             |
| `errorMessage?` | `string`                           | An optional error message to throw when the subject is nil. |

#### Returns

`T`

The subject, if it isn't nil.

**`Throws`**

When the subject is nil.

#### Defined in

[nil.ts:56](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/nil.ts#L56)

---

### nextPalette

▸ **nextPalette**(): `void`

Switches the global palette to the next available preset.

#### Returns

`void`

#### Defined in

[graphics/core.ts:491](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L491)

---

### putPixel32

▸ **putPixel32**(`canvas`, `x`, `y`, `color`, `alpha`): `void`

Linearly blends a new pixel with an existing color value in a [Canvas](classes/Canvas.md).

#### Parameters

| Name     | Type                          | Description                                                                    |
| :------- | :---------------------------- | :----------------------------------------------------------------------------- |
| `canvas` | [`Canvas`](classes/Canvas.md) | The [Canvas](classes/Canvas.md) to interact with.                              |
| `x`      | `number`                      | The X coordinate at which to place the pixel.                                  |
| `y`      | `number`                      | The Y coordinate at which to place the pixel.                                  |
| `color`  | `number`                      | The color of the pixel.                                                        |
| `alpha`  | `number`                      | The alpha value to use to blend the pixel with existing color at the location. |

#### Returns

`void`

#### Defined in

[graphics/canvas.ts:132](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/canvas.ts#L132)

---

### putPixel32Add

▸ **putPixel32Add**(`canvas`, `x`, `y`, `color`, `alpha`): `void`

Additively blends a new pixel with an existing color value in a [Canvas](classes/Canvas.md).

#### Parameters

| Name     | Type                          | Description                                                                    |
| :------- | :---------------------------- | :----------------------------------------------------------------------------- |
| `canvas` | [`Canvas`](classes/Canvas.md) | The [Canvas](classes/Canvas.md) to interact with.                              |
| `x`      | `number`                      | The X coordinate at which to place the pixel.                                  |
| `y`      | `number`                      | The Y coordinate at which to place the pixel.                                  |
| `color`  | `number`                      | The color of the pixel.                                                        |
| `alpha`  | `number`                      | The alpha value to use to blend the pixel with existing color at the location. |

#### Returns

`void`

#### Defined in

[graphics/canvas.ts:156](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/canvas.ts#L156)

---

### putPixel32Sub

▸ **putPixel32Sub**(`canvas`, `x`, `y`, `color`, `alpha`): `void`

Subtractively blends a new pixel with an existing color value in a [Canvas](classes/Canvas.md).

#### Parameters

| Name     | Type                          | Description                                                                    |
| :------- | :---------------------------- | :----------------------------------------------------------------------------- |
| `canvas` | [`Canvas`](classes/Canvas.md) | The [Canvas](classes/Canvas.md) to interact with.                              |
| `x`      | `number`                      | The X coordinate at which to place the pixel.                                  |
| `y`      | `number`                      | The Y coordinate at which to place the pixel.                                  |
| `color`  | `number`                      | The color of the pixel.                                                        |
| `alpha`  | `number`                      | The alpha value to use to blend the pixel with existing color at the location. |

#### Returns

`void`

#### Defined in

[graphics/canvas.ts:186](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/canvas.ts#L186)

---

### putSubPixel32

▸ **putSubPixel32**(`canvas`, `x`, `y`, `color`, `alpha`): `void`

Linearly blends a new pixel with an existing color value in a [Canvas](classes/Canvas.md).
Compared to [putPixel32](modules.md#putpixel32), this function supports sub-pixel placement, but is dramatically slower.

#### Parameters

| Name     | Type                          | Description                                                                    |
| :------- | :---------------------------- | :----------------------------------------------------------------------------- |
| `canvas` | [`Canvas`](classes/Canvas.md) | The [Canvas](classes/Canvas.md) to interact with.                              |
| `x`      | `number`                      | The X coordinate at which to place the pixel.                                  |
| `y`      | `number`                      | The Y coordinate at which to place the pixel.                                  |
| `color`  | `number`                      | The color of the pixel.                                                        |
| `alpha`  | `number`                      | The alpha value to use to blend the pixel with existing color at the location. |

#### Returns

`void`

#### Defined in

[graphics/canvas.ts:217](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/canvas.ts#L217)

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

[math/core.ts:17](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/core.ts#L17)

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

[random.ts:180](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/random.ts#L180)

---

### safeRGBComponent

▸ **safeRGBComponent**(`c`): `number`

Constrains a color component value to single-byte range (`0`-`255`).

#### Parameters

| Name | Type     | Description              |
| :--- | :------- | :----------------------- |
| `c`  | `number` | A color component value. |

#### Returns

`number`

The input value constrained into single-byte range.

#### Defined in

[graphics/core.ts:329](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L329)

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

[random.ts:190](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/random.ts#L190)

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

[array.ts:9](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/array.ts#L9)

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

[math/core.ts:26](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/math/core.ts#L26)

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

[sleep.ts:6](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/sleep.ts#L6)

---

### somecolor

▸ **somecolor**(): `number`

Retrieves a random color from the current global palette.

#### Returns

`number`

A random color.

#### Defined in

[graphics/core.ts:481](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L481)

---

### toGrayScale

▸ **toGrayScale**(`color`): `number`

Converts a color value to grayscale.

#### Parameters

| Name    | Type     | Description           |
| :------ | :------- | :-------------------- |
| `color` | `number` | The color to convert. |

#### Returns

`number`

The grayscale value appropriate for the color.

#### Defined in

[graphics/core.ts:503](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/graphics/core.ts#L503)

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

[error-serializer.ts:26](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/error-serializer.ts#L26)
