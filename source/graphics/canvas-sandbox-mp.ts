import { ConstructorOf } from "../core.js";
import { isNil, mustExist } from "../nil.js";
import { Random } from "../random.js";
import { CanvasSandboxApplication, CanvasSandboxExpectedOptions } from "./canvas-sandbox.js";
import { Canvas } from "./canvas.js";
import { Canvas2DHeadless } from "./canvas2d-headless.js";
import { RenderLoop } from "./render-loop.js";

/**
 * Sent from the host when a worker should reconfigure itself.
 * @group Graphics
 */
export interface CanvasWorkerMessageReconfigure<
  TApplicationOptions extends CanvasSandboxExpectedOptions,
> {
  /**
   * Type identifier of this message.
   */
  type: "reconfigure";

  /**
   * New ID for the worker.
   */
  id: string;

  /**
   * New canvas for the worker to use.
   */
  canvas: OffscreenCanvas;

  /**
   * New application options to use.
   */
  options: TApplicationOptions;
}

/**
 * Sent from the host when a worker should start its rendering kernel.
 * @group Graphics
 */
export interface CanvasWorkerMessageStart<
  TApplicationOptions extends CanvasSandboxExpectedOptions,
> {
  /**
   * Type identifier of this message.
   */
  type: "start";

  /**
   * New application options to use before starting.
   */
  options: TApplicationOptions;
}

/**
 * Sent from a worker when it finished rendering the current scene.
 * @group Graphics
 */
export interface CanvasWorkerSceneFinishMessage {
  /**
   * Type identifier of this message.
   */
  type: "sceneFinish";

  /**
   * Point in time when the scene finished rendering.
   */
  timestamp: number;
}

/**
 * The messages that are passed between the canvas sandbox host and its workers.
 * @group Graphics
 */
export type CanvasWorkerMessage<TApplicationOptions extends CanvasSandboxExpectedOptions> =
  | CanvasWorkerMessageReconfigure<TApplicationOptions>
  | CanvasWorkerMessageStart<TApplicationOptions>
  | CanvasWorkerSceneFinishMessage;

/**
 * The canvas worker handles a web worker instance in the canvas sandbox host.
 *
 * It provides a thin abstraction over the web worker IPC messaging.
 * @group Graphics
 */
export class CanvasWorker<
  TApplicationOptions extends CanvasSandboxExpectedOptions,
> extends EventTarget {
  /**
   * The ID of this worker.
   */
  id: string;

  /**
   * The canvas element that this worker should handle.
   */
  canvas: HTMLCanvasElement | undefined;

  /**
   * The offscreen canvas that we created for this worker.
   */
  canvasOffscreen: OffscreenCanvas | undefined;

  /**
   * The application options for the worker.
   *
   * These are usually very similar, if not identical, to the host application options.
   * Workers just usually get a different viewport assigned to them, correlating with the
   * canvas element in the DOM that they draw to.
   */
  readonly options: TApplicationOptions;

  /**
   * The web worker instance itself.
   */
  readonly workerInstance: Worker;

  /**
   * Constructs a new canvas worker.
   * @param id - The ID of the worker.
   * @param source - The code that the worker should run. It's common to use a hybrid code module
   * for as the sandbox application. This means the code of the host and the workers is identical,
   * they just construct different code path on load/init. In such case, the source can simply be
   * `new URL(import.meta.url)`.
   * @param canvas - The canvas element to draw to.
   * @param options - The application options.
   */
  constructor(id: string, source: URL, canvas: HTMLCanvasElement, options: TApplicationOptions) {
    super();

    this.id = id;
    this.canvas = canvas;
    this.options = options;

    this.workerInstance = new Worker(source, {
      type: "module",
    });
    this.workerInstance.onmessage = (
      message: MessageEvent<CanvasWorkerMessage<TApplicationOptions>>,
    ) => {
      this.dispatchEvent(new CustomEvent(message.data.type));
    };
  }

  /**
   * Posts a message to the worker.
   *
   * As messages to workers are _posted_ instead of _sent_, there is no delivery feedback.
   * @param message - The message to post.
   * @param transfer - The transferables to transfer to the worker with this message.
   */
  postMessage(
    message: CanvasWorkerMessage<TApplicationOptions>,
    transfer?: Array<Transferable>,
  ): void {
    this.workerInstance.postMessage(message, transfer ?? []);
  }
}

/**
 * The canvas worker instance handles a web worker instance in worker instance itself, and
 * handles a feedback channel to the host application.
 *
 * It provides a thin abstraction over the web worker IPC messaging.
 *
 * ```ts
 * // Construct inside of worker from global scope and rendering kernel class.
 * const worker = new CanvasWorkerInstance(self, RenderKernel);
 * // Listen to custom events (messages) you send from the host.
 * worker.addEventListener("fade", () => worker.renderKernel?.fadeOut());
 * ```
 * @group Graphics
 */
export class CanvasWorkerInstance<
  TCanvas extends Canvas2DHeadless,
  TApplicationOptions extends CanvasSandboxExpectedOptions,
  TKernel extends CanvasSandboxApplication<TCanvas, TApplicationOptions>,
> extends EventTarget {
  /**
   * The global scope of the worker.
   */
  readonly self: typeof globalThis;

  /**
   * The ID of the worker.
   */
  id: string;

  /**
   * The rendering kernel, which produces frames, and renders them to our
   * offscreen canvas.
   */
  renderKernel: TKernel | undefined;

  /**
   * The canvas element we're presenting to.
   */
  canvas: TCanvas | undefined;

  /**
   * The offscreen canvas we're rendering to.
   */
  offscreenCanvas: OffscreenCanvas | undefined;

  /**
   * Our rendering context to draw to.
   */
  offscreenContext: OffscreenCanvasRenderingContext2D | undefined;

  /**
   * Manages frame rendering timing.
   */
  renderLoop: RenderLoop | undefined;

  /**
   * Constructor of our rendering kernel.
   */
  readonly #Kernel: ConstructorOf<TKernel>;

  /**
   * Constructs a new canvas worker instance.
   *
   * Note that many properties are only initialized after the host sent an
   * initialization message.
   * @param self - Our global worker scope.
   * @param Kernel - The rendering kernel class to construct.
   */
  constructor(self: typeof globalThis, Kernel: ConstructorOf<TKernel>) {
    super();

    this.self = self;
    this.id = "<unassigned>";
    this.#Kernel = Kernel;

    self.onmessage = (message: MessageEvent<CanvasWorkerMessage<TApplicationOptions>>) => {
      if (message.data.type === "start") {
        const startMessage = message.data;
        this.start(startMessage.options);
      } else if (message.data.type === "reconfigure") {
        const reconfigureMessage = message.data;
        this.reconfigure(
          reconfigureMessage.id,
          reconfigureMessage.canvas,
          reconfigureMessage.options,
        );
      } else {
        this.dispatchEvent(new CustomEvent(message.data.type));
      }
    };
  }

  /**
   * Render a frame.
   * @param delta - How many milliseconds have passed since the last invocation?
   */
  render = (delta: number): void => {
    this.renderKernel?.onDraw(delta, new Date().valueOf());
  };

  /**
   * Reconfigure the worker.
   * @param id - New ID for this worker.
   * @param canvas - New canvas to render to.
   * @param options - New application options.
   */
  reconfigure(id: string, canvas: OffscreenCanvas, options: TApplicationOptions): void {
    this.renderLoop?.block();
    this.id = id;
    this.offscreenCanvas = canvas;
    this.offscreenContext = mustExist(this.offscreenCanvas.getContext("2d"));
    this.canvas = new Canvas2DHeadless(this.offscreenCanvas, this.offscreenContext) as TCanvas;
    this.renderLoop = new RenderLoop(this.render, this.canvas);
    if (isNil(this.renderKernel)) {
      this.renderKernel = new this.#Kernel(this, canvas, options);
    } else {
      this.renderKernel.reconfigure(this.canvas, options);
    }
  }

  /**
   * Start rendering.
   * @param options - New application options.
   */
  start(options: TApplicationOptions): void {
    if (!this.renderKernel) {
      return;
    }

    this.renderKernel.random = new Random(options.seed);
    this.renderKernel.start(options);

    this.renderLoop?.unblock();
  }

  /**
   * Posts a message to the host.
   * @param message - The message to post.
   */
  postMessage(message: CanvasWorkerMessage<TApplicationOptions>) {
    this.self.postMessage(message);
  }
}

/**
 * Base class for multi-process canvas sandbox applications.
 *
 * Helps in orchestrating the workers.
 * @group Graphics
 */
export abstract class CanvasSandboxHostApplication<
  TCanvas extends Canvas,
  TApplicationOptions extends CanvasSandboxExpectedOptions,
> implements CanvasSandboxApplication<TCanvas, TApplicationOptions>
{
  /**
   * Usually a hidden canvas that serves as a proxy for canvas sandbox events.
   */
  canvas: TCanvas;

  /**
   * Application options.
   */
  options: TApplicationOptions;

  /**
   * PRNG instance for the application.
   */
  random: Random;

  /**
   * Is the application running right now?
   */
  paused = false;

  /**
   * Web worker instances.
   */
  readonly workers = new Array<CanvasWorker<TApplicationOptions>>();

  /**
   * Construct a new host application.
   * @param canvas - Usually a hidden canvas in the DOM to serve as an event proxy.
   * @param options - Application options.
   */
  constructor(canvas: TCanvas, options: TApplicationOptions) {
    this.options = options;
    this.canvas = canvas;
    this.random = new Random(options.seed);
    this.reconfigure(canvas, options);
  }

  /**
   * Reconfigure the application with the given options and restart it.
   * @param canvas - The canvas to use.
   * @param options - The new options to use.
   */
  abstract reconfigure(canvas: TCanvas, options?: Partial<TApplicationOptions>): void;

  /**
   * Request the application to draw a new frame.
   * This call has no effect in a host application, as all rendering happens in the workers.
   * @param _delta - How many milliseconds passed since the last frame draw.
   * @param _timestamp - The current timestamp.
   */
  onDraw(_delta: number, _timestamp: number) {
    // Draws happen in workers.
  }

  /**
   * Start the application.
   */
  start() {
    this.paused = false;

    for (const worker of this.workers) {
      worker.postMessage({
        type: "start",
        options: {
          ...this.options,
          seed: this.random.seed,
          viewport: worker.options.viewport,
        },
      } as CanvasWorkerMessageStart<TApplicationOptions>);
    }
  }

  /**
   * Posts a message to all workers.
   * @param message - Message to post to all workers.
   */
  postMessageAll(message: CanvasWorkerMessage<TApplicationOptions>) {
    for (const worker of this.workers) {
      worker.postMessage(message);
    }
  }
}
