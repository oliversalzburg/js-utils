[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / Canvas

# Class: Canvas

A wrapper around [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
to provide some convience for double-buffered drawing.

## Constructors

### constructor

• **new Canvas**(`canvas`, `width`, `height`): [`Canvas`](Canvas.md)

Constructs a new [Canvas](Canvas.md).

#### Parameters

| Name     | Type                | Description               |
| :------- | :------------------ | :------------------------ |
| `canvas` | `HTMLCanvasElement` | The canvas to wrap.       |
| `width`  | `number`            | The width of the canvas.  |
| `height` | `number`            | The height of the canvas. |

#### Returns

[`Canvas`](Canvas.md)

#### Defined in

[graphics/canvas.ts:31](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L31)

## Properties

### buffer

• `Readonly` **buffer**: `Uint8ClampedArray`

#### Defined in

[graphics/canvas.ts:23](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L23)

---

### canvas

• `Readonly` **canvas**: `HTMLCanvasElement`

#### Defined in

[graphics/canvas.ts:18](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L18)

---

### context

• `Readonly` **context**: `CanvasRenderingContext2D`

#### Defined in

[graphics/canvas.ts:21](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L21)

---

### height

• `Readonly` **height**: `number`

#### Defined in

[graphics/canvas.ts:20](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L20)

---

### pixMap

• `Readonly` **pixMap**: `ImageData`

#### Defined in

[graphics/canvas.ts:22](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L22)

---

### width

• `Readonly` **width**: `number`

#### Defined in

[graphics/canvas.ts:19](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L19)

## Methods

### clearWith

▸ **clearWith**(`color`): `void`

Fills the entire backbuffer with the given color.

#### Parameters

| Name    | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `color` | `number` | The color to fill the backbuffer with. |

#### Returns

`void`

#### Defined in

[graphics/canvas.ts:84](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L84)

---

### getPixel32

▸ **getPixel32**(`x`, `y`): `number`

Returns the color of a pixel in the backbuffer.

#### Parameters

| Name | Type     | Description                   |
| :--- | :------- | :---------------------------- |
| `x`  | `number` | The X coordinate to retrieve. |
| `y`  | `number` | The X coordinate to retrieve. |

#### Returns

`number`

The color of the pixel at the given local.

#### Defined in

[graphics/canvas.ts:56](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L56)

---

### setPixel32

▸ **setPixel32**(`x`, `y`, `color`): `void`

Colors a pixel in the backbuffer.

#### Parameters

| Name    | Type     | Description                           |
| :------ | :------- | :------------------------------------ |
| `x`     | `number` | The X coordinate to color.            |
| `y`     | `number` | The Y coordinate to color.            |
| `color` | `number` | The color to place at the coordinate. |

#### Returns

`void`

#### Defined in

[graphics/canvas.ts:72](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L72)

---

### update

▸ **update**(): `void`

Draws the backbuffer onto the canvas.

#### Returns

`void`

#### Defined in

[graphics/canvas.ts:46](https://github.com/oliversalzburg/js-utils/blob/bb6a423/source/graphics/canvas.ts#L46)
