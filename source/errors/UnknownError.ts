import { AbstractError } from "./AbstractError.js";

/**
 * Used when an unknown, non-`Error`-like object was caught and converted into a
 * real `Error` instance.
 * Like when you catch a `throw "boom"`, we will convert the caught `"boom"`
 * into an `UnknownError`.
 * To enrich an `Error`-like object that was caught, use the {@link InternalError}.
 */
export class UnknownError extends AbstractError {
  /**
   * Constructs a new {@link UnknownError}.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   */
  constructor(message: string, status = 500) {
    super("ERR_OS_UNKNOWN", message, status);

    this.name = "UnknownError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, UnknownError);
  }
}
