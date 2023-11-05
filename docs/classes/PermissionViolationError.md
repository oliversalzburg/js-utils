[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / PermissionViolationError

# Class: PermissionViolationError

An error used when access to a resource was requested, but the required
permissions were not available.

## Hierarchy

-   [`AbstractError`](AbstractError.md)

    ↳ **`PermissionViolationError`**

## Constructors

### constructor

• **new PermissionViolationError**(`message`, `status?`): [`PermissionViolationError`](PermissionViolationError.md)

Constructs a new [PermissionViolationError](PermissionViolationError.md).

#### Parameters

| Name      | Type     | Default value | Description                     |
| :-------- | :------- | :------------ | :------------------------------ |
| `message` | `string` | `undefined`   | The main error message.         |
| `status`  | `number` | `403`         | The HTTP status code to return. |

#### Returns

[`PermissionViolationError`](PermissionViolationError.md)

#### Overrides

[AbstractError](AbstractError.md).[constructor](AbstractError.md#constructor)

#### Defined in

[errors/PermissionViolationError.ts:13](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/errors/PermissionViolationError.ts#L13)

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

[errors/AbstractError.ts:29](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/errors/AbstractError.ts#L29)

---

### info

• **info**: [`Maybe`](../modules.md#maybe)\<`string`\>

A user-friendly error message that may be transported to the client.

**`Deprecated`**

User-friendly errors should be read from `extensions`.

#### Inherited from

[AbstractError](AbstractError.md).[info](AbstractError.md#info)

#### Defined in

[errors/AbstractError.ts:24](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/errors/AbstractError.ts#L24)

---

### inner

• **inner**: [`Maybe`](../modules.md#maybe)\<`Error`\>

Another error that should be transported with this error.

**`Deprecated`**

We don't make use of this or interpret nested errors at all.

#### Inherited from

[AbstractError](AbstractError.md).[inner](AbstractError.md#inner)

#### Defined in

[errors/AbstractError.ts:18](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/errors/AbstractError.ts#L18)

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

[errors/AbstractError.ts:12](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/errors/AbstractError.ts#L12)

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

[AbstractError](AbstractError.md).[captureStackTrace](AbstractError.md#capturestacktrace)

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

#### Inherited from

[AbstractError](AbstractError.md).[isAbstractError](AbstractError.md#isabstracterror)

#### Defined in

[errors/AbstractError.ts:58](https://github.com/oliversalzburg/js-utils/blob/ccc0f19/source/errors/AbstractError.ts#L58)
