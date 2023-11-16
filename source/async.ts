import { AnyAsyncFunction, AnyFunctionReturning, ConstructorOf } from "./core.js";

/**
 * Wraps the given asynchronous function in a new function that will ignore any outcome of
 * the context as it resolves.
 *
 * This can be useful when providing asynchonous event handler to `.addEventlistener()`,
 * which only expects synchronous functions.
 * @param context The asynchronous function to exectute.
 * @template {Array<unknown>} TArguments The type of the arguments that your function expects.
 * @returns A function returning nothing.
 * @group Async
 */
export const prepareAsyncContext = <TArguments extends Array<unknown>>(
  context: AnyAsyncFunction,
) => {
  return (
    /**
     * The arguments that our new function was called with.
     */
    ...args: TArguments
  ) => {
    void context(...args)
      .then(() => undefined)
      // eslint-disable-next-line no-console
      .catch(console.error);
  };
};

/**
 * Executes an asynchronous function and resolves with an alternative result
 * in case the function failed.
 * @param executable The asynchronous function to execute.
 * @param to The result we want to return when the function errors.
 * @param filter An {@linkcode !Error} subclass. If defined, only errors of
 * this type will be coalesced.
 * @template {unknown} TExecutableReturn The return type of the function.
 * @template {unknown} TCoalesce The type of the object to coalesce to.
 * @template {ConstructorOf<Error>} TFilter The type of the error filter.
 * @returns Whatever the function resolved to, or the provided replacement,
 * in case the function failed.
 * @group Async
 */
export const coalesceOnRejection = async <
  TExecutableReturn,
  TCoalesce,
  TFilter extends ConstructorOf<Error>,
>(
  executable: AnyFunctionReturning<TExecutableReturn | Promise<TExecutableReturn>>,
  to: TCoalesce,
  filter?: TFilter,
) => {
  try {
    return await executable();
  } catch (error) {
    if ((filter !== undefined && error instanceof filter) || !filter) {
      return to;
    }
    throw error;
  }
};
