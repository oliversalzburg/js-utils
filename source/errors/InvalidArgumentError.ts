import { Maybe } from "../nil.js";
import { AbstractError } from "./AbstractError.js";

/**
 * Used when the user supplied an argument that is not valid in the current
 * context.
 */
export class InvalidArgumentError extends AbstractError {
  /**
   * Constructs a new `InvalidArgumentError`.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   * @param userFriendlyErrorMessage An optional user-friendly message that will
   * be attached to the Error and which is allowed to be propagated to the
   * frontend.
   */
  constructor(message: string, status = 400, userFriendlyErrorMessage: Maybe<string> = undefined) {
    super("ERR_OS_INVALID_ARGUMENT", message, status, userFriendlyErrorMessage);

    this.name = "InvalidArgumentError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, InvalidArgumentError);
  }
}
