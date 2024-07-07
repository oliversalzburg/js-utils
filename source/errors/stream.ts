import { errorToString, unknownToError } from "./error-serializer.js";

/**
 * Returns a function that will receive errors (or anything else that was `throw`n)
 * and prints it to a {@linkcode NodeJS.WriteStream}.
 * @param stream - The stream to print errors to.
 * @returns A function that will print errors to the stream.
 * @group Errors
 */
export const redirectErrorsToStream = (stream: NodeJS.WriteStream): ((error: unknown) => void) => {
  const printErrorsToStream = (unknownError: unknown): void => {
    const error = unknownToError(unknownError);
    stream.write(errorToString(error) + "\n");
  };
  return printErrorsToStream;
};
