import { AbstractError } from "./AbstractError.js";

/**
 * Used when an operation was attempted that can not be completed in the current
 * context.
 * @group Errors
 */
export class InvalidOperationError extends AbstractError {
  /**
   * Constructs a new {@linkcode InvalidOperationError}.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   */
  constructor(message: string, status = 400) {
    super("ERR_OS_INVALID_OPERATION", message, status);

    this.name = "InvalidOperationError";

    if (typeof Error.captureStackTrace !== "undefined") {
      // Capture a new stacktrace, otherwise it will include our base-class
      // constructor instead of the code location we're actually interested in.
      Error.captureStackTrace(this, InvalidOperationError);
    }
  }
}
