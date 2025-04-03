import { ConstructorOf } from "../core.js";

/**
 * When you want to normalize away `null` | `undefined`, or deal
 * with either type through a consistent interface.
 */
export type Nil = null | undefined;

/**
 * A type that could be either what you want, or `Nil`.
 * @typeParam T - The type that should be made nillable.
 */
export type Maybe<T> = T | Nil;

/**
 * Check if something is nil.
 * Can be used as a typeguard.
 * @param subject - The subject that could be nil.
 * @typeParam TSubject - The type of the subject.
 * @returns `true` if the subject is nil, `false` otherwise.
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
 */
export function is<TSubject>(
  subject: Maybe<TSubject> | unknown,
  Prototype: ConstructorOf<TSubject>,
): subject is TSubject {
  return !isNil(subject) && subject instanceof Prototype;
}

/**
 * Thrown when an unexpected nil value was encountered.
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
 * @param subject - A subject that is possibly nil.
 * @param errorMessage - An optional error message to throw when the subject is nil.
 * @typeParam TSubject - The type of the subject.
 * @returns The subject, if it isn't nil.
 * @throws {@linkcode UnexpectedNilError} When the subject is nil.
 */
export function mustExist<TSubject>(subject: Maybe<TSubject>, errorMessage?: string): TSubject {
  if (isNil(subject)) {
    throw new UnexpectedNilError(errorMessage);
  }
  return subject;
}

/**
 * Ensure that all passed subjects are not nil; throw otherwise.
 * @param subjects - The subjects that are possibly nil.
 * @param errorMessage - An optional error message to throw when a subject is nil.
 * @typeParam TSubject - The type a the subject.
 * @returns The subjects, if they aren't nil.
 * @throws {@linkcode UnexpectedNilError} When a subject is nil.
 */
export function mustExistAll<TSubject>(
  subjects: Array<Maybe<TSubject>>,
  errorMessage?: string,
): Array<TSubject> {
  for (const subject of subjects) {
    if (isNil(subject)) {
      throw new UnexpectedNilError(errorMessage);
    }
  }

  return subjects as Array<TSubject>;
}

/**
 * Ensure that the passed subject is not nil; throw otherwise.
 * @param subject - A subject that is possibly nil.
 * @typeParam TSubject - The type of the subject.
 * @throws {@linkcode UnexpectedNilError} When the subject is nil.
 */
export function assertExists<TSubject>(subject: Maybe<TSubject>): asserts subject is TSubject {
  if (isNil(subject)) {
    throw new UnexpectedNilError();
  }
}

/**
 * Ensure that the passed subjects are not nil; throw otherwise.
 * @param subjects - Subjects that are possibly nil.
 * @typeParam TSubject - The type of a subject.
 * @throws {@linkcode UnexpectedNilError} When a subject is nil.
 */
export function assertExistsAll<TSubject>(
  subjects: Array<Maybe<TSubject>>,
): asserts subjects is Array<TSubject> {
  for (const subject of subjects) {
    if (isNil(subject)) {
      throw new UnexpectedNilError();
    }
  }
}

/**
 * Convert a nilable into a real value, if it is nil.
 * @param nilable - The subject to convert to an optional.
 * @param to - The value to coalese to.
 * @returns The input value, if it wasn't nil, or the value to coalesce to.
 */
export function coalesce<T>(nilable: Maybe<T>, to: T): T {
  if (isNil(nilable)) {
    return to;
  }
  return nilable;
}

/**
 * Drop all nil values from an array, or replaces them with another value.
 * @param nilables - The subject to convert.
 * @param to - The value to coalese to.
 * @returns An array with where all values are not nil.
 */
export function coalesceArray<T>(nilables: Array<Maybe<T>>, to?: Maybe<T>): Array<T> {
  const result = new Array<T>();
  for (const nilable of nilables) {
    if (!isNil(nilable)) {
      result.push(nilable);
    } else if (!isNil(to)) {
      result.push(to);
    }
  }
  return result;
}

/**
 * Convert a nilable into an optional argument.
 * This means `null` is normalized to `undefined`.
 * @param nilable - The subject to convert to an optional.
 * @returns The value, normalized to `undefined`, if it was nil.
 */
export function toOptional<T>(nilable: Maybe<T>): T | undefined {
  if (isNil(nilable)) {
    return undefined;
  }
  return nilable;
}
