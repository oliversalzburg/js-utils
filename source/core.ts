/**
 * Describes a function that is a constructor for something.
 * @typeParam TConstructed - The type this is a constructor for.
 */
// biome-ignore lint/suspicious/noExplicitAny: No idea how to work around these ones.
export type ConstructorOf<TConstructed> = new (...args: Array<any>) => TConstructed;

/**
 * Describes any function.
 */
// biome-ignore lint/suspicious/noExplicitAny: No idea how to work around these ones.
export type AnyFunction = (...args: Array<any>) => any;

/**
 * Describes any asynchronous function.
 */
// biome-ignore lint/suspicious/noExplicitAny: No idea how to work around these ones.
export type AnyAsyncFunction = (...args: Array<any>) => Promise<any>;

/**
 * Any constructor
 */
// biome-ignore lint/suspicious/noExplicitAny: No idea how to work around these ones.
export type AnyConstructor = new (...args: Array<any>) => any;

/**
 * Describes a function returning an instance of a given type.
 * @typeParam TReturned - The type of the item returned by the function.
 */
// biome-ignore lint/suspicious/noExplicitAny: No idea how to work around these ones.
export type AnyFunctionReturning<TReturned = any> = (...args: Array<any>) => TReturned;

/**
 * Describes an async function returning an instance of a given type.
 * @typeParam TReturned - The type of the item returned by the function.
 */
// biome-ignore lint/suspicious/noExplicitAny: No idea how to work around these ones.
export type AnyAsyncFunctionReturning<TReturned = any> = (
  // biome-ignore lint/suspicious/noExplicitAny: No idea how to work around these ones.
  ...args: Array<any>
) => Promise<TReturned>;

/**
 * Describes a class "mixin", which is a function that returns a dynamically
 * constructed class, based on the passed parameters.
 *
 * **Hint**: Don't use mixins.
 * @typeParam TTarget - The type of the classed this mixin is being
 * mixed in with.
 */
export type Mixin<TTarget extends AnyFunctionReturning> = InstanceType<ReturnType<TTarget>>;

/**
 * Recursive definition of a regular JS object, which is a key-value hash
 * of strings to primitives, or another object of the same type.
 */
export type JsonObject =
  | string
  | number
  | boolean
  | null
  | Array<JsonObject>
  | { [key: string]: JsonObject };
