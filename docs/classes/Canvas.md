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

[graphics/canvas.ts:57](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L57)

## Properties

### buffer

• `Readonly` **buffer**: `Uint8ClampedArray`

Our backbuffer.

#### Defined in

[graphics/canvas.ts:49](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L49)

---

### canvas

• `Readonly` **canvas**: `HTMLCanvasElement`

The [`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
we're interacting with.

#### Defined in

[graphics/canvas.ts:22](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L22)

---

### context

• `Readonly` **context**: `CanvasRenderingContext2D`

The [`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2)
we're using to draw to the canvas.

#### Defined in

[graphics/canvas.ts:38](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L38)

---

### height

• `Readonly` **height**: `number`

The height of the canvas.

#### Defined in

[graphics/canvas.ts:32](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L32)

---

### pixMap

• `Readonly` **pixMap**: `ImageData`

The [`ImageData`](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object
that represents our frontbuffer, which is the canvas itself.

#### Defined in

[graphics/canvas.ts:44](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L44)

---

### width

• `Readonly` **width**: `number`

The width of the canvas.

#### Defined in

[graphics/canvas.ts:27](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L27)

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

[graphics/canvas.ts:110](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L110)

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

[graphics/canvas.ts:82](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L82)

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

[graphics/canvas.ts:98](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L98)

---

### update

▸ **update**(): `void`

Draws the backbuffer onto the canvas.

#### Returns

`void`

#### Defined in

[graphics/canvas.ts:72](https://github.com/oliversalzburg/js-utils/blob/d0ad1f9/source/graphics/canvas.ts#L72)
