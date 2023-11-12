/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Describes a function that is a constructor for T.
 */
export type ConstructorOf<T = Record<string, unknown>> = new (...args: Array<any>) => T;

/**
 * Describes literally any function.
 */
export type AnyFunction = (...args: Array<any>) => any;

/**
 * Describes literally any asynchronous function.
 */
export type AnyAsyncFunction = (...args: Array<any>) => Promise<any>;

/**
 * Any constructor
 */
export type AnyConstructor = new (...args: Array<any>) => any;

/**
 * Describes a function returning an instance of T.
 */
export type FunctionReturning<T = any> = (...args: Array<any>) => T;

/**
 * Describes a class "mixin", which is a function that returns a dynamically
 * constructed class, based on the passed parameters.
 */
export type Mixin<T extends FunctionReturning> = InstanceType<ReturnType<T>>;

/**
 * Ensures a given value is within a given boundary.
 * @param input The number to clamp.
 * @param floor The lower bound.
 * @param ceil The upper bound.
 * @returns The number clamped to the desired range.
 */
export const clamp = (input: number, floor: number, ceil: number): number => {
  return Math.max(floor, Math.min(input, ceil));
};
