import { types } from "node:util";
import { AbstractError } from "./errors/AbstractError.js";
import { InternalError } from "./errors/InternalError.js";
import { UnknownError } from "./errors/UnknownError.js";

/**
 * The shape of an `Error` instance, after it has been serialized into a simple hash.
 */
export type SerializedError = Record<string, Record<string, string> | string | undefined>;

/**
 * Determine if the given unknown subject is an `Error` instance.
 * @param subject The object to inspect.
 * @returns `true` if the subject is an `Error`, `false` otherwise.
 */
export const isError = (subject: unknown): subject is Error => {
  return subject instanceof Error || types.isNativeError(subject);
};

/**
 * Returns an `AbstractError` that best represents the passed subject.
 * If the passed subject is already an `AbstractError`, it is returned as-is.
 * Otherwise, it will be converted into an appropriate error type.
 * @param subject The subject to inspect
 * @returns An `AbstractError` instance.
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
 */
export const errorToJSON = (error: Error): string => {
  return JSON.stringify(error, Object.getOwnPropertyNames(error));
};

/**
 * Converts an error into a regular hash.
 * @param error The error to convert.
 * @returns A new object that contains all the properties of the error.
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
