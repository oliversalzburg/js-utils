[@oliversalzburg/js-utils](../README.md) / [Exports](../modules.md) / RenderLoop

# Class: RenderLoop

Conveniently provides a way to have a render loop called at
a constant frame rate.

## Constructors

### constructor

• **new RenderLoop**(`renderLoop`, `canvas?`): [`RenderLoop`](RenderLoop.md)

Constructs a new [RenderLoop](RenderLoop.md).

#### Parameters

| Name         | Type                                                     | Description                                                                    |
| :----------- | :------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `renderLoop` | [`RenderLoopCallback`](../modules.md#renderloopcallback) | The function to call when a new frame should be drawn.                         |
| `canvas?`    | [`Canvas`](Canvas.md)                                    | When provided, the canvas is automatically updated after a frame was rendered. |

#### Returns

[`RenderLoop`](RenderLoop.md)

#### Defined in

[graphics/render-loop.ts:33](https://github.com/oliversalzburg/js-utils/blob/ba70690/source/graphics/render-loop.ts#L33)

## Properties

### canvas

• `Readonly` **canvas**: `undefined` \| [`Canvas`](Canvas.md)

The [Canvas](Canvas.md) we're rendering to.

#### Defined in

[graphics/render-loop.ts:16](https://github.com/oliversalzburg/js-utils/blob/ba70690/source/graphics/render-loop.ts#L16)

---

### renderLoop

• `Readonly` **renderLoop**: [`RenderLoopCallback`](../modules.md#renderloopcallback)

A function that we call when a new frame should be drawn.

#### Defined in

[graphics/render-loop.ts:21](https://github.com/oliversalzburg/js-utils/blob/ba70690/source/graphics/render-loop.ts#L21)

## Methods

### block

▸ **block**(): `void`

Stop the render loop.

#### Returns

`void`

#### Defined in

[graphics/render-loop.ts:43](https://github.com/oliversalzburg/js-utils/blob/ba70690/source/graphics/render-loop.ts#L43)

---

### unblock

▸ **unblock**(): `void`

Start the render loop.

#### Returns

`void`

#### Defined in

[graphics/render-loop.ts:55](https://github.com/oliversalzburg/js-utils/blob/ba70690/source/graphics/render-loop.ts#L55)
