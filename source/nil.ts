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
 * @typeParam TSubject - The type of the subject.
 * @returns `true` if the subject is nil, `false` otherwise.
 * @group Nullability
 */
export function isNil<TSubject>(subject: Maybe<TSubject>): subject is Nil {
  return subject === null || subject === undefined;
}

/**
 * Check if something is a concrete value of the given type.
 * Can be used as a typeguard.
 * @param subject - The subject that could be nil.
 * @param Prototype - The prototype to check against.
 * @typeParam TSubject - The type to check against.
 * @returns `true` if the input element matches the given type,
 * `false` otherwise.
 * @group Nullability
 */
export function is<TSubject>(
  subject: Maybe<TSubject>,
  Prototype: ConstructorOf<TSubject>,
): subject is TSubject {
  return !isNil(subject) && subject instanceof Prototype;
}

/**
 * Thrown when an unexpected nil value was encountered.
 * @group Errors
 * @group Nullability
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
 * @typeParam TSubject - The type of the subject.
 * @returns The subject, if it isn't nil.
 * @throws {@linkcode UnexpectedNilError} When the subject is nil.
 * @group Nullability
 */
export function mustExist<TSubject>(subject: Maybe<TSubject>, errorMessage?: string): TSubject {
  if (isNil(subject)) {
    throw new UnexpectedNilError(errorMessage);
  }
  return subject;
}

/**
 * Ensure that the passed subject is not nil; throw otherwise.
 * @param subject - A subject that is possibly nil.
 * @typeParam TSubject - The type of the subject.
 * @throws {@linkcode UnexpectedNilError} When the subject is nil.
 * @group Nullability
 */
export function assertExists<TSubject>(subject: Maybe<TSubject>): asserts subject is TSubject {
  if (isNil(subject)) {
    throw new UnexpectedNilError();
  }
}
