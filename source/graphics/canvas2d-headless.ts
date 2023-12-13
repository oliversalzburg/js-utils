import { InvalidOperationError } from "../error/InvalidOperationError.js";
import { mustExist } from "../nil.js";
import { Canvas } from "./canvas.js";
import { Canvas2DOptions } from "./canvas2d.js";
import { blend, fromRGBA, getA, getB, getG, getR } from "./core.js";
import { MS_PER_FRAME_60FPS } from "./render-loop.js";

/**
 * An offscreen canvas.
 *
 * This isn't created from a DOM node, but from an existing {@linkcode !OffscreenCanvas}.
 * @group Graphics
 */
export class Canvas2DHeadless extends Canvas {
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
   * Constructs a new {@linkcode Canvas2DHeadless}.
   * @param canvas - The offscreen canvas we're drawing to.
   * @param context - The rendering context to use for the canvas.
   * @param options - The configuration for this canvas.
   */
  constructor(
    canvas: OffscreenCanvas,
    context: OffscreenCanvasRenderingContext2D,
    options: Partial<Canvas2DOptions> = {},
  ) {
    super(canvas);

    this.options = options;

    this.#context = context;
    this.#imageData = this.#context.createImageData(this.width, this.height);
    this.buffer = this.#imageData.data;
  }

  /**
   * Recreate internal buffers in reaction to a change in our target {@linkcode !OffscreenCanvas}.
   */
  refreshCanvasNode() {
    this.#context = mustExist(
      (this.canvasElement as OffscreenCanvas).getContext("2d", {
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
    // Nothing to do here. Everything happens in update().
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
