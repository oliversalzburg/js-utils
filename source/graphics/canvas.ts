/**
 * The base class for canvas helpers, which also defines a common interface.
 *
 * Derivates of the class might chose to leave implementations of individual methods
 * empty, if it fits their pattern better. For example, one canvas might wrap its
 * context and applications using that canvas will only interact with its interface.
 * Another canvas implementation might expose the context and all give the application
 * full control over the rendering cycle.
 * @group Graphics
 */
export abstract class Canvas {
  /**
   * The canvas element we're interacting with.
   */
  readonly canvasElement: HTMLCanvasElement | OffscreenCanvas;

  /**
   * Retrieves the width of the canvas.
   * @returns The width of the canvas.
   */
  get width(): number {
    return this.canvasElement.width;
  }

  /**
   * Retrieves the height of the canvas.
   * @returns The height of the canvas.
   */
  get height(): number {
    return this.canvasElement.height;
  }

  /**
   * Constructs a new canvas helper.
   * @param canvas - The canvas node to wrap.
   */
  constructor(canvas: HTMLCanvasElement | OffscreenCanvas) {
    this.canvasElement = canvas;
  }

  /**
   * Rebuild rendering pipeline in reaction to a change in the canvas.
   * Usually, when the canvas was resized.
   */
  abstract refreshCanvasNode(): void;

  /**
   * Handle any internal update calls that would be required to present a new frame.
   * Not all implementations will need this.
   */
  abstract update(): void;

  /**
   * Present a new frame.
   * Not all implementations will need this.
   */
  abstract render(): void;

  /**
   * Clear the canvas with the given color.
   * @param color - The color to clear the canvas with.
   */
  abstract clearWith(color: number): void;

  /**
   * Draw FPS information onto the canvas.
   * @param frameTimes - Durations of previous frame draws.
   * @param frameTime - The duration of the previous frame draw.
   * @param timeDelta - The time elapsed since the last frame.
   */
  abstract renderFpsInfo(frameTimes: Array<number>, frameTime: number, timeDelta: number): void;
}
