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

[graphics/canvas.ts:22](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L22)

## Properties

### buffer

• `Readonly` **buffer**: `Uint8ClampedArray`

#### Defined in

[graphics/canvas.ts:14](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L14)

---

### canvas

• `Readonly` **canvas**: `HTMLCanvasElement`

#### Defined in

[graphics/canvas.ts:9](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L9)

---

### context

• `Readonly` **context**: `CanvasRenderingContext2D`

#### Defined in

[graphics/canvas.ts:12](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L12)

---

### height

• `Readonly` **height**: `number`

#### Defined in

[graphics/canvas.ts:11](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L11)

---

### pixMap

• `Readonly` **pixMap**: `ImageData`

#### Defined in

[graphics/canvas.ts:13](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L13)

---

### width

• `Readonly` **width**: `number`

#### Defined in

[graphics/canvas.ts:10](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L10)

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

[graphics/canvas.ts:75](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L75)

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

[graphics/canvas.ts:47](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L47)

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

[graphics/canvas.ts:63](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L63)

---

### update

▸ **update**(): `void`

Draws the backbuffer onto the canvas.

#### Returns

`void`

#### Defined in

[graphics/canvas.ts:37](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/canvas.ts#L37)
