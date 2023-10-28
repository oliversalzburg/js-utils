import { Maybe } from "../nil.js";
import { AbstractError } from "./AbstractError.js";

/**
 * Used when a resource conflict was detected.
 */
export class ResourceConflictError extends AbstractError {
  /**
   * Constructs a new `ResourceConflictError`.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   * @param userFriendlyErrorMessage An optional user-friendly message that will
   * be attached to the Error and which is allowed to be propagated to the
   * frontend.
   */
  constructor(message: string, status = 409, userFriendlyErrorMessage: Maybe<string> = undefined) {
    super("ERR_OS_RESOURCE_CONFLICT", message, status, userFriendlyErrorMessage);

    this.name = "ResourceConflictError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, ResourceConflictError);
  }
}
