/* eslint-disable no-console */
import { Shake } from "../device/shake.js";
import { getDocumentElementTypeById } from "../dom/core.js";
import { redirectErrorsToConsole } from "../error/console.js";
import { Random } from "../random.js";
import { Canvas } from "./canvas.js";
import { RenderLoop } from "./render-loop.js";

/**
 * Provides the input as-is.
 *
 * This method exists only to make use of the template string tag in code,
 * which allows us to use in-IDE support for CSS, even if there is no build
 * process to interpret the tag.
 * {@link https://lit.dev/docs/components/styles/ | Lit styles}.
 * @param input - The CSS code.
 * @returns The CSS code as-is.
 * @group Strings
 * @group Tags
 * @group Graphics
 */
export const css = (input: TemplateStringsArray): string => input.join("");

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
    display: block !important;
    transition: background-color 1s ease-in-out;
  }
  body.darkMode {
    background-color: #211f1f;

    .credits a {
      color: #a0a0a0;
    }
  }
  body.lightMode {
    background-color: #e6e6e6;

    .credits a {
      color: #606060;
    }
  }

  #main {
    display: flex;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    z-index: 1;

    filter: drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5));
    transition: all 1s;
  }

  .credits {
    display: block;
    font-family: sans-serif;
    font-size: 10pt;
    color: #808080;
    position: absolute;
    top: 80%;
    text-align: center;
    user-select: none;
    width: 100%;
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
  seed: number;

  /**
   * The part of the canvas that the targetted render kernel will handle.
   * This is ignored, unless you use multi-process rendering.
   */
  viewport: {
    /**
     * Start of the viewport in fractional world-space.
     */
    x: number;

    /**
     * Start of the viewport in fractional world-space.
     */
    y: number;

    /**
     * Width of the viewport in fractional world-space.
     */
    w: number;

    /**
     * Height of the viewport in fractional world-space.
     */
    h: number;
  };
}

/**
 * Describes an application running inside the {@linkcode CanvasSandbox}.
 * @typeParam TApplicationOptions - The type of the options object
 * with which the application is constructed.
 * @group Graphics
 */
export interface CanvasSandboxApplication<
  TCanvas extends Canvas,
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
   * @param delta - How many milliseconds passed since the last frame draw.
   * @param timestamp - The current timestamp.
   */
  onDraw(delta: number, timestamp: number): void;

  /**
   * Reconfigure the application with the given options and restart it.
   * @param canvas - The canvas to use.
   * @param options - The new options to use.
   */
  reconfigure(canvas: TCanvas, options?: Partial<TApplicationOptions>): void;

  /**
   * Start the application.
   */
  start(options?: Partial<TApplicationOptions>): void;

  /**
   * Pause rendering.
   * @param paused - Should rendering be paused (`true`) or unpaused (`false`)?
   */
  pause(paused: boolean): void;
}

/**
 * Options for a {@linkcode CanvasSandbox}.
 * @group Graphics
 */
export interface CanvasSandboxOptions {
  /**
   * Should the sandbox render developer information?
   * @defaultValue false
   */
  devMode: boolean;

  /**
   * Should the sandbox default CSS be injected into the body?
   * @defaultValue true
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
 * @typeParam TApplicationOptions - The type of the options
 * the application in the sandbox will be constructed with.
 * @group Graphics
 */
export class CanvasSandbox<
  TCanvas extends Canvas,
  TApplicationOptions extends CanvasSandboxExpectedOptions,
> {
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
  readonly application: CanvasSandboxApplication<TCanvas, TApplicationOptions>;

  /**
   * The canvas node that we're drawing into.
   */
  readonly canvasNode: HTMLCanvasElement;

  /**
   * Our convenience canvas wrapper, which we provide to the application
   * to render to.
   */
  readonly canvas: TCanvas;

  /**
   * The render loop we use to control frame rendering.
   */
  readonly renderLoop: RenderLoop;

  /**
   * Our handler for device shaking.
   */
  readonly shakeHandler: Shake;

  /**
   * The options for this sandbox.
   */
  readonly sandboxOptions: Partial<CanvasSandboxOptions>;

  /**
   * The handle that keeps track of debouncing of `resize` events.
   */
  #resizeDebounce: number | null = null;

  /**
   * Construct a new {@linkcode CanvasSandbox}.
   * @param window - The window we're running inside.
   * @param canvasNode - The canvas node we're drawing to.
   * @param CanvasImpl - The canvas implementation you want to use in this sandbox.
   * see {@linkcode Canvas2D} and {@linkcode Canvas3D}.
   * @param Application - The application that is going to run in the sandbox.
   * @param options - The options that the application should be constructed with.
   * @param sandboxOptions - The options for the sandbox itself.
   */
  constructor(
    window: Window,
    canvasNode: HTMLCanvasElement,
    CanvasImpl: new (canvasNode: HTMLCanvasElement) => TCanvas,
    Application: new (
      /**
       * The canvas that the application will receive.
       */
      canvas: TCanvas,
      /**
       * The options that will be passed to the application.
       */
      options: TApplicationOptions,
    ) => CanvasSandboxApplication<TCanvas, TApplicationOptions>,
    options: TApplicationOptions,
    sandboxOptions?: Partial<CanvasSandboxOptions>,
  ) {
    this.window = window;
    this.document = window.document;
    this.canvasNode = canvasNode;
    this.canvas = new CanvasImpl(canvasNode);
    this.sandboxOptions = sandboxOptions ?? {};

    if (sandboxOptions?.injectDefaultCss ?? true) {
      this.injectDefaultCss();
    }

    this.application = new Application(this.canvas, options);
    const applicationOnDraw = this.application.onDraw.bind(this.application);
    this.renderLoop = new RenderLoop(applicationOnDraw, this.canvas, {
      drawFps: sandboxOptions?.devMode,
    });
    this.shakeHandler = new Shake();

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
    if (this.sandboxOptions.devMode) {
      console.info(
        "CanvasSandbox: Starting application with these options.",
        this.application.options,
      );
    }

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

      // Make canvas fullscreen.
      if (!this.document.fullscreenElement && event.target === this.document.body) {
        if (this.sandboxOptions.devMode) {
          console.info("CanvasSandbox: Canvas is entering fullscreen mode...");
        }
        await this.canvasNode.requestFullscreen();
      }
    });

    this.document.body.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 13:
          // Enter
          this.#reconfigureApplication();
          break;

        case 32:
          // Space
          this.application.pause(!this.application.paused);
          break;
      }
    });
  }

  /**
   * Reconfigures, and then restarts, the application.
   * @param options - The new options for the application.
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
    this.canvasNode.addEventListener("click", (event: MouseEvent) => {
      this.application.pause(!this.application.paused);
      event.preventDefault();
    });
  }

  /**
   * Create event listeners on the window we're running in.
   */
  #hookWindow() {
    this.shakeHandler
      .start()
      .then(() => {
        this.shakeHandler.addEventListener("shake", () => {
          console.info("CanvasSandbox: Shake detected. Reconfiguring application...");
          this.#reconfigureApplication();
        });
      })
      .catch(redirectErrorsToConsole(console));

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
        return;
      }

      this.#resizeDebounce = this.window.setTimeout(() => {
        this.#resizeDebounce = null;
      }, 1000);

      if (this.sandboxOptions.devMode) {
        console.info(
          `CanvasSandbox: Window resized (${this.window.innerWidth.toFixed(0)}x${this.window.innerHeight.toFixed(0)}x${this.window.devicePixelRatio.toFixed(3)}). Reconfiguring application...`,
        );
      }

      this.application.reconfigure(this.canvas);
      this.canvas.refreshCanvasNode();
      this.application.start();
      // In case the application doesn't maintain this state itself.
      this.application.paused = false;
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
