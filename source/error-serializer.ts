import { AbstractError } from "./errors/AbstractError.js";
import { InternalError } from "./errors/InternalError.js";
import { UnknownError } from "./errors/UnknownError.js";

/**
 * The shape of an {@linkcode !Error} instance, after it has been serialized into a simple hash.
 * @group Errors
 */
export type SerializedError = Record<string, Record<string, string> | string | undefined>;

/**
 * Determine if the given unknown subject is an {@linkcode !Error} instance.
 * @param subject The object to inspect.
 * @returns `true` if the subject is an {@linkcode !Error}, `false` otherwise.
 * @group Errors
 */
export const isError = (subject: unknown): subject is Error => {
  return subject instanceof Error || Object.prototype.toString.call(subject) === "[object Error]";
};

/**
 * Returns an {@linkcode AbstractError} that best represents the passed subject.
 * If the passed subject is already an {@linkcode AbstractError}, it is returned as-is.
 * Otherwise, it will be converted into an appropriate error type.
 * @param subject The subject to inspect
 * @returns An {@linkcode AbstractError} instance.
 * @group Errors
 */
export const unknownToError = (subject: unknown): AbstractError => {
  if (AbstractError.isAbstractError(subject)) {
    return subject;
  }

  if (isError(subject)) {
    return InternalError.fromError(subject);
  }

  return new UnknownError(String(subject));
};

/**
 * Serializes an error into a JSON string.
 * @param error The error to stringify.
 * @returns A JSON string representing the error.
 * @group Errors
 */
export const errorToJSON = (error: Error): string => {
  return JSON.stringify(error, Object.getOwnPropertyNames(error));
};

/**
 * Converts an error into a regular hash.
 * @param error The error to convert.
 * @returns A new object that contains all the properties of the error.
 * @group Errors
 */
export const errorToRecord = (error: Error): Record<string, unknown> => {
  const record: Record<string, unknown> = {};
  for (const propertyName of Object.getOwnPropertyNames(error)) {
    record[propertyName] = error[propertyName as keyof typeof error];
  }
  return record;
};

/**
 * Serializes an error into a simpler shape.
 * @param error The error to serialize.
 * @returns A simple representation of the error.
 * @group Errors
 */
export const errorToSimpleSerializable = <TError extends AbstractError = AbstractError>(
  error: TError,
): SerializedError => {
  const serialized: SerializedError = {
    code: error.code,
    message: error.message,
    name: error.name,
    stack: error.stack,
  };

  return serialized;
};
