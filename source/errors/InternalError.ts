import { AbstractError } from "./AbstractError.js";

/**
 * Used when an `Error`-like object was caught and converted into an
 * implementation of `AbstractError` for further processing.
 */
export class InternalError extends AbstractError {
  /**
   * Constructs a new `InternalError`.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   */
  constructor(message: string, status = 500) {
    super("ERR_OS_INTERNAL", message, status);

    this.name = "InternalError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, InternalError);
  }

  static fromError(error: Error): InternalError {
    // Create a _real_ `InternalError` instance, which we will return later.
    const internalError = new InternalError(error.message);
    // Assign the error to it, to inherit all the fields in the error.
    // Then assign another `InternalError` to replace key fields, like:
    // name, code, status, ...
    Object.assign(internalError, error, new InternalError(error.message));
    // Set the inner error.
    internalError.inner = error;
    // Inherit the original error stack again.
    internalError.stack = error.stack;

    return internalError;
  }
}
