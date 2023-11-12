/**
 * Executes an asynchrous context and ignores any results.
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
 * @returns Whatever the function resolved to, or the provided replacement,
 * in case the function failed.
 * @group Async
 */
export const coalesceOnRejection = async <TExecutableReturn, T>(
  executable: (...args: Array<unknown>) => Promise<TExecutableReturn>,
  to: T,
) => {
  try {
    return await executable();
  } catch (error) {
    return to;
  }
};
