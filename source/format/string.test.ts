import assert from "node:assert";
import { it } from "node:test";
import { formatString, formatStringTemplate } from "./string.js";

it("formats index-based template strings", () => {
  assert.strictEqual(formatString("'{0}'", "foo"), "'foo'");
  assert.strictEqual(formatString("'{0}': {1}", "foo", "bar"), "'foo': bar");
  assert.strictEqual(formatString("'{0}': {1}", "foo"), "'foo': {1}");
});

it("formats literal-based template strings", () => {
  assert.strictEqual(formatStringTemplate("'#{foo}'", { foo: "foo" }), "'foo'");
  assert.strictEqual(
    formatStringTemplate("'#{foo}': #{bar}", { bar: "bar", foo: "foo" }),
    "'foo': bar",
  );
  assert.strictEqual(
    formatStringTemplate("'#{foo}': #{bar}", { foo: "foo" }),
    "'foo': <missing parameter>",
  );
});

it("treats empty string appropriately", () => {
  assert.strictEqual(formatString("'{0}'", ""), "''");
});
