import { AnyFunction } from "../core.js";
import { Canvas } from "./canvas.js";

/**
 * Conveniently provides a way to have a render loop called at
 * a constant frame rate.
 */
export class RenderLoop {
  readonly canvas: Canvas | undefined;
  readonly renderLoop: AnyFunction;
  private previousTimestamp: number;
  private readonly boundMain: (timestamp: number) => void;

  /**
   * Constructs a new {@link RenderLoop}.
   * @param renderLoop The function to call when a new frame should be drawn.
   * @param canvas When provided, the canvas is automatically updated
   * after a frame was rendered.
   */
  constructor(renderLoop: AnyFunction, canvas?: Canvas) {
    this.canvas = canvas;
    this.renderLoop = renderLoop;
    this.previousTimestamp = 0;
    this.boundMain = this.#main.bind(this);
  }

  /**
   * Our main loop.
   * @param timestamp The current timestamp.
   */
  #main(timestamp: number) {
    const timeDelta = timestamp - this.previousTimestamp;
    this.#drawFrame(timestamp, timeDelta);

    window.requestAnimationFrame(this.boundMain);

    this.previousTimestamp = timestamp;
  }

  /**
   * Draw a new frame.
   * @param timestamp The current timestamp.
   * @param delta The delta to the timestamp of the previous frame.
   */
  #drawFrame(timestamp: number, delta: number) {
    this.renderLoop(this.canvas, delta, timestamp);

    if (!this.canvas) {
      return;
    }

    this.canvas.update();

    const fps = `${Math.round(1000 / delta)}fps`;
    this.canvas.context.strokeStyle = "rgba( 255, 255, 255, 0.85 )";
    this.canvas.context.lineWidth = 5;
    this.canvas.context.strokeText(fps, 4, 14);
    this.canvas.context.fillStyle = "#000000";
    this.canvas.context.fillText(fps, 4, 14);
  }
}
