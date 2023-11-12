import { prepareAsyncContext } from "../async.js";
import { Random } from "../random.js";
import { Canvas } from "./canvas.js";
import { nextPalette } from "./core.js";
import { RenderLoop } from "./render-loop.js";

/**
 * The options your application has to accept so it can interact with the {@linkcode CanvasSandbox}.
 * @group Graphics
 */
export interface CanvasSandboxExpectedOptions {
  /**
   * Should your application run in dark mode?
   * You can ignore this setting and produce any colored output you want,
   * but the setting will be toggeled by the sandbox according to the user's
   * browser/OS preference.
   */
  darkMode: boolean;

  /**
   * The seed for the PRNG.
   */
  seed: string;
}

/**
 * Describes an application running inside the {@linkcode CanvasSandbox}.
 * @template {CanvasSandboxExpectedOptions} TApplicationOptions The type of the options object
 * with which the application is constructed.
 * @group Graphics
 */
export interface CanvasSandboxApplication<
  TApplicationOptions extends CanvasSandboxExpectedOptions,
> {
  /**
   * The options with which the application was constructed.
   */
  options: TApplicationOptions;

  /**
   * The PRNG used in this application.
   */
  random: Random;

  /**
   * Is the application currently paused?
   * Should be get/set, but can also be ignored, if the feature isn't used.
   */
  paused: boolean;

  /**
   * Request the application to draw a new frame.
   * @param delta How many milliseconds passed since the last frame draw.
   * @param timestamp The current timestamp.
   */
  onDraw(delta: number, timestamp: number): void;

  /**
   * Reconfigure the application with the given options and restart it.
   * @param canvas The canvas to use.
   * @param options The new options to use.
   */
  reconfigure(canvas: Canvas, options: Partial<TApplicationOptions>): void;

  /**
   * Start the application.
   */
  start(): void;
}

/**
 * The {@linkcode CanvasSandbox} provides a scaffold to quickly perform experiments
 * with a {@linkcode !HTMLCanvasElement} in a document. Common functionality for such
 * experiments is implemented in the sandbox already.
 * @example
 * ```ts
 * import { Random, seedFromString } from "@oliversalzburg/js-utils/lib/random.js";
 * import { Canvas } from "@oliversalzburg/js-utils/lib/graphics/canvas.js";
 * import { getDocumentElementTypeById } from "@oliversalzburg/js-utils/lib/dom/core.js";
 * import { CanvasSandbox } from "@oliversalzburg/js-utils/lib/graphics/canvas-sandbox.js";
 *
 * class Application {
 *   canvas: Canvas;
 *   options: {
 *     seed: number;
 *   }
 *   random: Random;
 *
 *   constructor(canvas:Canvas, options: {seed: number}) {
 *     this.canvas = canvas;
 *     this.options = options;
 *     this.random = new Random(seedFromString(options.seed));
 *   }
 *   reconfigure(canvas:Canvas, options: {seed: number}) {
 *     this.canvas = canvas;
 *     this.options = options;
 *     this.random = new Random(seedFromString(options.seed));
 *   }
 *   onDraw(delta:number, timestamp:number) {
 *     // draw something on `this.canvas`
 *   }
 *   start() {}
 * }
 *
 * const canvasNode = getDocumentElementTypeById(document, "main", HTMLCanvasElement);
 * const canvasSandbox = new CanvasSandbox(window, canvasNode, Application, applicationOptions);
 * canvasSandbox.run();
 * ```
 * @group Graphics
 */
export class CanvasSandbox<TApplicationOptions extends CanvasSandboxExpectedOptions> {
  /**
   * The window the sandbox is running in.
   */
  readonly window: Window;

  /**
   * The document the sandbox is interacting with.
   */
  readonly document: Document;

  /**
   * The application running inside the sandbox.
   */
  readonly application: CanvasSandboxApplication<TApplicationOptions>;

  /**
   * The canvas node that we're drawing into.
   */
  readonly canvasNode: HTMLCanvasElement;

  /**
   * Our convenience canvas wrapper, which we provide to the application
   * to render to.
   */
  readonly canvas: Canvas;

  /**
   * The render loop we use to control frame rendering.
   */
  readonly renderLoop: RenderLoop;

  /**
   * Construct a new {@linkcode CanvasSandbox}.
   * @param window The window we're running inside.
   * @param canvasNode The canvas node we're drawing to.
   * @param Application The application that is going to run in the sandbox.
   * @param options The options that the application should be constructed with.
   */
  constructor(
    window: Window,
    canvasNode: HTMLCanvasElement,
    Application: new (
      canvas: Canvas,
      options: TApplicationOptions,
    ) => CanvasSandboxApplication<TApplicationOptions>,
    options: TApplicationOptions,
  ) {
    this.window = window;
    this.document = window.document;
    this.canvasNode = canvasNode;
    this.canvas = new Canvas(canvasNode);

    this.application = new Application(this.canvas, options);
    const applicationOnDraw = this.application.onDraw.bind(this.application);
    this.renderLoop = new RenderLoop(applicationOnDraw, this.canvas, { drawFps: true });

    this.#hookWindow();
    this.#hookBody();
    this.#hookCanvas();

    const systemPrefersDarkMode = this.window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (systemPrefersDarkMode) {
      this.toDarkMode();
    } else {
      this.toLightMode();
    }
  }

  /**
   * Run the sandbox.
   */
  run() {
    this.application.start();
    this.renderLoop.unblock();
  }

  /**
   * Create event listeners on the document `body`.
   */
  #hookBody() {
    this.document.body.addEventListener(
      "click",
      prepareAsyncContext(async (event: MouseEvent) => {
        if (event.defaultPrevented) {
          return;
        }

        if (!this.document.fullscreenEnabled) {
          return;
        }

        if (!this.document.fullscreenElement) {
          await this.canvasNode.requestFullscreen();
        }
      }),
    );

    this.document.body.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 13:
          // Enter
          nextPalette();
          this.application.reconfigure(this.canvas, {
            seed: this.application.random.next().toString(),
          } as Partial<TApplicationOptions>);
          this.application.start();
          break;

        case 32:
          // Space
          this.application.paused = !this.application.paused;
          break;
      }
    });
  }

  /**
   * Create event listeners on the canvas node in the document.
   */
  #hookCanvas() {
    this.canvasNode.addEventListener(
      "click",
      prepareAsyncContext(async (event: MouseEvent) => {
        if (this.document.fullscreenElement) {
          await document.exitFullscreen();
          return;
        }

        nextPalette();
        this.application.reconfigure(this.canvas, {
          seed: this.application.random.next().toString(),
        } as Partial<TApplicationOptions>);
        this.application.start();
        event.preventDefault();
      }),
    );
  }

  /**
   * Create event listeners on the window we're running in.
   */
  #hookWindow() {
    this.window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches }) => {
        if (matches) {
          this.toDarkMode();
        } else {
          this.toLightMode();
        }
      });
  }

  /**
   * Switch the sandbox to dark mode.
   */
  toDarkMode() {
    this.application.reconfigure(this.canvas, {
      darkMode: true,
    } as Partial<TApplicationOptions>);
    document.body.classList.add("darkMode");
    document.body.classList.remove("lightMode");
  }

  /**
   * Switch the sandbox to light mode.
   */
  toLightMode() {
    this.application.reconfigure(this.canvas, {
      darkMode: false,
    } as Partial<TApplicationOptions>);
    document.body.classList.add("lightMode");
    document.body.classList.remove("darkMode");
  }
}
