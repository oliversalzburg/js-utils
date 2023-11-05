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
