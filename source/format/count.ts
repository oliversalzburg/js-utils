import { mustExist } from "../data/nil.js";

/**
 * Convert counts to a human readable string: `1234` → `1.234K`.
 * @param count - The count to format.
 * @param locale - The locale to use.
 * @returns The formatted string.
 */
export const formatCount = (count: number | bigint, locale?: string): string => {
  return new Intl.NumberFormat(locale, {
    compactDisplay: "short",
    maximumFractionDigits: 3,
    notation: "compact",
  }).format(count);
};

/**
 * Convert counts from a human readable string back to a number: `1.234K` → `1234`.
 * @param count - The count to parse.
 * @param locale - The locale to use.
 * @returns The number represented by the input string.
 */
export const parseCount = (count: string, locale?: string): number => {
  const format = new Intl.NumberFormat(locale);
  const parts = format.formatToParts(-12345.6);
  const numerals = Array.from({ length: 10 }).map((_, i) => format.format(i));
  const index = new Map(numerals.map((d, i) => [d, i]));
  const minusSign = new RegExp(`[${mustExist(parts.find(d => d.type === "minusSign")).value}]`);
  const group = new RegExp(`[${mustExist(parts.find(d => d.type === "group")).value}]`, "g");
  const decimal = new RegExp(`[${mustExist(parts.find(d => d.type === "decimal")).value}]`);
  const numeral = new RegExp(`[${numerals.join("")}]`, "g");

  const DIRECTION_MARK = /\u061c|\u200e/g;
  return +count
    .trim()
    .replace(DIRECTION_MARK, "")
    .replace(group, "")
    .replace(decimal, ".")
    .replace(numeral, d => mustExist(index.get(d)).toString())
    .replace(minusSign, "-");
};
