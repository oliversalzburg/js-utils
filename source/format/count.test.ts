import { expect } from "chai";
import { it } from "mocha";
import { formatCount } from "./count.js";

it("formats counts as expected", function () {
  // Fails on NodeJS20 on Windows
  // https://github.com/oliversalzburg/js-utils/actions/runs/9069549841/job/24919347525
  this.timeout(5000);

  expect(formatCount(-1)).to.equal("-1");
  expect(formatCount(0)).to.equal("0");
  expect(formatCount(1)).to.equal("1");
  expect(formatCount(10)).to.equal("10");
  expect(formatCount(100)).to.equal("100");
  expect(formatCount(1000)).to.equal("1K");
  expect(formatCount(1234)).to.equal("1.234K");
});
