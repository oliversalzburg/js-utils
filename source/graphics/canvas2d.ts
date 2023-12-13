import { InvalidOperationError } from "../error/InvalidOperationError.js";
import { mustExist } from "../nil.js";
import { Canvas } from "./canvas.js";
import { Canvas2DHeadless } from "./canvas2d-headless.js";
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
import { MS_PER_FRAME_60FPS } from "./render-loop.js";

/**
 * Construction options for a {@linkcode Canvas2D}.
 * @group Graphics
 */
export interface Canvas2DOptions {
  /**
   * Was this {@linkcode Canvas2D} created with the ability to copy the front buffer back into
   * the back buffer?
   */
  readonly supportReadBack: boolean;
}

/**
 * The {@linkcode Canvas2D} is a double-buffered construct to help with drawing to a
 * {@linkcode !HTMLCanvasElement} with best possible performance.
 * We utilize an {@linkcode !OffscreenCanvas} with a {@linkcode !OffscreenCanvasRenderingContext2D}
 * to draw frames and expect to render them back to the DOM in regular intervals.
 * @group Graphics
 */
export class Canvas2D extends Canvas {
  /**
   * The rendering context for the canvas located in the DOM.
   */
  #canvasDomContext: ImageBitmapRenderingContext;

  /**
   * The offscreen canvas we use for rendering.
   */
  #canvasOffscreen: OffscreenCanvas;

  /**
   * The 2D rendering context we're using to draw to the canvas.
   */
  #context: OffscreenCanvasRenderingContext2D;
  /**
   * Retrieves the rendering context of the canvas.
   * @returns The rendering context of the canvas.
   */
  get context(): OffscreenCanvasRenderingContext2D {
    return this.#context;
  }

  /**
   * The {@linkcode !ImageData} object in our offscreen canvas. We usually interact with its
   * {@linkcode Canvas2D.buffer buffer} directly.
   */
  #imageData: ImageData;

  /**
   * Our back buffer.
   */
  buffer: Uint8ClampedArray;

  /**
   * The configuration that was used for this canvas.
   */
  readonly options: Readonly<Partial<Canvas2DOptions>>;

  /**
   * Constructs a new {@linkcode Canvas2D}.
   * @param canvas - The canvas to wrap.
   * @param options - The configuration for this canvas.
   */
  constructor(canvas: HTMLCanvasElement, options: Partial<Canvas2DOptions> = {}) {
    super(canvas);

    this.options = options;

    this.#canvasDomContext = mustExist(
      (this.canvasElement as HTMLCanvasElement).getContext("bitmaprenderer", {
        alpha: false,
      }),
      "Unable to create rendering context for DOM canvas.",
    );

    // Why not .transferControlToOffscreen()?
    // It prevents the consumer from interactively resizing the DOM canvas.
    // We prefer to just have a discrete offscreen buffer, which we can
    // fully control. In testing, the performance impact seemed insignificant.
    this.#canvasOffscreen = new OffscreenCanvas(this.width, this.height);
    this.#context = mustExist(
      this.#canvasOffscreen.getContext("2d", {
        alpha: false,
        desynchronized: true,
        willReadFrequently: this.options.supportReadBack,
      }),
      "Unable to create rendering context for offscreen canvas.",
    );
    this.#imageData = this.#context.createImageData(this.width, this.height);
    this.buffer = this.#imageData.data;
  }

  /**
   * Recreate internal buffers in reaction to a change in our target {@linkcode !HTMLCanvasElement}.
   */
  refreshCanvasNode() {
    this.#canvasOffscreen = new OffscreenCanvas(this.width, this.height);
    this.#context = mustExist(
      this.#canvasOffscreen.getContext("2d", {
        alpha: false,
        desynchronized: true,
        willReadFrequently: this.options.supportReadBack,
      }),
      "Unable to create rendering context for offscreen canvas.",
    );
    this.#imageData = this.#context.createImageData(this.width, this.height);
    this.buffer = this.#imageData.data;
  }

  /**
   * Draw FPS information onto the canvas.
   * @param frameTimes - Durations of previous frame draws.
   * @param frameTime - The duration of the previous frame draw.
   * @param timeDelta - The time elapsed since the last frame.
   */
  renderFpsInfo(frameTimes: Array<number>, frameTime: number, timeDelta: number) {
    const maxFrameTime = frameTimes.reduce((max, frameTime) => {
      if (max < frameTime) {
        max = frameTime;
      }
      return max;
    }, 0);

    const sumFrameTimes = frameTimes.reduce((sum, frameTime) => sum + frameTime, 0);
    const fpsAll = Math.round(frameTimes.length / (sumFrameTimes / 1000)).toString();
    const fpsFrame = 1000 / frameTime;
    const fpsDelta = 1000 / timeDelta;

    let currentX = this.width;
    for (const frameTime of frameTimes) {
      let fillColor = 0x00ff00ff;
      let width = 1;
      if (MS_PER_FRAME_60FPS < frameTime) {
        const quality = frameTime / maxFrameTime;
        fillColor = blend(0x00ff00ff, 0xff0000ff, Math.trunc(quality * 255)) >>> 0;
        width = Math.round(frameTime / MS_PER_FRAME_60FPS);
      }
      this.context.fillStyle = `#${fillColor.toString(16).padStart(8, "0")}`;
      this.context.globalAlpha = 255;
      this.context.fillRect(
        currentX - width,
        this.height,
        width,
        (frameTime / Math.max(100, maxFrameTime)) * -100,
      );
      currentX -= width;
    }

    this.context.beginPath();
    this.context.strokeStyle = "#fff";
    this.context.moveTo(0, this.height - MS_PER_FRAME_60FPS);
    this.context.lineTo(this.width, this.height - MS_PER_FRAME_60FPS);
    this.context.stroke();

    const fpsString = `${Math.round(fpsFrame)}f ${fpsAll}∑ ${Math.round(fpsDelta)}δ`;
    this.context.font = "13px monospace";
    this.context.strokeStyle = "rgba( 255, 255, 255, 1)";
    this.context.textAlign = "right";
    this.context.textRendering = "geometricPrecision";
    this.context.strokeText(fpsString, this.width - 3, this.height - 3);
    this.context.fillStyle = "#000000";
    this.context.fillText(fpsString, this.width - 3, this.height - 3);
  }

  /**
   * Draws the back buffer onto the canvas.
   */
  update() {
    this.#context.putImageData(this.#imageData, 0, 0);
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
   * @param color - The color to fade the buffer with. The alpha component of
   * the color defines how strong the fade is. `0` is not at all, `255` makes
   * it instantly black.
   */
  fade(color = fromRGBA(0, 0, 0, 1)) {
    this.blendWith(color);
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
    this.#imageData = this.#context.getImageData(0, 0, this.width, this.height);
    this.buffer = this.#imageData.data;
  }

  /**
   * Returns the color of a pixel in the back buffer.
   * @param x - The X coordinate to retrieve.
   * @param y - The X coordinate to retrieve.
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
   * @param x - The X coordinate to color.
   * @param y - The Y coordinate to color.
   * @param color - The color to place at the coordinate.
   */
  setPixel32(x: number, y: number, color: number): void {
    const bufferOffset = (x + y * this.width) * 4;
    this.buffer[bufferOffset + 0] = getR(color);
    this.buffer[bufferOffset + 1] = getG(color);
    this.buffer[bufferOffset + 2] = getB(color);
    this.buffer[bufferOffset + 3] = getA(color);
  }

  /**
   * Fills the entire back buffer with the given color.
   * @param color - The color to fill the back buffer with.
   */
  clearWith(color: number): void {
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
   * @param color - The color to fill the back buffer with.
   */
  blendWith(color: number): void {
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
 * Linearly blends a new pixel with an existing color value in a canvas.
 *
 * As this method is often called many times in render loops, only bounds
 * checking is applied to the given coordinates.
 *
 * The coordinates are **expected to already be integers**. Supplying numbers with fractions
 * has performance implications. Ensure you're working with integers, or truncate the
 * coordinates before passing them in.
 *
 * The `alpha` value is expected to be an integer in the range from `0` to `255`.
 * `0` meaning fully transparent, `255` meaning fully opaque.
 * @param canvas - The canvas to interact with.
 * @param x - The X coordinate at which to place the pixel.
 * @param y - The Y coordinate at which to place the pixel.
 * @param color - The color of the pixel.
 * @param alpha - The alpha value to use to blend the pixel with existing color at the location.
 * @group Graphics
 */
export const putPixel32 = (
  canvas: Canvas2D | Canvas2DHeadless,
  x: number,
  y: number,
  color: number,
  alpha: number,
): void => {
  if (canvas.width <= x || x < 0 || canvas.height <= y || y < 0) {
    return;
  }

  const srcColor = canvas.getPixel32(x, y);
  const newColor = blend(srcColor, color, alpha);
  canvas.setPixel32(x, y, newColor);
};

/**
 * Additively blends a new pixel with an existing color value in a canvas.
 *
 * As this method is often called many times in render loops, only bounds
 * checking is applied to the given coordinates.
 *
 * The coordinates are **expected to already be integers**. Supplying numbers with fractions
 * has performance implications. Ensure you're working with integers, or truncate the
 * coordinates before passing them in.
 *
 * The `alpha` value is expected to be an integer in the range from `0` to `255`.
 * `0` meaning fully transparent, `255` meaning fully opaque.
 * @param canvas - The canvas to interact with.
 * @param x - The X coordinate at which to place the pixel.
 * @param y - The Y coordinate at which to place the pixel.
 * @param color - The color of the pixel.
 * @param alpha - The alpha value to use to blend the pixel with existing color at the location.
 * @group Graphics
 */
export const putPixel32Add = (
  canvas: Canvas2D | Canvas2DHeadless,
  x: number,
  y: number,
  color: number,
  alpha: number,
): void => {
  if (canvas.width <= x || x < 0 || canvas.height < y || y < 0) {
    return;
  }

  const srcColor = canvas.getPixel32(x, y);
  const newColor = blendAdditive(srcColor, color, alpha);
  canvas.setPixel32(x, y, newColor);
};

/**
 * Subtractively blends a new pixel with an existing color value in a canvas.
 *
 * As this method is often called many times in render loops, only bounds
 * checking is applied to the given coordinates.
 *
 * The coordinates are **expected to already be integers**. Supplying numbers with fractions
 * has performance implications. Ensure you're working with integers, or truncate the
 * coordinates before passing them in.
 *
 * The `alpha` value is expected to be an integer in the range from `0` to `255`.
 * `0` meaning fully transparent, `255` meaning fully opaque.
 * @param canvas - The canvas to interact with.
 * @param x - The X coordinate at which to place the pixel.
 * @param y - The Y coordinate at which to place the pixel.
 * @param color - The color of the pixel.
 * @param alpha - The alpha value to use to blend the pixel with existing color at the location.
 * @group Graphics
 */
export const putPixel32Sub = (
  canvas: Canvas2D | Canvas2DHeadless,
  x: number,
  y: number,
  color: number,
  alpha: number,
): void => {
  if (canvas.width <= x || x < 0 || canvas.height <= y || y < 0) {
    return;
  }

  const srcColor = canvas.getPixel32(x, y);
  const newColor = blendSubtractive(srcColor, color, alpha);
  canvas.setPixel32(x, y, newColor);
};

/**
 * Linearly blends a new pixel with an existing color value in a canvas.
 * Compared to {@linkcode putPixel32}, this function supports sub-pixel placement, but is dramatically slower.
 * @param canvas - The canvas to interact with.
 * @param x - The X coordinate at which to place the pixel.
 * @param y - The Y coordinate at which to place the pixel.
 * @param color - The color of the pixel.
 * @param alpha - The alpha value to use to blend the pixel with existing color at the location.
 * @group Graphics
 */
export const putSubPixel32 = (
  canvas: Canvas2D | Canvas2DHeadless,
  x: number,
  y: number,
  color: number,
  alpha: number,
): void => {
  if (canvas.width <= x || x < 0 || canvas.height <= y || y < 0) {
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
