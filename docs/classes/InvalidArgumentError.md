[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / InvalidArgumentError

# Class: InvalidArgumentError

Used when the user supplied an argument that is not valid in the current
context.

## Hierarchy

-   [`AbstractError`](AbstractError.md)

    ↳ **`InvalidArgumentError`**

## Constructors

### constructor

• **new InvalidArgumentError**(`message`, `status?`)

Constructs a new `InvalidArgumentError`.

#### Parameters

| Name      | Type     | Default value | Description                     |
| :-------- | :------- | :------------ | :------------------------------ |
| `message` | `string` | `undefined`   | The main error message.         |
| `status`  | `number` | `400`         | The HTTP status code to return. |

#### Overrides

[AbstractError](AbstractError.md).[constructor](AbstractError.md#constructor)

#### Defined in

[errors/InvalidArgumentError.ts:13](https://github.com/oliversalzburg/js-utils/blob/6a86099/source/errors/InvalidArgumentError.ts#L13)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

[AbstractError](AbstractError.md).[cause](AbstractError.md#cause)

#### Defined in

../node_modules/typescript/lib/lib.es2022.error.d.ts:24

---

### code

• **code**: `string`

An application-unique, readable error code.

#### Inherited from

[AbstractError](AbstractError.md).[code](AbstractError.md#code)

#### Defined in

[errors/AbstractError.ts:29](https://github.com/oliversalzburg/js-utils/blob/6a86099/source/errors/AbstractError.ts#L29)

---

### info

• **info**: [`Maybe`](../modules.md#maybe)<`string`\>

A user-friendly error message that may be transported to the client.

**`Deprecated`**

User-friendly errors should be read from `extensions`.

#### Inherited from

[AbstractError](AbstractError.md).[info](AbstractError.md#info)

#### Defined in

[errors/AbstractError.ts:24](https://github.com/oliversalzburg/js-utils/blob/6a86099/source/errors/AbstractError.ts#L24)

---

### inner

• **inner**: [`Maybe`](../modules.md#maybe)<`Error`\>

Another error that should be transported with this error.

**`Deprecated`**

We don't make use of this or interpret nested errors at all.

#### Inherited from

[AbstractError](AbstractError.md).[inner](AbstractError.md#inner)

#### Defined in

[errors/AbstractError.ts:18](https://github.com/oliversalzburg/js-utils/blob/6a86099/source/errors/AbstractError.ts#L18)

---

### message

• **message**: `string`

#### Inherited from

[AbstractError](AbstractError.md).[message](AbstractError.md#message)

#### Defined in

../node_modules/typescript/lib/lib.es5.d.ts:1068

---

### name

• **name**: `string`

#### Inherited from

[AbstractError](AbstractError.md).[name](AbstractError.md#name)

#### Defined in

../node_modules/typescript/lib/lib.es5.d.ts:1067

---

### stack

• `Optional` **stack**: `string`

#### Inherited from

[AbstractError](AbstractError.md).[stack](AbstractError.md#stack)

#### Defined in

../node_modules/typescript/lib/lib.es5.d.ts:1069

---

### status

• **status**: `number`

The HTTP status code to associate with this error.

**`Deprecated`**

We no longer respond to HTTP requests with error-specifc
status codes.

#### Inherited from

[AbstractError](AbstractError.md).[status](AbstractError.md#status)

#### Defined in

[errors/AbstractError.ts:12](https://github.com/oliversalzburg/js-utils/blob/6a86099/source/errors/AbstractError.ts#L12)

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

[AbstractError](AbstractError.md).[prepareStackTrace](AbstractError.md#preparestacktrace)

#### Defined in

../node_modules/@types/node/globals.d.ts:11

---

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[AbstractError](AbstractError.md).[stackTraceLimit](AbstractError.md#stacktracelimit)

#### Defined in

../node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `targetObject`    | `object`   |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

[AbstractError](AbstractError.md).[captureStackTrace](AbstractError.md#capturestacktrace)

#### Defined in

../node_modules/@types/node/globals.d.ts:4

---

### isAbstractError

▸ `Static` **isAbstractError**(`error`, `allowForeignModule?`): error is AbstractError

#### Parameters

| Name                 | Type      | Default value |
| :------------------- | :-------- | :------------ |
| `error`              | `unknown` | `undefined`   |
| `allowForeignModule` | `boolean` | `true`        |

#### Returns

error is AbstractError

#### Inherited from

[AbstractError](AbstractError.md).[isAbstractError](AbstractError.md#isabstracterror)

#### Defined in

[errors/AbstractError.ts:50](https://github.com/oliversalzburg/js-utils/blob/6a86099/source/errors/AbstractError.ts#L50)
