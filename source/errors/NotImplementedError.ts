import { AbstractError } from "./AbstractError.js";

/**
 * Used when a called method actually hasn't been implemented yet (whoops).
 */
export class NotImplementedError extends AbstractError {
  /**
   * Constructs a new {@linkcode NotImplementedError}.
   * @param message - The main error message.
   * @param status - The HTTP status code to return.
   */
  constructor(message = "Not implemented.", status = 501) {
    super("ERR_OS_NOT_IMPLEMENTED", message, status);

    this.name = "NotImplementedError";

    if (typeof Error.captureStackTrace !== "undefined") {
      // Capture a new stacktrace, otherwise it will include our base-class
      // constructor instead of the code location we're actually interested in.
      Error.captureStackTrace(this, NotImplementedError);
    }
  }
}
