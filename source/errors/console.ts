/**
 * Returns a function that will receive errors (or anything else that was `throw`n)
 * and prints it to a {@linkcode !console}.
 * @param console - The console to print errors to.
 * @returns A function that will print errors to the console.
 * @group Errors
 */
export const redirectErrorsToConsole = (console: Console): ((error: unknown) => void) => {
  const printErrorsToConsole = (error: unknown): void => {
    console.error(error);
  };
  return printErrorsToConsole;
};
