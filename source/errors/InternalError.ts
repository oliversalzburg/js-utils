import { AbstractError } from "./AbstractError.js";

/**
 * Used when an {@linkcode !Error}-like object was caught and converted into an
 * implementation of {@linkcode AbstractError} for further processing.
 */
export class InternalError extends AbstractError {
  /**
   * Constructs a new {@linkcode InternalError}.
   * @param message - The main error message.
   * @param status - The HTTP status code to return.
   */
  constructor(message: string, status = 500) {
    super("ERR_OS_INTERNAL", message, status);

    this.name = "InternalError";

    if (typeof Error.captureStackTrace !== "undefined") {
      // Capture a new stacktrace, otherwise it will include our base-class
      // constructor instead of the code location we're actually interested in.
      Error.captureStackTrace(this, InternalError);
    }
  }

  /**
   * Converts an error into an {@linkcode InternalError}.
   * @param error - The error to convert.
   * @returns An {@linkcode InternalError} that represents the given error.
   */
  static fromError(error: Error): InternalError {
    // Create a _real_ `InternalError` instance, which we will return later.
    const internalError = new InternalError(error.message);
    // Assign the error to it, to inherit all the fields in the error.
    // Then assign another `InternalError` to replace key fields, like:
    // name, code, status, ...
    Object.assign(internalError, error, new InternalError(error.message));
    // Inherit the original error stack again.
    internalError.stack = error.stack;

    return internalError;
  }
}
