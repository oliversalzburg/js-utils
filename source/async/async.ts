import { AnyAsyncFunction, AnyFunctionReturning, ConstructorOf } from "../core.js";
import { redirectErrorsToConsole } from "../errors/console.js";

/**
 * Wraps the given asynchronous function in a new function that will ignore any outcome of
 * the context as it resolves.
 *
 * This can be useful when providing asynchonous event handler to `.addEventlistener()`,
 * which only expects synchronous functions.
 * @param context - The asynchronous function to execute.
 * @returns A function returning nothing.
 */
export const prepareAsyncContext = (context: AnyAsyncFunction) => {
  return (
    /**
     * The arguments that our new function was called with.
     */
    ...args: Array<unknown>
  ) => {
    void context(...args)
      .then(() => undefined)
      .catch(redirectErrorsToConsole(console));
  };
};

/**
 * Executes an asynchronous function and resolves with an alternative result
 * in case the function failed.
 * @param executable - The asynchronous function to execute.
 * @param to - The result we want to return when the function errors.
 * @param filter - An {@linkcode !Error} subclass. If defined, only errors of
 * this type will be coalesced.
 * @typeParam TExecutableReturn - The return type of the function.
 * @typeParam TCoalesce - The type of the object to coalesce to.
 * @typeParam TFilter - The type of the error filter.
 * @returns Whatever the function resolved to, or the provided replacement,
 * in case the function failed.
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

/**
 * Wait a given period before continuing execution.
 * @param duration - How many milliseconds to wait.
 * @returns Nothing
 */
export const sleep = (duration: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

/**
 * Executes an asynchronous function and retries the execution if it rejects.
 * @param executable - The asynchronous function to execute.
 * @param retryDelay - The duration to wait after a failed execution.
 * @param retryCount - How often should the execution be retried?
 * @typeParam TExecutableReturn - The return type of the function.
 * @returns Whatever the function resolved to.
 */
export const retry = async <TExecutableReturn>(
  executable: AnyFunctionReturning<TExecutableReturn | Promise<TExecutableReturn>>,
  retryDelay = 0,
  retryCount = 0,
): Promise<TExecutableReturn> => {
  try {
    return await executable();
  } catch (error) {
    if (0 < retryCount) {
      if (0 < retryDelay) {
        await sleep(retryDelay);
      }
      return retry(executable, retryDelay, --retryCount);
    }
    throw error;
  }
};
