import { getDocumentElementTypeById } from "../dom/core.js";
import { Random } from "../random.js";
import { Canvas } from "./canvas.js";
import { nextPalette } from "./core.js";
import { RenderLoop } from "./render-loop.js";

/**
 * Provides the input as-is.
 * This method exists only to make use of the `css` template string tag,
 * which allows us to use in-IDE support for CSS through the support for
 * {@link https://lit.dev/docs/components/styles/ Lit styles}.
 * @param input The CSS code.
 * @returns The CSS code as-is.
 */
const css = (input: TemplateStringsArray) => input.join("");

/**
 * The CSS we inject into the document, if requested.
 * @group Graphics
 */
export const CANVAS_SANDBOX_DEFAULT_CSS = /* PURE */ css`
  html,
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: #808080;
  }

  body {
    transition: background-color 1s ease-in-out;
  }
  body.darkMode {
    background-color: #211f1f;
  }
  body.lightMode {
    background-color: #ebdcdc;
  }

  #main {
    display: block;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    filter: drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5));
    transition: all 1s;
  }
`;

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
  reconfigure(canvas: Canvas, options?: Partial<TApplicationOptions>): void;

  /**
   * Start the application.
   */
  start(): void;
}

/**
 * Options for a {@linkcode CanvasSandbox}.
 * @group Graphics
 */
export interface CanvasSandboxOptions {
  /**
   * Should the sandbox render developer information?
   * @default false
   */
  devMode: boolean;

  /**
   * Should the sandbox default CSS be injected into the body?
   * @default true
   */
  injectDefaultCss: boolean;
}

/**
 * The {@linkcode CanvasSandbox} provides a scaffold to quickly perform experiments
 * with a {@linkcode !HTMLCanvasElement} in a document. Common functionality for such
 * experiments is implemented in the sandbox already.
 * @example
 * ### `main.ts`
 * ```ts
 * import { Random, seedFromString } from "@oliversalzburg/js-utils/lib/random.js";
 * import { Canvas } from "@oliversalzburg/js-utils/lib/graphics/canvas.js";
 * import { getDocumentElementTypeByIdStrict } from "@oliversalzburg/js-utils/lib/dom/core.js";
 * import { CanvasSandbox } from "@oliversalzburg/js-utils/lib/graphics/canvas-sandbox.js";
 *
 * interface ApplicationOptions {
 *   seed: string;
 *   somethingElse: number;
 * }
 *
 * class Application {
 *   canvas: Canvas;
 *   options: ApplicationOptions;
 *   random: Random;
 *
 *   constructor(canvas:Canvas, options: ApplicationOptions) {
 *     this.canvas = canvas;
 *     this.options = options;
 *     this.random = new Random(seedFromString(options.seed));
 *   }
 *
 *   reconfigure(canvas:Canvas, options: Partial<ApplicationOptions> = {}) {
 *     this.canvas = canvas;
 *     this.options = { ...this.options, ...options };
 *     this.random = new Random(seedFromString(options.seed));
 *   }
 *
 *   onDraw(delta:number, timestamp:number) {
 *     // draw something on `this.canvas`
 *   }
 *
 *   start() {}
 * }
 *
 * const canvasNode = getDocumentElementTypeByIdStrict(document, "main", HTMLCanvasElement);
 * const canvasSandbox = new CanvasSandbox(
 *   window,
 *   canvasNode,
 *   Application,
 *   {seed: "foo", somethingElse: 12345}
 * );
 *
 * // By running the sandbox, your `start()` and `onDraw()` methods will automatically be invoked
 * // by the sandbox. You shouldn't invoke those methods directly from your own code.
 * canvasSandbox.run();
 * ```
 * ### `index.html`
 * ```html
 * <!doctype html>
 * <html>
 *   <head>
 *     <meta charset="UTF-8" />
 *   </head>
 *
 *   <body>
 *     <canvas id="main" class="darkMode" width="512" height="512"></canvas>
 *   </body>
 *   <script src="main.ts" type="module"></script>
 * </html>
 * ```
 * @template {CanvasSandboxExpectedOptions} TApplicationOptions The type of the options
 * the application in the sandbox will be constructed with.
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
   * The handle that keeps track of debouncing of `resize` events.
   */
  #resizeDebounce: number | null = null;

  /**
   * Construct a new {@linkcode CanvasSandbox}.
   * @param window The window we're running inside.
   * @param canvasNode The canvas node we're drawing to.
   * @param Application The application that is going to run in the sandbox.
   * @param options The options that the application should be constructed with.
   * @param sandboxOptions The options for the sandbox itself.
   */
  constructor(
    window: Window,
    canvasNode: HTMLCanvasElement,
    Application: new (
      /**
       * The canvas that the application will receive.
       */
      canvas: Canvas,
      /**
       * The options that will be passed to the application.
       */
      options: TApplicationOptions,
    ) => CanvasSandboxApplication<TApplicationOptions>,
    options: TApplicationOptions,
    sandboxOptions?: CanvasSandboxOptions,
  ) {
    this.window = window;
    this.document = window.document;
    this.canvasNode = canvasNode;
    this.canvas = new Canvas(canvasNode);

    if (sandboxOptions?.injectDefaultCss ?? true) {
      this.injectDefaultCss();
    }

    this.application = new Application(this.canvas, options);
    const applicationOnDraw = this.application.onDraw.bind(this.application);
    this.renderLoop = new RenderLoop(applicationOnDraw, this.canvas, {
      drawFps: sandboxOptions?.devMode,
    });

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
   * Injects our default CSS into the document, if it hasn't already been injected.
   * @see {@linkcode CANVAS_SANDBOX_DEFAULT_CSS}
   */
  injectDefaultCss(): void {
    const existingStyle = getDocumentElementTypeById(
      this.document,
      "canvas-sandbox-styles",
      HTMLStyleElement,
    );
    if (existingStyle) {
      return;
    }
    const styleNode = this.document.createElement("style");
    styleNode.textContent = CANVAS_SANDBOX_DEFAULT_CSS;
    this.document.head.appendChild(styleNode);
  }

  /**
   * Run the sandbox.
   */
  run() {
    this.application.start();
    // In case the application doesn't maintain this state itself.
    this.application.paused = false;
    this.renderLoop.unblock();
  }

  /**
   * Create event listeners on the document `body`.
   */
  #hookBody() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.document.body.addEventListener("click", async (event: MouseEvent) => {
      if (event.defaultPrevented) {
        return;
      }

      if (!this.document.fullscreenEnabled) {
        return;
      }

      if (!this.document.fullscreenElement) {
        await this.canvasNode.requestFullscreen();
      }
    });

    this.document.body.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 13:
          // Enter
          nextPalette();
          this.#reconfigureApplication({
            seed: this.application.random.next().toString(),
          } as Partial<TApplicationOptions>);
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
   * Reconfigures, and then restarts, the application.
   * @param options The new options for the application.
   */
  #reconfigureApplication(options: Partial<TApplicationOptions> = {}) {
    this.application.reconfigure(this.canvas, options);
    this.application.start();
    // In case the application doesn't maintain this state itself.
    this.application.paused = false;
  }

  /**
   * Create event listeners on the canvas node in the document.
   */
  #hookCanvas() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.canvasNode.addEventListener("click", async (event: MouseEvent) => {
      if (this.document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      nextPalette();
      this.#reconfigureApplication({
        seed: this.application.random.next().toString(),
      } as Partial<TApplicationOptions>);
      event.preventDefault();
    });
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

    this.window.addEventListener("resize", event => {
      if (this.#resizeDebounce !== null) {
        this.window.clearTimeout(this.#resizeDebounce);
      }

      this.#resizeDebounce = this.window.setTimeout(() => {
        this.application.reconfigure(this.canvas);
        this.canvas.refreshCanvasNode();
        this.application.start();
        // In case the application doesn't maintain this state itself.
        this.application.paused = false;
      }, 1000);
    });
  }

  /**
   * Switch the sandbox to dark mode.
   */
  toDarkMode() {
    this.#reconfigureApplication({
      darkMode: true,
    } as Partial<TApplicationOptions>);
    document.body.classList.add("darkMode");
    document.body.classList.remove("lightMode");
  }

  /**
   * Switch the sandbox to light mode.
   */
  toLightMode() {
    this.#reconfigureApplication({
      darkMode: false,
    } as Partial<TApplicationOptions>);
    document.body.classList.add("lightMode");
    document.body.classList.remove("darkMode");
  }
}
