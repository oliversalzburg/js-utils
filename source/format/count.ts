/**
 * Convert counts to a human readable string: `1234` → `1.234K`.
 * @param count - The count to format.
 * @returns The formatted string.
 */
export const formatCount = (count: number | bigint): string => {
  return new Intl.NumberFormat(undefined, {
    compactDisplay: "short",
    maximumFractionDigits: 3,
    notation: "compact",
  }).format(count);
};
