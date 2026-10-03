import assert from "node:assert";
import { it } from "node:test";
import { range } from "./array.js";

it("generates the expected range - zero to positive", () => {
	assert.deepStrictEqual(range(0, 9), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

it("generates the expected range - negative to zero", () => {
	assert.deepStrictEqual(range(-9, 0), [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0]);
});

it("generates the expected range - negative to positive", () => {
	assert.deepStrictEqual(range(-5, 5), [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
});

it("generates the expected range - positive to negative", () => {
	assert.deepStrictEqual(range(5, -5), [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5]);
});
