import { ConstructorOf } from "./core.js";

/**
 * When you want to normalize away `null` | `undefined`, or deal
 * with either type through a consistent interface.
 */
export type Nil = null | undefined;

/**
 * A type that could be either what you want, or `Nil`.
 */
export type Maybe<T> = T | Nil;

/**
 * Check if something is nil.
 * Can be used as a typeguard.
 * @param subject The subject that could be nil.
 * @returns `true` if the subject is nil, `false` otherwise.
 */
export function isNil<T>(subject: Maybe<T>): subject is Nil {
  return subject === null || subject === undefined;
}

/**
 * Check if something is a concrete value of the given type.
 * Can be used as a typeguard.
 * @param nilable The subject that could be nil.
 * @param InstanceType The type to check against.
 * @returns `true` if the input element matches the given type,
 * `false` otherwise.
 */
export function is<T>(nilable: Maybe<T>, InstanceType: ConstructorOf<T>): nilable is T {
  return !isNil(nilable) && nilable instanceof InstanceType;
}

/**
 * Thrown when an unexpected nil value was encountered.
 */
export class UnexpectedNilError extends Error {
  constructor(message = "unexpected nil value") {
    super(message);
  }
}

/**
 * Ensure that the passed subject is not nil; throw otherwise.
 * @param subject A subject that is possible nil.
 * @returns The subject, if it isn't nil.
 * @throws {UnexpectedNilError} When the subject is nil.
 */
export function mustExist<T>(subject: Maybe<T>): T {
  if (isNil(subject)) {
    throw new UnexpectedNilError();
  }
  return subject;
}
