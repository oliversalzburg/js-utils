import { expect } from "chai";
import { it } from "mocha";
import { formatString, formatStringTemplate } from "./string.js";

it("formats index-based template strings", () => {
  expect(formatString("'{0}'", "foo")).to.equal("'foo'");
  expect(formatString("'{0}': {1}", "foo", "bar")).to.equal("'foo': bar");
  expect(formatString("'{0}': {1}", "foo")).to.equal("'foo': {1}");
});

it("formats literal-based template strings", () => {
  expect(formatStringTemplate("'#{foo}'", { foo: "foo" })).to.equal("'foo'");
  expect(formatStringTemplate("'#{foo}': #{bar}", { bar: "bar", foo: "foo" })).to.equal(
    "'foo': bar",
  );
  expect(formatStringTemplate("'#{foo}': #{bar}", { foo: "foo" })).to.equal(
    "'foo': <missing parameter>",
  );
});

it("treats empty string appropriately", () => {
  expect(formatString("'{0}'", "")).to.equal("''");
});
