[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / RenderLoop

# Class: RenderLoop

Conveniently provides a way to have a render loop called at
a constant frame rate.

## Constructors

### constructor

• **new RenderLoop**(`renderLoop`, `canvas?`): [`RenderLoop`](RenderLoop.md)

Constructs a new [RenderLoop](RenderLoop.md).

#### Parameters

| Name         | Type                                       | Description                                                                    |
| :----------- | :----------------------------------------- | :----------------------------------------------------------------------------- |
| `renderLoop` | [`AnyFunction`](../modules.md#anyfunction) | The function to call when a new frame should be drawn.                         |
| `canvas?`    | [`Canvas`](Canvas.md)                      | When provided, the canvas is automatically updated after a frame was rendered. |

#### Returns

[`RenderLoop`](RenderLoop.md)

#### Defined in

[graphics/render-loop.ts:29](https://github.com/oliversalzburg/js-utils/blob/c7813d3/source/graphics/render-loop.ts#L29)

## Properties

### canvas

• `Readonly` **canvas**: `undefined` \| [`Canvas`](Canvas.md)

The [Canvas](Canvas.md) we're rendering to.

#### Defined in

[graphics/render-loop.ts:12](https://github.com/oliversalzburg/js-utils/blob/c7813d3/source/graphics/render-loop.ts#L12)

---

### renderLoop

• `Readonly` **renderLoop**: [`AnyFunction`](../modules.md#anyfunction)

A function that we call when a new frame should be drawn.

#### Defined in

[graphics/render-loop.ts:17](https://github.com/oliversalzburg/js-utils/blob/c7813d3/source/graphics/render-loop.ts#L17)

## Methods

### block

▸ **block**(): `void`

Stop the render loop.

#### Returns

`void`

#### Defined in

[graphics/render-loop.ts:39](https://github.com/oliversalzburg/js-utils/blob/c7813d3/source/graphics/render-loop.ts#L39)

---

### unblock

▸ **unblock**(): `void`

Start the render loop.

#### Returns

`void`

#### Defined in

[graphics/render-loop.ts:51](https://github.com/oliversalzburg/js-utils/blob/c7813d3/source/graphics/render-loop.ts#L51)
