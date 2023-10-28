import { AbstractError } from "./AbstractError.js";

/**
 * Used when a resource conflict was detected.
 */
export class ResourceConflictError extends AbstractError {
  /**
   * Constructs a new `ResourceConflictError`.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   */
  constructor(message: string, status = 409) {
    super("ERR_OS_RESOURCE_CONFLICT", message, status);

    this.name = "ResourceConflictError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, ResourceConflictError);
  }
}
