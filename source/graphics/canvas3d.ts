import { mustExist } from "../data/nil.js";
import { NotImplementedError } from "../errors/NotImplementedError.js";
import { Canvas } from "./canvas.js";

/**
 * A canvas to interact with WebGL.
 */
export class Canvas3D extends Canvas {
  /**
   * The rendering context of the canvas.
   */
  #context: WebGL2RenderingContext;
  /**
   * Retrieves the rendering context of the canvas.
   * @returns The rendering context of the canvas.
   */
  get context(): WebGL2RenderingContext {
    return this.#context;
  }

  /**
   * Constructs a new {@linkcode Canvas3D}.
   * @param canvas - The canvas to wrap.
   */
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.#context = mustExist(
      this.canvasElement.getContext("webgl2", {
        alpha: false,
      }),
      "Unable to create rendering context for offscreen canvas.",
    );
  }

  /**
   * Recreate internal buffers in reaction to a change in our target {@linkcode !HTMLCanvasElement}.
   */
  refreshCanvasNode() {
    this.#context = mustExist(
      this.canvasElement.getContext("webgl2", {
        alpha: false,
        desynchronized: true,
      }),
      "Unable to create rendering context for offscreen canvas.",
    );
  }

  /**
   * Does nothing.
   */
  update(): void {
    // There is nothing to do here.
  }
  /**
   * Does nothing.
   */
  render(): void {
    // There is nothing to do here.
  }

  /**
   * Not supported.
   * @param _color - Ignored
   */
  clearWith(_color: number): void {
    throw new NotImplementedError();
  }

  /**
   * Not supported.
   * @param _frameTimes - Ignored.
   * @param _frameTime - Ignored.
   * @param _timeDelta - Ignored.
   */
  renderFpsInfo(_frameTimes: Array<number>, _frameTime: number, _timeDelta: number): void {
    throw new NotImplementedError();
  }
}
