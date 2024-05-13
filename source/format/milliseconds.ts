/**
 * This code was derived from https://github.com/sindresorhus/parse-ms/tree/a18636bb609793326a1bd8d541aad49f715f0a40
 * and https://github.com/sindresorhus/pretty-ms/tree/763fe075d8a62aa8d9ee603bfad2f3107c3a9f02.
 * It is available under the MIT license.
 */

/**
 * Options for the `formatMilliseconds` function.
 * @group Formatting
 */
export interface FormatMillisecondsOptions {
  /**
   * Number of digits to appear after the seconds decimal point.
   */
  secondsDecimalDigits?: number;

  /**
   * Number of digits to appear after the milliseconds decimal point.
   *
   * Useful in combination with [`process.hrtime()`](https://nodejs.org/api/process.html#process_process_hrtime).
   */
  millisecondsDecimalDigits?: number;

  /**
   * Keep milliseconds on whole seconds: `13s` → `13.0s`.
   *
   * Useful when you are showing a number of seconds spent on an operation and don't want the width of the output to change when hitting a whole number.
   */
  keepDecimalsOnWholeSeconds?: boolean;

  /**
   * Only show the first unit: `1h 10m` → `1h`.
   *
   * Also ensures that `millisecondsDecimalDigits` and `secondsDecimalDigits` are both set to `0`.
   */
  compact?: boolean;

  /**
   * Number of units to show. Setting `compact` to `true` overrides this option.
   */
  unitCount?: number;

  /**
   * Use full-length units: `5h 1m 45s` → `5 hours 1 minute 45 seconds`.
   */
  verbose?: boolean;

  /**
   * Show milliseconds separately. This means they won't be included in the decimal part of the seconds.
   */
  separateMilliseconds?: boolean;

  /**
   * Show microseconds and nanoseconds.
   */
  formatSubMilliseconds?: boolean;

  /**
   * Display time using colon notation: `5h 1m 45s` → `5:01:45`. Always shows time in at least minutes: `1s` → `0:01`
   *
   * Useful when you want to display time without the time units, similar to a digital watch.
   *
   * Setting `colonNotation` to `true` overrides the following options to `false`:
   * - `compact`
   * - `formatSubMilliseconds`
   * - `separateMilliseconds`
   * - `verbose`
   */
  colonNotation?: boolean;
}

const toZeroIfInfinity = (value: number) => (Number.isFinite(value) ? value : 0);

const parseNumber = (milliseconds: number) => {
  return {
    days: Math.trunc(milliseconds / 86_400_000),
    hours: Math.trunc((milliseconds / 3_600_000) % 24),
    minutes: Math.trunc((milliseconds / 60_000) % 60),
    seconds: Math.trunc((milliseconds / 1000) % 60),
    milliseconds: Math.trunc(milliseconds % 1000),
    microseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1000) % 1000),
    nanoseconds: Math.trunc(toZeroIfInfinity(milliseconds * 1e6) % 1000),
  };
};

const parseBigint = (milliseconds: bigint) => {
  return {
    days: milliseconds / 86_400_000n,
    hours: (milliseconds / 3_600_000n) % 24n,
    minutes: (milliseconds / 60_000n) % 60n,
    seconds: (milliseconds / 1000n) % 60n,
    milliseconds: milliseconds % 1000n,
    microseconds: 0n,
    nanoseconds: 0n,
  };
};

const parseMilliseconds = (milliseconds: number | bigint) => {
  switch (typeof milliseconds) {
    case "number": {
      if (Number.isFinite(milliseconds)) {
        return parseNumber(milliseconds);
      }

      break;
    }

    case "bigint": {
      return parseBigint(milliseconds);
    }

    // No default
  }

  throw new TypeError("Expected a finite number or bigint");
};

const isZero = (value: unknown) => value === 0 || value === 0n;
const pluralize = (word: string, count: number | bigint) =>
  count === 1 || count === 1n ? word : `${word}s`;

const SECOND_ROUNDING_EPSILON = 0.000_000_1;
const ONE_DAY_IN_MILLISECONDS = 24n * 60n * 60n * 1000n;

/**
 * Convert milliseconds to a human readable string: `1337000000` → `15d 11h 23m 20s`.
 * @param milliseconds - Milliseconds to humanize.
 * @param options - Options for humanizing the milliseconds.
 * @returns The humanized string.
 * @group Formatting
 * @example
 * ```
 * import formatMilliseconds from '@oliversalzburg/js-utils/format/milliseconds.js';
 *
 * formatMilliseconds(1337000000);
 * //=> '15d 11h 23m 20s'
 *
 * formatMilliseconds(1337);
 * //=> '1.3s'
 *
 * formatMilliseconds(133);
 * //=> '133ms'
 *
 * // `compact` option
 * formatMilliseconds(1337, {compact: true});
 * //=> '1s'
 *
 * // `verbose` option
 * formatMilliseconds(1335669000, {verbose: true});
 * //=> '15 days 11 hours 1 minute 9 seconds'
 *
 * // `colonNotation` option
 * formatMilliseconds(95500, {colonNotation: true});
 * //=> '1:35.5'
 *
 * // `formatSubMilliseconds` option
 * formatMilliseconds(100.400080, {formatSubMilliseconds: true})
 * //=> '100ms 400µs 80ns'
 *
 * // Can be useful for time durations
 * formatMilliseconds(new Date(2014, 0, 1, 10, 40) - new Date(2014, 0, 1, 10, 5))
 * //=> '35m'
 * ```
 */
export const formatMilliseconds = (
  milliseconds: number | bigint,
  options: Readonly<FormatMillisecondsOptions> = {
    colonNotation: false,
    compact: false,
    formatSubMilliseconds: false,
    keepDecimalsOnWholeSeconds: false,
    millisecondsDecimalDigits: 0,
    secondsDecimalDigits: 1,
    separateMilliseconds: false,
    unitCount: Infinity,
    verbose: false,
  },
) => {
  const isBigInt = typeof milliseconds === "bigint";
  if (!isBigInt && !Number.isFinite(milliseconds)) {
    throw new TypeError("Expected a finite number or bigint");
  }

  const optionsAdjusted: FormatMillisecondsOptions = { ...options };

  if (optionsAdjusted.colonNotation) {
    optionsAdjusted.compact = false;
    optionsAdjusted.formatSubMilliseconds = false;
    optionsAdjusted.separateMilliseconds = false;
    optionsAdjusted.verbose = false;
  }

  if (optionsAdjusted.compact) {
    optionsAdjusted.unitCount = 1;
    optionsAdjusted.secondsDecimalDigits = 0;
    optionsAdjusted.millisecondsDecimalDigits = 0;
  }

  let result: Array<string> = [];

  const floorDecimals = (value: number, decimalDigits: number) => {
    const flooredInterimValue = Math.floor(value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON);
    const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
    return flooredValue.toFixed(decimalDigits);
  };

  const add = (value: number | bigint, long: string, short: string, valueString?: string) => {
    if (
      (result.length === 0 || !optionsAdjusted.colonNotation) &&
      isZero(value) &&
      !(optionsAdjusted.colonNotation && short === "m")
    ) {
      return;
    }

    valueString ??= String(value);
    if (optionsAdjusted.colonNotation) {
      const wholeDigits = valueString.includes(".")
        ? valueString.split(".")[0].length
        : valueString.length;
      const minLength = result.length > 0 ? 2 : 1;
      valueString = "0".repeat(Math.max(0, minLength - wholeDigits)) + valueString;
    } else {
      valueString += optionsAdjusted.verbose ? " " + pluralize(long, value) : short;
    }

    result.push(valueString);
  };

  const parsed = parseMilliseconds(milliseconds);
  const days = BigInt(parsed.days);

  add(days / 365n, "year", "y");
  add(days % 365n, "day", "d");
  add(Number(parsed.hours), "hour", "h");
  add(Number(parsed.minutes), "minute", "m");

  if (
    optionsAdjusted.separateMilliseconds ||
    optionsAdjusted.formatSubMilliseconds ||
    (!optionsAdjusted.colonNotation && milliseconds < 1000)
  ) {
    const seconds = Number(parsed.seconds);
    const milliseconds = Number(parsed.milliseconds);
    const microseconds = Number(parsed.microseconds);
    const nanoseconds = Number(parsed.nanoseconds);

    add(seconds, "second", "s");

    if (optionsAdjusted.formatSubMilliseconds) {
      add(milliseconds, "millisecond", "ms");
      add(microseconds, "microsecond", "µs");
      add(nanoseconds, "nanosecond", "ns");
    } else {
      const millisecondsAndBelow = milliseconds + microseconds / 1000 + nanoseconds / 1e6;

      const millisecondsDecimalDigits =
        typeof optionsAdjusted.millisecondsDecimalDigits === "number"
          ? optionsAdjusted.millisecondsDecimalDigits
          : 0;

      const roundedMilliseconds =
        millisecondsAndBelow >= 1
          ? Math.round(millisecondsAndBelow)
          : Math.ceil(millisecondsAndBelow);

      const millisecondsString = millisecondsDecimalDigits
        ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits)
        : roundedMilliseconds.toString();

      add(Number.parseFloat(millisecondsString), "millisecond", "ms", millisecondsString);
    }
  } else {
    const seconds =
      ((isBigInt ? Number(milliseconds % ONE_DAY_IN_MILLISECONDS) : milliseconds) / 1000) % 60;
    const secondsDecimalDigits =
      typeof optionsAdjusted.secondsDecimalDigits === "number"
        ? optionsAdjusted.secondsDecimalDigits
        : 1;
    const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
    const secondsString = optionsAdjusted.keepDecimalsOnWholeSeconds
      ? secondsFixed
      : secondsFixed.replace(/\.0+$/, "");
    add(Number.parseFloat(secondsString), "second", "s", secondsString);
  }

  if (result.length === 0) {
    return "0" + (optionsAdjusted.verbose ? " milliseconds" : "ms");
  }

  const separator = optionsAdjusted.colonNotation ? ":" : " ";
  if (typeof optionsAdjusted.unitCount === "number") {
    result = result.slice(0, Math.max(optionsAdjusted.unitCount, 1));
  }

  return result.join(separator);
};
