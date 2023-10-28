import { Maybe } from "../nil.js";
import { AbstractError } from "./AbstractError.js";

/**
 * Used when an unknown, non-`Error`-like object was caught and converted into a
 * real `Error` instance.
 * Like when you catch a `throw "boom"`, we will convert the caught `"boom"`
 * into an `UnknownError`.
 * To enrich an `Error`-like object that was caught, use the `InternalError`.
 */
export class UnknownError extends AbstractError {
  /**
   * Constructs a new `UnknownError`.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   * @param userFriendlyErrorMessage An optional user-friendly message that will
   * be attached to the Error and which is allowed to be propagated to the
   * frontend.
   */
  constructor(message: string, status = 500, userFriendlyErrorMessage: Maybe<string> = undefined) {
    super("ERR_OS_UNKNOWN", message, status, userFriendlyErrorMessage);

    this.name = "UnknownError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, UnknownError);
  }
}
