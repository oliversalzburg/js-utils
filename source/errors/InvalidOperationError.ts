import { Maybe } from "../nil.js";
import { AbstractError } from "./AbstractError.js";

/**
 * Used when an operation was attempted that can not be completed in the current
 * context.
 */
export class InvalidOperationError extends AbstractError {
  /**
   * Constructs a new `InvalidOperationError`.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   * @param userFriendlyErrorMessage An optional user-friendly message that will
   * be attached to the Error and which is allowed to be propagated to the
   * frontend.
   */
  constructor(message: string, status = 400, userFriendlyErrorMessage: Maybe<string> = undefined) {
    super("ERR_OS_INVALID_OPERATION", message, status, userFriendlyErrorMessage);

    this.name = "InvalidOperationError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, InvalidOperationError);
  }
}
