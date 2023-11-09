import { AbstractError } from "./AbstractError.js";

/**
 * An error used when access to a resource was requested, but the required
 * permissions were not available.
 * @group Errors
 */
export class PermissionViolationError extends AbstractError {
  /**
   * Constructs a new {@linkcode PermissionViolationError}.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   */
  constructor(message: string, status = 403) {
    super("ERR_OS_PERMISSION_VIOLATION", message, status);

    this.name = "PermissionViolationError";

    // Capture a new stacktrace, otherwise it will include our base-class
    // constructor instead of the code location we're actually interested in.
    Error.captureStackTrace(this, PermissionViolationError);
  }
}
