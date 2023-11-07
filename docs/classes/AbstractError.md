[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / AbstractError

# Class: AbstractError

Base class for all errors.

## Hierarchy

-   `Error`

    ↳ **`AbstractError`**

    ↳↳ [`InternalError`](InternalError.md)

    ↳↳ [`InvalidArgumentError`](InvalidArgumentError.md)

    ↳↳ [`InvalidOperationError`](InvalidOperationError.md)

    ↳↳ [`NotImplementedError`](NotImplementedError.md)

    ↳↳ [`PermissionViolationError`](PermissionViolationError.md)

    ↳↳ [`ResourceConflictError`](ResourceConflictError.md)

    ↳↳ [`UnknownError`](UnknownError.md)

## Constructors

### constructor

• **new AbstractError**(`code`, `message`, `status`): [`AbstractError`](AbstractError.md)

Constructs a new [AbstractError](AbstractError.md).

#### Parameters

| Name      | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `code`    | `string` | The main identification code for the error. |
| `message` | `string` | The main error message.                     |
| `status`  | `number` | The HTTP status code to return.             |

#### Returns

[`AbstractError`](AbstractError.md)

#### Overrides

Error.constructor

#### Defined in

[errors/AbstractError.ts:37](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/errors/AbstractError.ts#L37)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

../node_modules/typescript/lib/lib.es2022.error.d.ts:24

---

### code

• **code**: `string`

An application-unique, readable error code.

#### Defined in

[errors/AbstractError.ts:29](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/errors/AbstractError.ts#L29)

---

### info

• **info**: [`Maybe`](../modules.md#maybe)\<`string`\>

A user-friendly error message that may be transported to the client.

**`Deprecated`**

User-friendly errors should be read from `extensions`.

#### Defined in

[errors/AbstractError.ts:24](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/errors/AbstractError.ts#L24)

---

### inner

• **inner**: [`Maybe`](../modules.md#maybe)\<`Error`\>

Another error that should be transported with this error.

**`Deprecated`**

We don't make use of this or interpret nested errors at all.

#### Defined in

[errors/AbstractError.ts:18](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/errors/AbstractError.ts#L18)

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

### status

• **status**: `number`

The HTTP status code to associate with this error.

**`Deprecated`**

We no longer respond to HTTP requests with error-specifc
status codes.

#### Defined in

[errors/AbstractError.ts:12](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/errors/AbstractError.ts#L12)

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

---

### isAbstractError

▸ **isAbstractError**(`error`, `allowForeignModule?`): error is AbstractError

Checks if an object is an instance of [AbstractError](AbstractError.md), or one of its subclasses.

#### Parameters

| Name                 | Type      | Default value | Description                                                                                                                                                 |
| :------------------- | :-------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `error`              | `unknown` | `undefined`   | The object to check.                                                                                                                                        |
| `allowForeignModule` | `boolean` | `true`        | Only check for similar looking error codes. You're going to want to use this if you're dealing with a setup where multiple versions of js-utils are loaded. |

#### Returns

error is AbstractError

`true` if the object is an [AbstractError](AbstractError.md), `false` otherwise.

#### Defined in

[errors/AbstractError.ts:58](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/errors/AbstractError.ts#L58)
