import { expect } from "chai";
import { it } from "mocha";
import { formatBytes } from "./bytes.js";

it("throws on invalid input", () => {
  expect(() => {
    formatBytes("" as unknown as number);
  }).to.throw();

  expect(() => {
    formatBytes("1" as unknown as number);
  }).to.throw();

  expect(() => {
    formatBytes(Number.NaN);
  }).to.throw();

  expect(() => {
    formatBytes(true as unknown as number);
  }).to.throw();

  expect(() => {
    formatBytes(Number.POSITIVE_INFINITY);
  }).to.throw();

  expect(() => {
    formatBytes(Number.NEGATIVE_INFINITY);
  }).to.throw();

  expect(() => {
    formatBytes(null as unknown as number);
  }).to.throw();
});

it("converts bytes to human readable strings", () => {
  expect(formatBytes(0)).to.equal("0 B");
  expect(formatBytes(0.4)).to.equal("0.4 B");
  expect(formatBytes(0.7)).to.equal("0.7 B");
  expect(formatBytes(10)).to.equal("10 B");
  expect(formatBytes(10.1)).to.equal("10.1 B");
  expect(formatBytes(999)).to.equal("999 B");
  expect(formatBytes(1001)).to.equal("1 kB");
  expect(formatBytes(1e16)).to.equal("10 PB");
  expect(formatBytes(1e30)).to.equal("1000000 YB");
});

it("supports negative number", () => {
  expect(formatBytes(-0.4)).to.equal("-0.4 B");
  expect(formatBytes(-0.7)).to.equal("-0.7 B");
  expect(formatBytes(-10.1)).to.equal("-10.1 B");
  expect(formatBytes(-999)).to.equal("-999 B");
  expect(formatBytes(-1001)).to.equal("-1 kB");
});

it("locale option", function () {
  // Fails on NodeJS20 on Windows
  // https://github.com/oliversalzburg/js-utils/actions/runs/9069549841/job/24919347525
  this.timeout(5000);

  expect(formatBytes(-0.4, { locale: "de" })).to.equal("-0,4 B");
  expect(formatBytes(0.4, { locale: "de" })).to.equal("0,4 B");
  expect(formatBytes(1001, { locale: "de" })).to.equal("1 kB");
  expect(formatBytes(10.1, { locale: "de" })).to.equal("10,1 B");
  expect(formatBytes(1e30, { locale: "de" })).to.equal("1.000.000 YB");

  expect(formatBytes(-0.4, { locale: "en" })).to.equal("-0.4 B");
  expect(formatBytes(0.4, { locale: "en" })).to.equal("0.4 B");
  expect(formatBytes(1001, { locale: "en" })).to.equal("1 kB");
  expect(formatBytes(10.1, { locale: "en" })).to.equal("10.1 B");
  expect(formatBytes(1e30, { locale: "en" })).to.equal("1,000,000 YB");

  expect(formatBytes(-0.4, { locale: ["unknown", "de", "en"] })).to.equal("-0,4 B");
  expect(formatBytes(0.4, { locale: ["unknown", "de", "en"] })).to.equal("0,4 B");
  expect(formatBytes(1001, { locale: ["unknown", "de", "en"] })).to.equal("1 kB");
  expect(formatBytes(10.1, { locale: ["unknown", "de", "en"] })).to.equal("10,1 B");
  expect(formatBytes(1e30, { locale: ["unknown", "de", "en"] })).to.equal("1.000.000 YB");

  expect(formatBytes(-0.4, { locale: true })).to.equal("-0.4 B");
  expect(formatBytes(0.4, { locale: true })).to.equal("0.4 B");
  expect(formatBytes(1001, { locale: true })).to.equal("1 kB");
  expect(formatBytes(10.1, { locale: true })).to.equal("10.1 B");
  expect(formatBytes(1e30, { locale: true })).to.equal("1,000,000 YB");

  expect(formatBytes(-0.4, { locale: false })).to.equal("-0.4 B");
  expect(formatBytes(0.4, { locale: false })).to.equal("0.4 B");
  expect(formatBytes(1001, { locale: false })).to.equal("1 kB");
  expect(formatBytes(10.1, { locale: false })).to.equal("10.1 B");
  expect(formatBytes(1e30, { locale: false })).to.equal("1000000 YB");

  expect(formatBytes(-0.4, { locale: undefined })).to.equal("-0.4 B");
  expect(formatBytes(0.4, { locale: undefined })).to.equal("0.4 B");
  expect(formatBytes(1001, { locale: undefined })).to.equal("1 kB");
  expect(formatBytes(10.1, { locale: undefined })).to.equal("10.1 B");
  expect(formatBytes(1e30, { locale: undefined })).to.equal("1000000 YB");
});

it("signed option", () => {
  expect(formatBytes(42, { signed: true })).to.equal("+42 B");
  expect(formatBytes(-13, { signed: true })).to.equal("-13 B");
  expect(formatBytes(0, { signed: true })).to.equal(" 0 B");
});

it("bits option", () => {
  expect(formatBytes(0, { bits: true })).to.equal("0 b");
  expect(formatBytes(0.4, { bits: true })).to.equal("0.4 b");
  expect(formatBytes(0.7, { bits: true })).to.equal("0.7 b");
  expect(formatBytes(10, { bits: true })).to.equal("10 b");
  expect(formatBytes(10.1, { bits: true })).to.equal("10.1 b");
  expect(formatBytes(999, { bits: true })).to.equal("999 b");
  expect(formatBytes(1001, { bits: true })).to.equal("1 kbit");
  expect(formatBytes(1001, { bits: true })).to.equal("1 kbit");
  expect(formatBytes(1e16, { bits: true })).to.equal("10 Pbit");
  expect(formatBytes(1e30, { bits: true })).to.equal("1000000 Ybit");
});

it("binary option", () => {
  expect(formatBytes(0, { binary: true })).to.equal("0 B");
  expect(formatBytes(4, { binary: true })).to.equal("4 B");
  expect(formatBytes(10, { binary: true })).to.equal("10 B");
  expect(formatBytes(10.1, { binary: true })).to.equal("10.1 B");
  expect(formatBytes(999, { binary: true })).to.equal("999 B");
  expect(formatBytes(1025, { binary: true })).to.equal("1 KiB");
  expect(formatBytes(1001, { binary: true })).to.equal("1000 B");
  expect(formatBytes(1e16, { binary: true })).to.equal("8.88 PiB");
  expect(formatBytes(1e30, { binary: true })).to.equal("827000 YiB");
});

it("bits and binary option", () => {
  expect(formatBytes(0, { bits: true, binary: true })).to.equal("0 b");
  expect(formatBytes(4, { bits: true, binary: true })).to.equal("4 b");
  expect(formatBytes(10, { bits: true, binary: true })).to.equal("10 b");
  expect(formatBytes(999, { bits: true, binary: true })).to.equal("999 b");
  expect(formatBytes(1025, { bits: true, binary: true })).to.equal("1 kibit");
  expect(formatBytes(1e6, { bits: true, binary: true })).to.equal("977 kibit");
});

it("fractional digits options", () => {
  expect(formatBytes(1900, { maximumFractionDigits: 1 })).to.equal("1.9 kB");
  expect(formatBytes(1900, { minimumFractionDigits: 3 })).to.equal("1.900 kB");
  expect(formatBytes(1911, { maximumFractionDigits: 1 })).to.equal("1.9 kB");
  expect(formatBytes(1111, { maximumFractionDigits: 2 })).to.equal("1.11 kB");
  expect(formatBytes(1019, { maximumFractionDigits: 3 })).to.equal("1.019 kB");
  expect(formatBytes(1001, { maximumFractionDigits: 3 })).to.equal("1.001 kB");
  expect(formatBytes(1000, { minimumFractionDigits: 1, maximumFractionDigits: 3 })).to.equal(
    "1.0 kB",
  );
  expect(formatBytes(3942, { minimumFractionDigits: 1, maximumFractionDigits: 2 })).to.equal(
    "3.94 kB",
  );
  expect(formatBytes(4001, { maximumFractionDigits: 3, binary: true })).to.equal("3.907 KiB");
  expect(formatBytes(18_717, { maximumFractionDigits: 2, binary: true })).to.equal("18.28 KiB");
  expect(formatBytes(18_717, { maximumFractionDigits: 4, binary: true })).to.equal("18.2783 KiB");
  expect(
    formatBytes(32_768, { minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true }),
  ).to.equal("32.00 KiB");
  expect(
    formatBytes(65_536, { minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true }),
  ).to.equal("64.0 KiB");
});

it("space option", () => {
  expect(formatBytes(0)).to.equal("0 B");
  expect(formatBytes(0, { space: false })).to.equal("0B");
  expect(formatBytes(999)).to.equal("999 B");
  expect(formatBytes(999, { space: false })).to.equal("999B");
  expect(formatBytes(-13, { signed: true })).to.equal("-13 B");
  expect(formatBytes(-13, { signed: true, space: false })).to.equal("-13B");
  expect(formatBytes(42, { signed: true })).to.equal("+42 B");
  expect(formatBytes(42, { signed: true, space: false })).to.equal("+42B");
});
