import { Canvas } from "./canvas.js";
import { blend } from "./core.js";

/**
 * The amount of milliseconds your can spend in a frame, if you want to
 * reach a frame rate of 60 FPS.
 * @group Graphics
 */
export const MS_PER_FRAME_60FPS = /* __PURE __ */ 1000 / 60;

/**
 * The signature of a function that is called to draw a frame.
 * @group Graphics
 */
export type RenderLoopCallback = (delta: number, timestamp: number) => unknown;

/**
 * Configuration for a {@linkcode RenderLoop},
 * @group Graphics
 */
export interface RenderLoopOptions {
  /**
   * Should the current frames per second be rendered onto the canvas
   * each frame?
   */
  drawFps: boolean;

  /**
   * Should the buffer be cleared or faded to black before each frame?
   */
  onRefresh: "clear";
}

/**
 * Conveniently provides a way to have a render loop called at
 * a constant frame rate.
 * @group Graphics
 */
export class RenderLoop {
  /**
   * The {@linkcode Canvas} we're rendering to.
   */
  readonly canvas: Canvas;

  /**
   * A function that we call when a new frame should be drawn.
   */
  readonly renderLoop: RenderLoopCallback;

  /**
   * The configuration that was used for this render loop.
   */
  readonly options: Readonly<Partial<RenderLoopOptions>>;

  /**
   * The time at which we drew the last frame to the offscreen buffer.
   */
  private previousTimestampDraw: number;

  /**
   * The time at which we rendered the last frame to the DOM.
   */
  private previousTimestampPresent: number;

  /**
   * Our `#drawFrame` function bound to this classes
   * for easier invokation through external callers.
   */
  readonly #boundDrawFrame: () => void;

  /**
   * The ID of our {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame requestAnimationFrame} request.
   */
  private frameRequestId: number | null = null;

  /**
   * The ID of our {@linkcode https://developer.mozilla.org/en-US/docs/Web/API/setTimeout setTimeout}-based
   * offscreen rendering loop.
   */
  private drawTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * How many frames we've drawn to the DOM throughout the loops lifetime.
   */
  #frameCounter = 0;

  /**
   * Retrieves the amount of frames drawn to the DOM throughout the loops lifetime.
   * @returns The frame count.
   */
  get frameCounter() {
    return this.#frameCounter;
  }

  /**
   * Constructs a new {@linkcode RenderLoop}.
   * @param renderLoop - The function to call when a new frame should be drawn.
   * @param canvas - The {@linkcode Canvas} we're rendering to.
   * @param options - The configuration for thie {@linkcode RenderLoop}.
   */
  constructor(
    renderLoop: RenderLoopCallback,
    canvas: Canvas,
    options: Partial<RenderLoopOptions> = {},
  ) {
    this.canvas = canvas;
    this.options = options;
    this.renderLoop = renderLoop;
    this.previousTimestampDraw = new Date().getTime();
    this.previousTimestampPresent = this.previousTimestampDraw;
    this.#boundDrawFrame = this.#drawFrame.bind(this);
  }

  /**
   * Stop the render loop.
   */
  block() {
    if (this.frameRequestId !== null) {
      window.cancelAnimationFrame(this.frameRequestId);
      this.frameRequestId = null;
    }

    if (this.drawTimeout !== null) {
      window.clearTimeout(this.drawTimeout);
      this.drawTimeout = null;
    }
  }

  /**
   * Start the render loop.
   */
  unblock() {
    this.frameRequestId = window.requestAnimationFrame(this.#boundDrawFrame);
  }

  /**
   * The duration it took to produce previous frames.
   * This is used for the frame graph.
   */
  #frameTimes: Array<number> = [];

  /**
   * Draws a new frame to the offscreen buffer.
   */
  #drawFrame(): void {
    if (this.frameRequestId === null) {
      return;
    }

    const timestamp = new Date().getTime();
    const timeDelta = timestamp - this.previousTimestampDraw;

    this.renderLoop(timeDelta, timestamp);

    const frameTime = new Date().getTime() - timestamp;

    if (this.options.drawFps) {
      this.#frameTimes.push(frameTime);
    }

    this.previousTimestampDraw = timestamp;

    this.canvas.update();

    if (this.options.onRefresh === "clear") {
      this.canvas.clearWith(0);
    }

    if (this.options.drawFps) {
      const maxFrameTime = this.#frameTimes.reduce((max, frameTime) => {
        if (max < frameTime) {
          max = frameTime;
        }
        return max;
      }, 0);
      const sumFrameTimes = this.#frameTimes.reduce((sum, frameTime) => sum + frameTime, 0);
      const fpsAll = Math.round(this.#frameTimes.length / (sumFrameTimes / 1000)).toString();
      const fpsFrame = 1000 / frameTime;
      const fpsDelta = 1000 / timeDelta;

      this.#frameTimes.splice(0, this.#frameTimes.length - this.canvas.width);
      const frameTimes = this.#frameTimes.toReversed();

      let currentX = this.canvas.width;
      for (const frameTime of frameTimes) {
        let fillColor = 0x00ff00ff;
        let width = 1;
        if (MS_PER_FRAME_60FPS < frameTime) {
          const quality = frameTime / maxFrameTime;
          fillColor = blend(0x00ff00ff, 0xff0000ff, Math.trunc(quality * 255)) >>> 0;
          width = Math.round(frameTime / MS_PER_FRAME_60FPS);
        }
        this.canvas.context.fillStyle = `#${fillColor.toString(16).padStart(8, "0")}`;
        this.canvas.context.globalAlpha = 255;
        this.canvas.context.fillRect(
          currentX - width,
          this.canvas.height,
          width,
          (frameTime / Math.max(100, maxFrameTime)) * -100,
        );
        currentX -= width;
      }

      this.canvas.context.beginPath();
      this.canvas.context.strokeStyle = "#fff";
      this.canvas.context.moveTo(0, this.canvas.height - MS_PER_FRAME_60FPS);
      this.canvas.context.lineTo(this.canvas.width, this.canvas.height - MS_PER_FRAME_60FPS);
      this.canvas.context.stroke();

      const fpsString = `${Math.round(fpsFrame)}f ${fpsAll}∑ ${Math.round(fpsDelta)}δ`;
      this.canvas.context.font = "13px monospace";
      this.canvas.context.strokeStyle = "rgba( 255, 255, 255, 1)";
      this.canvas.context.textAlign = "right";
      this.canvas.context.textRendering = "geometricPrecision";
      this.canvas.context.strokeText(fpsString, this.canvas.width - 3, this.canvas.height - 3);
      this.canvas.context.fillStyle = "#000000";
      this.canvas.context.fillText(fpsString, this.canvas.width - 3, this.canvas.height - 3);
    }

    this.canvas.render();

    this.unblock();

    this.previousTimestampPresent = timestamp;
    ++this.#frameCounter;
  }
}
