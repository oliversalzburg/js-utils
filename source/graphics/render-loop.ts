import { Canvas } from "./canvas.js";

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
  private previousTimestampRender: number;

  /**
   * Our `#main` function bound to this classes
   * for easier invokation through external callers.
   */
  private readonly boundMain: (timestamp: number) => void;

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
   * @param renderLoop The function to call when a new frame should be drawn.
   * @param canvas The {@linkcode Canvas} we're rendering to.
   * @param options The configuration for thie {@linkcode RenderLoop}.
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
    this.previousTimestampRender = this.previousTimestampDraw;
    this.boundMain = this.#main.bind(this);
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
    this.frameRequestId = window.requestAnimationFrame(this.boundMain);
    if (!this.drawTimeout) {
      this.drawTimeout = setTimeout(() => {
        this.#drawFrame();
      });
    }
  }

  /**
   * Our main loop, as invoked through the frame request.
   * @param timestamp The current timestamp.
   */
  #main(timestamp: number) {
    const timeDelta = timestamp - this.previousTimestampRender;

    this.#renderFrame(timeDelta);
    this.unblock();

    this.previousTimestampRender = timestamp;
    ++this.#frameCounter;
  }

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

    this.previousTimestampDraw = timestamp;

    this.drawTimeout = setTimeout(() => {
      this.#drawFrame();
    });
  }

  /**
   * Draw a new frame.
   * @param delta The delta to the timestamp of the previous frame.
   */
  #renderFrame(delta: number) {
    this.canvas.update();

    if (this.options.onRefresh === "clear") {
      this.canvas.clearWith(0);
    }

    if (this.options.drawFps) {
      const fps = `${Math.round(1000 / delta)}fps`;
      this.canvas.context.strokeStyle = "rgba( 255, 255, 255, 0.85 )";
      this.canvas.context.lineWidth = 5;
      this.canvas.context.strokeText(fps, 4, 14);
      this.canvas.context.fillStyle = "#000000";
      this.canvas.context.fillText(fps, 4, 14);
    }

    this.canvas.render();
  }
}
