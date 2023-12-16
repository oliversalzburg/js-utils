import { Canvas } from "./canvas.js";

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
   * @param canvas - The canvas we're rendering to.
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
      cancelAnimationFrame(this.frameRequestId);
      this.frameRequestId = null;
    }

    if (this.drawTimeout !== null) {
      clearTimeout(this.drawTimeout);
      this.drawTimeout = null;
    }
  }

  /**
   * Start the render loop.
   */
  unblock() {
    this.frameRequestId = requestAnimationFrame(this.#boundDrawFrame);
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

    if (this.options.onRefresh === "clear") {
      this.canvas.clearWith(0);
    }

    this.renderLoop(timeDelta, timestamp);

    const frameTime = new Date().getTime() - timestamp;

    if (this.options.drawFps) {
      const recordCount = this.#frameTimes.unshift(frameTime);
      if (10000 < recordCount) {
        this.#frameTimes.splice(5000, 5000);
      }
    }

    this.previousTimestampDraw = timestamp;

    this.canvas.update();

    if (this.options.drawFps) {
      this.canvas.renderFpsInfo(this.#frameTimes, frameTime, timeDelta);
    }

    this.canvas.render();

    this.unblock();

    this.previousTimestampPresent = timestamp;
    ++this.#frameCounter;
  }
}
