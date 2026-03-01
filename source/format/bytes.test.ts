import assert from "node:assert";
import { it } from "node:test";
import { formatBytes } from "./bytes.js";

it("throws on invalid input", () => {
  assert.throws(() => {
    formatBytes("" as unknown as number);
  });

  assert.throws(() => {
    formatBytes("1" as unknown as number);
  });

  assert.throws(() => {
    formatBytes(Number.NaN);
  });

  assert.throws(() => {
    formatBytes(true as unknown as number);
  });

  assert.throws(() => {
    formatBytes(Number.POSITIVE_INFINITY);
  });

  assert.throws(() => {
    formatBytes(Number.NEGATIVE_INFINITY);
  });

  assert.throws(() => {
    formatBytes(null as unknown as number);
  });
});

it("converts bytes to human readable strings", () => {
  assert.strictEqual(formatBytes(0), "0 B");
  assert.strictEqual(formatBytes(0.4), "0.4 B");
  assert.strictEqual(formatBytes(0.7), "0.7 B");
  assert.strictEqual(formatBytes(10), "10 B");
  assert.strictEqual(formatBytes(10.1), "10.1 B");
  assert.strictEqual(formatBytes(999), "999 B");
  assert.strictEqual(formatBytes(1001), "1 kB");
  assert.strictEqual(formatBytes(1e16), "10 PB");
  assert.strictEqual(formatBytes(1e30), "1000000 YB");
});

it("supports negative number", () => {
  assert.strictEqual(formatBytes(-0.4), "-0.4 B");
  assert.strictEqual(formatBytes(-0.7), "-0.7 B");
  assert.strictEqual(formatBytes(-10.1), "-10.1 B");
  assert.strictEqual(formatBytes(-999), "-999 B");
  assert.strictEqual(formatBytes(-1001), "-1 kB");
});

it("locale option", function () {
  assert.strictEqual(formatBytes(-0.4, { locale: "de" }), "-0,4 B");
  assert.strictEqual(formatBytes(0.4, { locale: "de" }), "0,4 B");
  assert.strictEqual(formatBytes(1001, { locale: "de" }), "1 kB");
  assert.strictEqual(formatBytes(10.1, { locale: "de" }), "10,1 B");
  assert.strictEqual(formatBytes(1e30, { locale: "de" }), "1.000.000 YB");

  assert.strictEqual(formatBytes(-0.4, { locale: "en" }), "-0.4 B");
  assert.strictEqual(formatBytes(0.4, { locale: "en" }), "0.4 B");
  assert.strictEqual(formatBytes(1001, { locale: "en" }), "1 kB");
  assert.strictEqual(formatBytes(10.1, { locale: "en" }), "10.1 B");
  assert.strictEqual(formatBytes(1e30, { locale: "en" }), "1,000,000 YB");

  assert.strictEqual(formatBytes(-0.4, { locale: ["unknown", "de", "en"] }), "-0,4 B");
  assert.strictEqual(formatBytes(0.4, { locale: ["unknown", "de", "en"] }), "0,4 B");
  assert.strictEqual(formatBytes(1001, { locale: ["unknown", "de", "en"] }), "1 kB");
  assert.strictEqual(formatBytes(10.1, { locale: ["unknown", "de", "en"] }), "10,1 B");
  assert.strictEqual(formatBytes(1e30, { locale: ["unknown", "de", "en"] }), "1.000.000 YB");

  assert.strictEqual(formatBytes(-0.4, { locale: true }), "-0.4 B");
  assert.strictEqual(formatBytes(0.4, { locale: true }), "0.4 B");
  assert.strictEqual(formatBytes(1001, { locale: true }), "1 kB");
  assert.strictEqual(formatBytes(10.1, { locale: true }), "10.1 B");
  assert.strictEqual(formatBytes(1e30, { locale: true }), "1,000,000 YB");

  assert.strictEqual(formatBytes(-0.4, { locale: false }), "-0.4 B");
  assert.strictEqual(formatBytes(0.4, { locale: false }), "0.4 B");
  assert.strictEqual(formatBytes(1001, { locale: false }), "1 kB");
  assert.strictEqual(formatBytes(10.1, { locale: false }), "10.1 B");
  assert.strictEqual(formatBytes(1e30, { locale: false }), "1000000 YB");

  assert.strictEqual(formatBytes(-0.4, { locale: undefined }), "-0.4 B");
  assert.strictEqual(formatBytes(0.4, { locale: undefined }), "0.4 B");
  assert.strictEqual(formatBytes(1001, { locale: undefined }), "1 kB");
  assert.strictEqual(formatBytes(10.1, { locale: undefined }), "10.1 B");
  assert.strictEqual(formatBytes(1e30, { locale: undefined }), "1000000 YB");
});

it("signed option", () => {
  assert.strictEqual(formatBytes(42, { signed: true }), "+42 B");
  assert.strictEqual(formatBytes(-13, { signed: true }), "-13 B");
  assert.strictEqual(formatBytes(0, { signed: true }), " 0 B");
});

it("bits option", () => {
  assert.strictEqual(formatBytes(0, { bits: true }), "0 b");
  assert.strictEqual(formatBytes(0.4, { bits: true }), "0.4 b");
  assert.strictEqual(formatBytes(0.7, { bits: true }), "0.7 b");
  assert.strictEqual(formatBytes(10, { bits: true }), "10 b");
  assert.strictEqual(formatBytes(10.1, { bits: true }), "10.1 b");
  assert.strictEqual(formatBytes(999, { bits: true }), "999 b");
  assert.strictEqual(formatBytes(1001, { bits: true }), "1 kbit");
  assert.strictEqual(formatBytes(1001, { bits: true }), "1 kbit");
  assert.strictEqual(formatBytes(1e16, { bits: true }), "10 Pbit");
  assert.strictEqual(formatBytes(1e30, { bits: true }), "1000000 Ybit");
});

it("binary option", () => {
  assert.strictEqual(formatBytes(0, { binary: true }), "0 B");
  assert.strictEqual(formatBytes(4, { binary: true }), "4 B");
  assert.strictEqual(formatBytes(10, { binary: true }), "10 B");
  assert.strictEqual(formatBytes(10.1, { binary: true }), "10.1 B");
  assert.strictEqual(formatBytes(999, { binary: true }), "999 B");
  assert.strictEqual(formatBytes(1025, { binary: true }), "1 KiB");
  assert.strictEqual(formatBytes(1001, { binary: true }), "1000 B");
  assert.strictEqual(formatBytes(1e16, { binary: true }), "8.88 PiB");
  assert.strictEqual(formatBytes(1e30, { binary: true }), "827000 YiB");
});

it("bits and binary option", () => {
  assert.strictEqual(formatBytes(0, { binary: true, bits: true }), "0 b");
  assert.strictEqual(formatBytes(4, { binary: true, bits: true }), "4 b");
  assert.strictEqual(formatBytes(10, { binary: true, bits: true }), "10 b");
  assert.strictEqual(formatBytes(999, { binary: true, bits: true }), "999 b");
  assert.strictEqual(formatBytes(1025, { binary: true, bits: true }), "1 kibit");
  assert.strictEqual(formatBytes(1e6, { binary: true, bits: true }), "977 kibit");
});

it("fractional digits options", () => {
  assert.strictEqual(formatBytes(1900, { maximumFractionDigits: 1 }), "1.9 kB");
  assert.strictEqual(formatBytes(1900, { minimumFractionDigits: 3 }), "1.900 kB");
  assert.strictEqual(formatBytes(1911, { maximumFractionDigits: 1 }), "1.9 kB");
  assert.strictEqual(formatBytes(1111, { maximumFractionDigits: 2 }), "1.11 kB");
  assert.strictEqual(formatBytes(1019, { maximumFractionDigits: 3 }), "1.019 kB");
  assert.strictEqual(formatBytes(1001, { maximumFractionDigits: 3 }), "1.001 kB");
  assert.strictEqual(
    formatBytes(1000, { maximumFractionDigits: 3, minimumFractionDigits: 1 }),
    "1.0 kB",
  );
  assert.strictEqual(
    formatBytes(3942, { maximumFractionDigits: 2, minimumFractionDigits: 1 }),
    "3.94 kB",
  );
  assert.strictEqual(formatBytes(4001, { binary: true, maximumFractionDigits: 3 }), "3.907 KiB");
  assert.strictEqual(formatBytes(18_717, { binary: true, maximumFractionDigits: 2 }), "18.28 KiB");
  assert.strictEqual(
    formatBytes(18_717, { binary: true, maximumFractionDigits: 4 }),
    "18.2783 KiB",
  );
  assert.strictEqual(
    formatBytes(32_768, { binary: true, maximumFractionDigits: 3, minimumFractionDigits: 2 }),
    "32.00 KiB",
  );
  assert.strictEqual(
    formatBytes(65_536, { binary: true, maximumFractionDigits: 3, minimumFractionDigits: 1 }),
    "64.0 KiB",
  );
});

it("space option", () => {
  assert.strictEqual(formatBytes(0), "0 B");
  assert.strictEqual(formatBytes(0, { space: false }), "0B");
  assert.strictEqual(formatBytes(999), "999 B");
  assert.strictEqual(formatBytes(999, { space: false }), "999B");
  assert.strictEqual(formatBytes(-13, { signed: true }), "-13 B");
  assert.strictEqual(formatBytes(-13, { signed: true, space: false }), "-13B");
  assert.strictEqual(formatBytes(42, { signed: true }), "+42 B");
  assert.strictEqual(formatBytes(42, { signed: true, space: false }), "+42B");
});
