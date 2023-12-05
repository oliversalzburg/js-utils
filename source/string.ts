/**
 * Indent every line of the passed text.
 * @param subject - The text to indent.
 * @param depth - How often to apply the indenting.
 * @param prefix - The string to use as the indent.
 * @returns The indented text.
 * @group Strings
 */
export const indent = (subject: string, depth = 0, prefix = "    "): string =>
  subject.replaceAll(/^/gm, prefix.repeat(depth));

/**
 * A fast and simple 53-bit string hash function with decent collision resistance.
 * Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
 * License: Public domain. Attribution appreciated.
 * cyrb53 (c) 2018 bryc (github.com/bryc)
 * @param subject - The string to hash.
 * @param seed - An optional seed value.
 * @returns A hash of the string.
 * @group Strings
 */
export const cyrb53 = (subject: string, seed = 0): string => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < subject.length; i++) {
    ch = subject.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
};
