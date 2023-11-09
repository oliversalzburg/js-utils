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
  readonly canvas: Canvas | undefined;

  /**
   * A function that we call when a new frame should be drawn.
   */
  readonly renderLoop: RenderLoopCallback;

  /**
   * The configuration that was used for this render loop.
   */
  readonly options: Readonly<Partial<RenderLoopOptions>>;

  /**
   * The timestamp we got for the previous frame.
   */
  private previousTimestamp: number;

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
    this.previousTimestamp = 0;
    this.boundMain = this.#main.bind(this);
  }

  /**
   * Stop the render loop.
   */
  block() {
    if (this.frameRequestId === null) {
      return;
    }

    window.cancelAnimationFrame(this.frameRequestId);
    this.frameRequestId = null;
  }

  /**
   * Start the render loop.
   */
  unblock() {
    this.frameRequestId = window.requestAnimationFrame(this.boundMain);
  }

  /**
   * Our main loop.
   * @param timestamp The current timestamp.
   */
  #main(timestamp: number) {
    const timeDelta = timestamp - this.previousTimestamp;
    this.#drawFrame(timestamp, timeDelta);

    this.unblock();

    this.previousTimestamp = timestamp;
  }

  /**
   * Draw a new frame.
   * @param timestamp The current timestamp.
   * @param delta The delta to the timestamp of the previous frame.
   */
  #drawFrame(timestamp: number, delta: number) {
    this.renderLoop(delta, timestamp);

    if (!this.canvas) {
      return;
    }

    this.canvas.update();

    if (this.options.drawFps) {
      const fps = `${Math.round(1000 / delta)}fps`;
      this.canvas.context.strokeStyle = "rgba( 255, 255, 255, 0.85 )";
      this.canvas.context.lineWidth = 5;
      this.canvas.context.strokeText(fps, 4, 14);
      this.canvas.context.fillStyle = "#000000";
      this.canvas.context.fillText(fps, 4, 14);
    }
  }
}
