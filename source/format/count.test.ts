import { expect } from "chai";
import { it } from "mocha";
import { formatCount } from "./count.js";

it("formats counts as expected", () => {
  expect(formatCount(-1)).to.equal("-1");
  expect(formatCount(0)).to.equal("0");
  expect(formatCount(1)).to.equal("1");
  expect(formatCount(10)).to.equal("10");
  expect(formatCount(100)).to.equal("100");
  expect(formatCount(1000)).to.equal("1K");
  expect(formatCount(1234)).to.equal("1.234K");
});
