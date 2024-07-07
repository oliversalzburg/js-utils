/**
 * This code was derived from https://github.com/sindresorhus/pretty-bytes/tree/71d686a4cefb314c13b57107de5add5789753900.
 * It is available under the MIT license.
 */

/**
 * Options for the `formatBytes` function.
 */
export interface FormatBytesOptions {
  /**
   * Include plus sign for positive numbers. If the difference is exactly zero a space character will be prepended instead for better alignment.
   */
  signed?: boolean;

  /**
   * - If `false`: Output won't be localized.
   * - If `true`: Localize the output using the system/browser locale.
   * - If `string`: Expects a [BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)
   * - If `string[]`: Expects a list of [BCP 47 language tags](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)
   */
  locale?: boolean | string | ReadonlyArray<string>;

  /**
   * Format the number as [bits](https://en.wikipedia.org/wiki/Bit) instead of [bytes](https://en.wikipedia.org/wiki/Byte). This can be useful when, for example, referring to [bit rate](https://en.wikipedia.org/wiki/Bit_rate).
   * @example
   * ```
   * import formatBytes from '@oliversalzburg/js-utils/format/bytes.js';
   *
   * formatBytes(1337, {bits: true});
   * //=> '1.34 kbit'
   * ```
   */
  bits?: boolean;

  /**
   * Format the number using the [Binary Prefix](https://en.wikipedia.org/wiki/Binary_prefix) instead of the [SI Prefix](https://en.wikipedia.org/wiki/SI_prefix). This can be useful for presenting memory amounts. However, this should not be used for presenting file sizes.
   * @example
   * ```
   * import formatBytes from '@oliversalzburg/js-utils/format/bytes.js';
   *
   * formatBytes(1000, {binary: true});
   * //=> '1000 bit'
   *
   * formatBytes(1024, {binary: true});
   * //=> '1 kiB'
   * ```
   */
  binary?: boolean;

  /**
   * The minimum number of fraction digits to display.
   *
   * If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.
   * @example
   * ```
   * import formatBytes from '@oliversalzburg/js-utils/format/bytes.js';
   *
   * // Show the number with at least 3 fractional digits
   * formatBytes(1900, {minimumFractionDigits: 3});
   * //=> '1.900 kB'
   *
   * formatBytes(1900);
   * //=> '1.9 kB'
   * ```
   */
  minimumFractionDigits?: number;

  /**
   * The maximum number of fraction digits to display.
   *
   * If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.
   * @example
   * ```
   * import formatBytes from '@oliversalzburg/js-utils/format/bytes.js';
   *
   * // Show the number with at most 1 fractional digit
   * formatBytes(1920, {maximumFractionDigits: 1});
   * //=> '1.9 kB'
   *
   * formatBytes(1920);
   * //=> '1.92 kB'
   * ```
   */
  maximumFractionDigits?: number;

  /**
   * Put a space between the number and unit.
   * @example
   * ```
   * import formatBytes from '@oliversalzburg/js-utils/format/bytes.js';
   *
   * formatBytes(1920, {space: false});
   * //=> '1.9kB'
   *
   * formatBytes(1920);
   * //=> '1.92 kB'
   * ```
   */
  space?: boolean;
}

const BYTE_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

const BIBYTE_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

const BIT_UNITS = ["b", "kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"];

const BIBIT_UNITS = ["b", "kibit", "Mibit", "Gibit", "Tibit", "Pibit", "Eibit", "Zibit", "Yibit"];

/**
 * Formats the given number using `Number#toLocaleString`.
 * - If locale is a string, the value is expected to be a locale-key (for example: `de`).
 * - If locale is true, the system default locale is used for translation.
 * - If no value for locale is specified, the number is returned unmodified.
 * @param number - The number to be formatted.
 * @param locale - The locale to use for formatting.
 * @param options - Formatting options.
 * @returns The formatted number.
 */
const toLocaleString = (
  number: number | string,
  locale: boolean | string | ReadonlyArray<string> | undefined,
  options: Intl.NumberFormatOptions | undefined,
) => {
  let result = number;
  if (typeof locale === "string" || Array.isArray(locale)) {
    result = number.toLocaleString(locale, options);
  } else if (locale === true || options !== undefined) {
    result = number.toLocaleString(undefined, options);
  }

  return result.toString();
};

/**
 * Convert bytes to a human readable string: `1337` → `1.34 kB`.
 * @param number - The number to format.
 * @param options - The options for formatting the number.
 * @returns The formatted string.
 * @example
 * ```
 * import formatBytes from '@oliversalzburg/js-utils/format/bytes.js';
 *
 * formatBytes(1337);
 * //=> '1.34 kB'
 *
 * formatBytes(100);
 * //=> '100 B'
 *
 * // Display file size differences
 * formatBytes(42, {signed: true});
 * //=> '+42 B'
 *
 * // Localized output using German locale
 * formatBytes(1337, {locale: 'de'});
 * //=> '1,34 kB'
 * ```
 */
export const formatBytes = (
  number: number,
  options: Readonly<FormatBytesOptions> = { binary: false, bits: false, space: true },
) => {
  if (!Number.isFinite(number)) {
    throw new TypeError(`Expected a finite number, got ${typeof number}: ${number.toString()}`);
  }

  options = {
    bits: false,
    binary: false,
    space: true,
    ...options,
  };

  const UNITS = options.bits
    ? options.binary
      ? BIBIT_UNITS
      : BIT_UNITS
    : options.binary
      ? BIBYTE_UNITS
      : BYTE_UNITS;

  const separator = options.space ? " " : "";

  if (options.signed && number === 0) {
    return ` 0${separator}${UNITS[0]}`;
  }

  const isNegative = number < 0;
  const prefix = isNegative ? "-" : options.signed ? "+" : "";

  if (isNegative) {
    number = -number;
  }

  let localeOptions;

  if (options.minimumFractionDigits !== undefined) {
    localeOptions = { minimumFractionDigits: options.minimumFractionDigits };
  }

  if (options.maximumFractionDigits !== undefined) {
    localeOptions = { maximumFractionDigits: options.maximumFractionDigits, ...localeOptions };
  }

  if (number < 1) {
    const numberString = toLocaleString(number, options.locale, localeOptions);
    return prefix + numberString + separator + UNITS[0];
  }

  const exponent = Math.min(
    Math.floor(options.binary ? Math.log(number) / Math.log(1024) : Math.log10(number) / 3),
    UNITS.length - 1,
  );
  number /= (options.binary ? 1024 : 1000) ** exponent;

  if (!localeOptions) {
    number = Number(number.toPrecision(3));
  }

  const numberString = toLocaleString(number, options.locale, localeOptions);

  const unit = UNITS[exponent];

  return prefix + numberString + separator + unit;
};
