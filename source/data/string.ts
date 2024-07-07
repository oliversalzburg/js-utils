import { mustExist } from "./nil.js";

/**
 * Indent every line of the passed text.
 * @param subject - The text to indent.
 * @param depth - How often to apply the indenting.
 * @param prefix - The string to use as the indent.
 * @returns The indented text.
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
 */
export const hashCyrb53 = (subject: string, seed = 0): string => {
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

/**
 * Encodes the provided string in Base64.
 * @param subject - The string to encode.
 * @returns The subject string encoded in Base64.
 */
export const base64Encode = (subject: string): string => {
  const bytes = new TextEncoder().encode(subject);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
};

/**
 * Decodes the provided Base64 encoded string.
 * @param subject - The string to decode.
 * @returns The decoded subject string.
 */
export const base64Decode = (subject: string): string => {
  const binString = atob(subject);
  const bytes = Uint8Array.from(binString, m => mustExist(m.codePointAt(0)));
  return new TextDecoder().decode(bytes);
};
