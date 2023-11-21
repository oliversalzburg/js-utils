/**
 * Indent every line of the passed text.
 * @param text - The text to indent.
 * @param depth - How often to apply the indenting.
 * @param prefix - The string to use as the indent.
 * @returns The indented text.
 * @group Strings
 */
export const indent = (text: string, depth = 0, prefix = "    ") =>
  text.replaceAll(/^/gm, prefix.repeat(depth));
