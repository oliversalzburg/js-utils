import { Maybe } from "../nil.js";
import { AbstractError } from "./AbstractError.js";

/**
 * An error used when access to a resource was requested, but the required
 * permissions were not available.
 */
export class PermissionViolationError extends AbstractError {
  /**
   * Constructs a new `PermissionViolationError`.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   * @param userFriendlyErrorMessage An optional user-friendly message that will
   * be attached to the Error and which is allowed to be propagated to the
   * frontend.
   */
  constructor(message: string, status = 403, userFriendlyErrorMessage: Maybe<string> = undefined) {
    super("ERR_OS_PERMISSION_VIOLATION", message, status, userFriendlyErrorMessage);

    this.name = "PermissionViolationError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, PermissionViolationError);
  }
}
