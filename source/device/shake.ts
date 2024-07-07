import { createEvent } from "../events/event.js";

const getMaxAcceleration = (event: DeviceMotionEvent): number => {
  let max = 0;
  if (event.acceleration) {
    for (const key of ["x", "y", "z"] as const) {
      const value = Math.abs(event.acceleration[key] ?? 0);
      if (value > max) max = value;
    }
  }
  return max;
};

/**
 * The type of the details of a shake event.
 */
export type ShakeEventData = DeviceMotionEvent;

/**
 * The type of the `"shake"` event.
 */
export type ShakeEvent = CustomEvent<ShakeEventData> & { type: "shake" };

/**
 * The type of a handler for the `"shake"` event.
 */
export type ShakeEventListener = (event: ShakeEvent) => void;

/**
 * The options for constructing a {@linkcode Shake} handler.
 */
export interface ShakeOptions {
  /**
   * Minimum acceleration needed to dispatch an event:
   * meters per second squared (m/s²).
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/acceleration
   */
  threshold: number;

  /**
   * After a shake event is dispatched, subsequent events will not be dispatched
   * until after a duration greater than or equal to this value (milliseconds).
   */
  timeout: number;
}

/**
 * A device motion handler that dispatches a `"shake"` event as appropriate.
 *
 * Original author: Jesse Jackson - https://github.com/jsejcksn
 * This part of the code is licensed under CC BY-SA 4.0
 */
export class Shake extends EventTarget {
  /**
   * Have we been granted permissions to use device motion events?
   */
  #approved?: boolean;

  /**
   * How strong does the motion have to be to trigger the event?
   */
  #threshold: ShakeOptions["threshold"];

  /**
   * After the event has been triggered, don't trigger another event for
   * how many milliseconds?
   */
  #timeout: ShakeOptions["timeout"];

  /**
   * The last time we triggered an event.
   */
  #timeStamp: number;

  /**
   * Construct a new device shake handler.
   * @param options - The options for the handler.
   */
  constructor(options?: Partial<ShakeOptions>) {
    super();

    const { threshold = 15, timeout = 1000 } = options ?? {};
    this.#threshold = threshold;
    this.#timeout = timeout;
    this.#timeStamp = timeout * -1;
  }

  /**
   * Add a new shake event listener.
   * @param type - The type of the event to handle.
   * @param listener - The event handler to call.
   * @param options - The options for this handler.
   */
  // @ts-expect-error Extending EventTarget is hard
  addEventListener(
    type: "shake",
    listener: ShakeEventListener | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    type Arg1 = Parameters<EventTarget["addEventListener"]>[1];
    super.addEventListener(type, listener as Arg1, options);
  }

  /**
   * Dispatch a shake event.
   * @param event - The event to dispatch.
   * @returns true if the event was cancelled, false otherwise.
   */
  dispatchEvent(event: ShakeEvent): boolean {
    return super.dispatchEvent(event);
  }

  /**
   * Removes a previously added event listener.
   * @param type - The type of the event to remove.
   * @param callback - The event handler to remove.
   * @param options - The options the event handler was added with.
   */
  // @ts-expect-error Extending EventTarget is hard
  removeEventListener(
    type: "shake",
    callback: ShakeEventListener | null,
    options?: EventListenerOptions | boolean,
  ): void {
    type Arg1 = Parameters<EventTarget["removeEventListener"]>[1];
    super.removeEventListener(type, callback as Arg1, options);
  }

  /**
   * Requests approval to handle device motion events.
   * @returns true if we got approval, false otherwise.
   */
  async approve(): Promise<boolean> {
    if (typeof this.#approved === "undefined") {
      if (!("DeviceMotionEvent" in window)) {
        this.#approved = false;
        return false;
      }

      try {
        type PermissionRequestFn = () => Promise<PermissionState>;
        type DME = typeof DeviceMotionEvent & { requestPermission: PermissionRequestFn };

        if (typeof (DeviceMotionEvent as DME).requestPermission === "function") {
          const permissionState = await (DeviceMotionEvent as DME).requestPermission();
          this.#approved = permissionState === "granted";
        } else {
          this.#approved = true;
        }
      } catch {
        this.#approved = false;
      }
    }
    return this.#approved;
  }

  /**
   * Handles a device motion event.
   * @param event - The device motion event.
   */
  #handleDeviceMotion = (event: DeviceMotionEvent): void => {
    const diff = event.timeStamp - this.#timeStamp;
    if (diff < this.#timeout) {
      return;
    }

    const accel = getMaxAcceleration(event);
    if (accel < this.#threshold) {
      return;
    }

    this.#timeStamp = event.timeStamp;
    this.dispatchEvent(createEvent("shake", event));
  };

  /**
   * Start handling device shake.
   * @returns true if we were able to register our handler, false otherwise.
   */
  async start(): Promise<boolean> {
    const approved = await this.approve();
    if (!approved) return false;
    window.addEventListener("devicemotion", this.#handleDeviceMotion);
    return true;
  }

  /**
   * Stop handling device shake.
   */
  stop(): void {
    window.removeEventListener("devicemotion", this.#handleDeviceMotion);
  }
}
