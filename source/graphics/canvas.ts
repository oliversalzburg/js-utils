import { InvalidOperationError } from "../errors/InvalidOperationError.js";
import { mustExist } from "../nil.js";
import {
  blend,
  blendAdditive,
  blendSubtractive,
  fromRGBA,
  getA,
  getB,
  getG,
  getR,
} from "./core.js";

/**
 * Construction options for a {@linkcode Canvas}.
 * @group Graphics
 */
export interface CanvasOptions {
  /**
   * Was this {@linkcode Canvas} created with the ability to copy the front buffer back into
   * the back buffer?
   */
  readonly supportReadBack: boolean;
}

/**
 * A wrapper around {@linkcode !HTMLCanvasElement}
 * to provide some convience for double-buffered drawing.
 * @group Graphics
 */
export class Canvas {
  /**
   * The {@linkcode !HTMLCanvasElement} we're interacting with in the DOM.
   */
  readonly canvasDom: HTMLCanvasElement;

  /**
   * The rendering context for the canvas located in the DOM.
   */
  #canvasDomContext: ImageBitmapRenderingContext;

  /**
   * The offscreen canvas we use for rendering.
   */
  #canvasOffscreen: OffscreenCanvas;

  /**
   * The width of the canvas.
   */
  readonly width: number;

  /**
   * The height of the canvas.
   */
  readonly height: number;

  /**
   * The {@linkcode !OffscreenCanvasRenderingContext2D} we're using to draw to the canvas.
   */
  readonly context: OffscreenCanvasRenderingContext2D;

  /**
   * The {@linkcode !ImageData} object in our offscreen canvas. We usually interact with its
   * {@linkcode Canvas.buffer buffer} directly.
   */
  #imageData: ImageData;

  /**
   * Our back buffer.
   */
  buffer: Uint8ClampedArray;

  /**
   * The configuration that was used for this canvas.
   */
  readonly options: Readonly<Partial<CanvasOptions>>;

  /**
   * Constructs a new {@linkcode Canvas}.
   * @param canvas The canvas to wrap.
   * @param width The width of the canvas.
   * @param height The height of the canvas.
   * @param options The configuration for this canvas.
   */
  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    options: Partial<CanvasOptions> = {},
  ) {
    this.width = width;
    this.height = height;
    this.options = options;

    this.canvasDom = canvas;
    this.#canvasDomContext = mustExist(
      this.canvasDom.getContext("bitmaprenderer", {
        alpha: false,
      }),
      "Unable to create rendering context for DOM canvas.",
    );

    this.#canvasOffscreen = new OffscreenCanvas(this.width, this.height);
    this.context = mustExist(
      this.#canvasOffscreen.getContext("2d", {
        alpha: false,
        desynchronized: true,
        willReadFrequently: this.options.supportReadBack,
      }),
      "Unable to create rendering context for offscreen canvas.",
    );
    this.#imageData = this.context.createImageData(width, height);
    this.buffer = this.#imageData.data;

    this.context.font = "12px sans-serif";
  }

  /**
   * Draws the back buffer onto the canvas.
   */
  update() {
    this.context.putImageData(this.#imageData, 0, 0);
  }

  /**
   * Draws the offscreen canvas into the DOM canvas.
   */
  render() {
    const newFrame = this.#canvasOffscreen.transferToImageBitmap();
    this.#canvasDomContext.transferFromImageBitmap(newFrame);
  }

  /**
   * Draws a slightly transparent, black rectangle over the canvas,
   * and then reads the result back into the buffer.
   * @param amount How much the screen should be faded to black. `0` is
   * not at all, `255` makes it instantly black.
   */
  fade(amount = 1) {
    this.blendWith(fromRGBA(0, 0, 0, amount));
  }

  /**
   * Reads the front buffer back into the back buffer.
   */
  bufferReadBack(): void {
    if (!this.options.supportReadBack) {
      throw new InvalidOperationError(
        "To use `bufferReadBack()`, you must construct the `Canvas` with `options.supportReadBack` set to `true`.",
      );
    }
    this.#imageData = this.context.getImageData(0, 0, this.width, this.height);
    this.buffer = this.#imageData.data;
  }

  /**
   * Returns the color of a pixel in the back buffer.
   * @param x The X coordinate to retrieve.
   * @param y The X coordinate to retrieve.
   * @returns The color of the pixel at the given local.
   */
  getPixel32(x: number, y: number) {
    const bufferOffset = (x + y * this.width) * 4;
    return fromRGBA(
      this.buffer[bufferOffset + 0],
      this.buffer[bufferOffset + 1],
      this.buffer[bufferOffset + 2],
      this.buffer[bufferOffset + 3],
    );
  }

  /**
   * Colors a pixel in the back buffer.
   * @param x The X coordinate to color.
   * @param y The Y coordinate to color.
   * @param color The color to place at the coordinate.
   */
  setPixel32(x: number, y: number, color: number) {
    const bufferOffset = (x + y * this.width) * 4;
    this.buffer[bufferOffset + 0] = getR(color);
    this.buffer[bufferOffset + 1] = getG(color);
    this.buffer[bufferOffset + 2] = getB(color);
    this.buffer[bufferOffset + 3] = getA(color);
  }

  /**
   * Fills the entire back buffer with the given color.
   * @param color The color to fill the back buffer with.
   */
  clearWith(color: number) {
    const r = getR(color);
    const g = getG(color);
    const b = getB(color);
    const a = getA(color);
    for (let bufferOffset = 0; bufferOffset < this.width * this.height * 4; bufferOffset += 4) {
      this.buffer[bufferOffset + 0] = r;
      this.buffer[bufferOffset + 1] = g;
      this.buffer[bufferOffset + 2] = b;
      this.buffer[bufferOffset + 3] = a;
    }
  }

  /**
   * Fills the entire back buffer with the given color.
   * @param color The color to fill the back buffer with.
   */
  blendWith(color: number) {
    const r = getR(color);
    const g = getG(color);
    const b = getB(color);
    const a = getA(color);
    for (let bufferOffset = 0; bufferOffset < this.width * this.height * 4; bufferOffset += 4) {
      this.buffer[bufferOffset + 0] = (a * r + (255 - a) * this.buffer[bufferOffset + 0]) >> 8;
      this.buffer[bufferOffset + 1] = (a * g + (255 - a) * this.buffer[bufferOffset + 1]) >> 8;
      this.buffer[bufferOffset + 2] = (a * b + (255 - a) * this.buffer[bufferOffset + 2]) >> 8;
    }
  }
}

/**
 * Linearly blends a new pixel with an existing color value in a {@linkcode Canvas}.
 * @description As this method is often called many times in render loops, only bounds
 * checking is applied to the given coordinates.
 *
 * The coordinates are **expected to already be integers**. Supplying numbers with fractions
 * has performance implications. Ensure you're working with integers, or truncate the
 * coordinates before passing them in.
 *
 * The `alpha` value is expected to be an integer in the range from `0` to `255`.
 * `0` meaning fully transparent, `255` meaning fully opaque.
 * @param canvas The {@linkcode Canvas} to interact with.
 * @param x The X coordinate at which to place the pixel.
 * @param y The Y coordinate at which to place the pixel.
 * @param color The color of the pixel.
 * @param alpha The alpha value to use to blend the pixel with existing color at the location.
 * @group Graphics
 */
export const putPixel32 = (canvas: Canvas, x: number, y: number, color: number, alpha: number) => {
  if (canvas.width < x || x < 0 || canvas.height < y || y < 0) {
    return;
  }

  const srcColor = canvas.getPixel32(x, y);
  const newColor = blend(srcColor, color, alpha);
  canvas.setPixel32(x, y, newColor);
};

/**
 * Additively blends a new pixel with an existing color value in a {@linkcode Canvas}.
 * @description As this method is often called many times in render loops, only bounds
 * checking is applied to the given coordinates.
 *
 * The coordinates are **expected to already be integers**. Supplying numbers with fractions
 * has performance implications. Ensure you're working with integers, or truncate the
 * coordinates before passing them in.
 *
 * The `alpha` value is expected to be an integer in the range from `0` to `255`.
 * `0` meaning fully transparent, `255` meaning fully opaque.
 * @param canvas The {@linkcode Canvas} to interact with.
 * @param x The X coordinate at which to place the pixel.
 * @param y The Y coordinate at which to place the pixel.
 * @param color The color of the pixel.
 * @param alpha The alpha value to use to blend the pixel with existing color at the location.
 * @group Graphics
 */
export const putPixel32Add = (
  canvas: Canvas,
  x: number,
  y: number,
  color: number,
  alpha: number,
) => {
  if (canvas.width < x || x < 0 || canvas.height < y || y < 0) {
    return;
  }

  const srcColor = canvas.getPixel32(x, y);
  const newColor = blendAdditive(srcColor, color, alpha);
  canvas.setPixel32(x, y, newColor);
};

/**
 * Subtractively blends a new pixel with an existing color value in a {@linkcode Canvas}.
 * @description As this method is often called many times in render loops, only bounds
 * checking is applied to the given coordinates.
 *
 * The coordinates are **expected to already be integers**. Supplying numbers with fractions
 * has performance implications. Ensure you're working with integers, or truncate the
 * coordinates before passing them in.
 *
 * The `alpha` value is expected to be an integer in the range from `0` to `255`.
 * `0` meaning fully transparent, `255` meaning fully opaque.
 * @param canvas The {@linkcode Canvas} to interact with.
 * @param x The X coordinate at which to place the pixel.
 * @param y The Y coordinate at which to place the pixel.
 * @param color The color of the pixel.
 * @param alpha The alpha value to use to blend the pixel with existing color at the location.
 * @group Graphics
 */
export const putPixel32Sub = (
  canvas: Canvas,
  x: number,
  y: number,
  color: number,
  alpha: number,
) => {
  if (canvas.width < x || x < 0 || canvas.height < y || y < 0) {
    return;
  }

  const srcColor = canvas.getPixel32(x, y);
  const newColor = blendSubtractive(srcColor, color, alpha);
  canvas.setPixel32(x, y, newColor);
};

/**
 * Linearly blends a new pixel with an existing color value in a {@linkcode Canvas}.
 * Compared to {@linkcode putPixel32}, this function supports sub-pixel placement, but is dramatically slower.
 * @param canvas The {@linkcode Canvas} to interact with.
 * @param x The X coordinate at which to place the pixel.
 * @param y The Y coordinate at which to place the pixel.
 * @param color The color of the pixel.
 * @param alpha The alpha value to use to blend the pixel with existing color at the location.
 * @group Graphics
 */
export const putSubPixel32 = (
  canvas: Canvas,
  x: number,
  y: number,
  color: number,
  alpha: number,
) => {
  if (canvas.width < x || x < 0 || canvas.height < y || y < 0) {
    return;
  }

  const xweight = x - Math.trunc(x);
  const yweight = y - Math.trunc(y);
  const xweightn = 1 - xweight;
  const yweightn = 1 - yweight;

  const alpha0 = xweightn * yweightn * alpha;
  const alpha1 = xweight * yweightn * alpha;
  const alpha2 = xweightn * yweight * alpha;
  const alpha3 = xweight * yweight * alpha;

  putPixel32(canvas, x + 0, y + 0, color, alpha0);
  putPixel32(canvas, x + 1, y + 0, color, alpha1);
  putPixel32(canvas, x + 0, y + 1, color, alpha2);
  putPixel32(canvas, x + 1, y + 1, color, alpha3);
};
