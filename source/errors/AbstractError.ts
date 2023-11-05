import { Maybe } from "../nil.js";

/**
 * Base class for all errors.
 */
export class AbstractError extends Error {
  /**
   * The HTTP status code to associate with this error.
   * @deprecated We no longer respond to HTTP requests with error-specifc
   * status codes.
   */
  status: number;

  /**
   * Another error that should be transported with this error.
   * @deprecated We don't make use of this or interpret nested errors at all.
   */
  inner: Maybe<Error>;

  /**
   * A user-friendly error message that may be transported to the client.
   * @deprecated User-friendly errors should be read from `extensions`.
   */
  info: Maybe<string>;

  /**
   * An application-unique, readable error code.
   */
  code: string;

  /**
   * Constructs a new {@link AbstractError}.
   * @param code The main identification code for the error.
   * @param message The main error message.
   * @param status The HTTP status code to return.
   */
  constructor(code: string, message: string, status: number) {
    super(message);

    this.code = code;
    this.name = "AbstractError";
    this.status = status;
    this.inner = null;

    // Capture a new stacktrace, otherwise it will include our base-class constructor instead of the code
    // location we're actually interested in.
    Error.captureStackTrace(this, AbstractError);
  }

  /**
   * Checks if an object is an instance of {@link AbstractError}, or one of its subclasses.
   * @param error The object to check.
   * @param allowForeignModule Only check for similar looking error codes.
   * You're going to want to use this if you're dealing with a setup where
   * multiple versions of js-utils are loaded.
   * @returns `true` if the object is an {@link AbstractError}, `false` otherwise.
   */
  static isAbstractError(error: unknown, allowForeignModule = true): error is AbstractError {
    if (error instanceof AbstractError) {
      return true;
    }

    // When multiple versions of js-utils are loaded at runtime, the
    // prototypes of errors don't align. In that case, we just analyze the
    // error code.
    if (allowForeignModule) {
      const errorRecord = error as Record<string, unknown>;
      if (
        Object(error) === error &&
        "code" in errorRecord &&
        typeof errorRecord.code === "string"
      ) {
        const codedError = error as { code: string };
        if (codedError.code.match(/^ERR_OS_/)) {
          return true;
        }
      }
    }

    return false;
  }
}
