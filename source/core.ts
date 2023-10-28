/**
 * Describes a function that is a constructor for T.
 */
export type ConstructorOf<T = Record<string, unknown>> = new (...args: any[]) => T;
