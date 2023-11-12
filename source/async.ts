/**
 * Wraps the given asynchronous function in a new function that will ignore any outcome of
 * the context as it resolves.
 *
 * This can be useful when providing asynchonous event handler to `.addEventlistener()`,
 * which only expects synchronous functions.
 * @param context The asynchronous function to exectute.
 * @returns Nothing
 * @group Async
 */
export const prepareAsyncContext = (context: (...args: Array<any>) => Promise<unknown>) => {
  return () => {
    void context()
      .then(() => undefined)
      .catch(() => undefined);
  };
};

/**
 * Executes an asynchronous function and resolves with an alternative result
 * in case the function failed.
 * @param executable The asynchronous function to execute.
 * @param to The result we want to return when the function errors.
 * @template {unknown} TExecutableReturn The return type of the function.
 * @template {unknown} TCoalesce The type of the object to coalesce to.
 * @returns Whatever the function resolved to, or the provided replacement,
 * in case the function failed.
 * @group Async
 */
export const coalesceOnRejection = async <TExecutableReturn, TCoalesce>(
  executable: (...args: Array<unknown>) => Promise<TExecutableReturn>,
  to: TCoalesce,
) => {
  try {
    return await executable();
  } catch (error) {
    return to;
  }
};
