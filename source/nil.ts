import { ConstructorOf } from "./core.js";

/**
 * When you want to normalize away `null` | `undefined`, or deal
 * with either type through a consistent interface.
 * @group Types
 */
export type Nil = null | undefined;

/**
 * A type that could be either what you want, or `Nil`.
 * @typeParam T - The type that should be made nillable.
 * @group Types
 */
export type Maybe<T> = T | Nil;

/**
 * Check if something is nil.
 * Can be used as a typeguard.
 * @param subject - The subject that could be nil.
 * @returns `true` if the subject is nil, `false` otherwise.
 */
export function isNil<T>(subject: Maybe<T>): subject is Nil {
  return subject === null || subject === undefined;
}

/**
 * Check if something is a concrete value of the given type.
 * Can be used as a typeguard.
 * @param nilable - The subject that could be nil.
 * @param InstanceType - The type to check against.
 * @returns `true` if the input element matches the given type,
 * `false` otherwise.
 */
export function is<T>(nilable: Maybe<T>, InstanceType: ConstructorOf<T>): nilable is T {
  return !isNil(nilable) && nilable instanceof InstanceType;
}

/**
 * Thrown when an unexpected nil value was encountered.
 * @group Errors
 */
export class UnexpectedNilError extends Error {
  /**
   * Constructs a new {@linkcode UnexpectedNilError}.
   * @param message - The error message.
   */
  constructor(message = "unexpected nil value") {
    super(message);
  }
}

/**
 * Ensure that the passed subject is not nil; throw otherwise.
 * @param subject - A subject that is possible nil.
 * @param errorMessage - An optional error message to throw when the subject is nil.
 * @returns The subject, if it isn't nil.
 * @throws {@linkcode UnexpectedNilError} When the subject is nil.
 */
export function mustExist<T>(subject: Maybe<T>, errorMessage?: string): T {
  if (isNil(subject)) {
    throw new UnexpectedNilError(errorMessage);
  }
  return subject;
}

/**
 * Ensure that the passed subject is not nil; throw otherwise.
 * @param subject - A subject that is possibly nil.
 * @throws {@linkcode UnexpectedNilError} When the subject is nil.
 */
export function assertExists<T>(subject: Maybe<T>): asserts subject is T {
  if (isNil(subject)) {
    throw new UnexpectedNilError();
  }
}
