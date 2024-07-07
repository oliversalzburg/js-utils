import { AnyAsyncFunctionReturning, AnyFunctionReturning } from "../core.js";

/**
 * Executes the given function and measures how long the execution takes.
 * @param context - The function of which the execution speed should be measured.
 * @returns A tuple with the result of the function, and the execution time in milliseconds.
 */
export const measure = <TReturn>(context: AnyFunctionReturning<TReturn>): [TReturn, number] => {
  const entry = performance.now();
  return [context(), performance.now() - entry];
};

/**
 * Executes the given async function and measures how long the execution takes.
 * @param context - The async function of which the execution speed should be measured.
 * @returns A tuple with the result of the function, and the execution time in milliseconds.
 */
export const measureAsync = async <TReturn>(
  context: AnyAsyncFunctionReturning<TReturn>,
): Promise<[TReturn, number]> => {
  const entry = performance.now();
  return [await context(), performance.now() - entry];
};
