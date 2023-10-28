/**
 * Formats a given input string with numeric placeholders.
 * @example
 * // returns "Hello World"
 * formatString("{0} {1}", ["Hello", "World"]);
 * @param string The input string with placeholders.
 * @param formatArguments An array of strings to place into the placeholders.
 * @returns The formatted string.
 */
export const formatString = (string: string, ...formatArguments: Array<string>): string => {
  return string.replace(/{(\d+)}/g, (match, matchedDigits: number): string =>
    typeof formatArguments[matchedDigits] !== "undefined" ? formatArguments[matchedDigits] : match,
  );
};

/**
 * Formats a given input string with alphanumeric placeholders.
 * @example
 * // returns "Hello World"
 * formatString("{first} {second}", {first:"Hello", second:"World"});
 * @param string The input string with placeholders.
 * @param parameters A hash of parameters to place in the placeholders.
 * @returns The formatted string.
 */
export const formatStringTemplate = (
  string: string,
  parameters: Record<string, string | undefined>,
): string => {
  string = string.replace(
    /#{[\w.]+}/g,
    query => parameters[query.slice(2, query.length - 1)] ?? "<missing parameter>",
  );
  return string;
};
