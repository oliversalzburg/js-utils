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

[graphics/render-loop.ts:20](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/render-loop.ts#L20)

## Properties

### canvas

• `Readonly` **canvas**: `undefined` \| [`Canvas`](Canvas.md)

#### Defined in

[graphics/render-loop.ts:9](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/render-loop.ts#L9)

---

### renderLoop

• `Readonly` **renderLoop**: [`AnyFunction`](../modules.md#anyfunction)

#### Defined in

[graphics/render-loop.ts:10](https://github.com/oliversalzburg/js-utils/blob/293b24f/source/graphics/render-loop.ts#L10)
