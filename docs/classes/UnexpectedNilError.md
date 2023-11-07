[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / UnexpectedNilError

# Class: UnexpectedNilError

Thrown when an unexpected nil value was encountered.

## Hierarchy

-   `Error`

    ↳ **`UnexpectedNilError`**

## Constructors

### constructor

• **new UnexpectedNilError**(`message?`): [`UnexpectedNilError`](UnexpectedNilError.md)

Constructs a new {UnexpectedNilError}.

#### Parameters

| Name      | Type     | Default value            | Description        |
| :-------- | :------- | :----------------------- | :----------------- |
| `message` | `string` | `"unexpected nil value"` | The error message. |

#### Returns

[`UnexpectedNilError`](UnexpectedNilError.md)

#### Overrides

Error.constructor

#### Defined in

[nil.ts:44](https://github.com/oliversalzburg/js-utils/blob/d914d90/source/nil.ts#L44)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

../node_modules/typescript/lib/lib.es2022.error.d.ts:24

---

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

../node_modules/typescript/lib/lib.es5.d.ts:1068

---

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

../node_modules/typescript/lib/lib.es5.d.ts:1067

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

../node_modules/typescript/lib/lib.es5.d.ts:1069

---

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `err`         | `Error`      |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

../node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

../node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

../node_modules/@types/node/globals.d.ts:4
