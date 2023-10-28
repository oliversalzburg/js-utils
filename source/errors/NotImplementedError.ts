import { Maybe } from "../nil.js";
import { AbstractError } from "./AbstractError.js";

/**
 * Used when a called method actually hasn't been implemented yet (whoops).
 */
export class NotImplementedError extends AbstractError {
  /**
   * Constructs a new `NotImplementedError`.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   * @param userFriendlyErrorMessage An optional user-friendly message that will
   * be attached to the Error and which is allowed to be propagated to the
   * frontend.
   */
  constructor(message: string, status = 501, userFriendlyErrorMessage: Maybe<string> = undefined) {
    super("ERR_OS_NOT_IMPLEMENTED", message, status, userFriendlyErrorMessage);

    this.name = "NotImplementedError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, NotImplementedError);
  }
}
