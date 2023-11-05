import { AbstractError } from "./AbstractError.js";

/**
 * Used when the user supplied an argument that is not valid in the current
 * context.
 */
export class InvalidArgumentError extends AbstractError {
  /**
   * Constructs a new {@link InvalidArgumentError}.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   */
  constructor(message: string, status = 400) {
    super("ERR_OS_INVALID_ARGUMENT", message, status);

    this.name = "InvalidArgumentError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, InvalidArgumentError);
  }
}
