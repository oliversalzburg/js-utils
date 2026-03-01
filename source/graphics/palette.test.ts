import assert from "node:assert";
import { it } from "node:test";
import { hslPalette, hsvPalette } from "./palette.js";

const render = (_: [number, number, number]) =>
  _.map(x => x.toString(16).padStart(2, "0")).join("");

it("renders the correct HSL palettes - Size 1", () => {
  assert.deepStrictEqual(hslPalette(1).map(render), ["ff0000"], "Default case");
  // Under-saturated
  assert.deepStrictEqual(
    hslPalette(1, 0, 0.25, 0.5).map(render),
    ["9f5f5f"],
    "Under-saturated 0.25",
  );
  assert.deepStrictEqual(hslPalette(1, 0, 0.5, 0.5).map(render), ["bf3f3f"], "Under-saturated 0.5");
  assert.deepStrictEqual(
    hslPalette(1, 0, 0.75, 0.5).map(render),
    ["df1f1f"],
    "Under-saturated 0.75",
  );
  // Darker
  assert.deepStrictEqual(hslPalette(1, 0, 0.25, 0.25).map(render), ["4f2f2f"], "Darker 0.25 0.25");
  assert.deepStrictEqual(hslPalette(1, 0, 0.5, 0.25).map(render), ["5f1f1f"], "Darker 0.5 0.25");
  assert.deepStrictEqual(hslPalette(1, 0, 0.75, 0.25).map(render), ["6f0f0f"], "Darker 0.75 0.25");
  assert.deepStrictEqual(hslPalette(1, 0, 1, 0.25).map(render), ["7f0000"], "Darker 1 0.25");
  // Lighter
  assert.deepStrictEqual(hslPalette(1, 0, 0.25, 0.75).map(render), ["cfafaf"], "Lighter 0.25 0.75");
  assert.deepStrictEqual(hslPalette(1, 0, 0.5, 0.75).map(render), ["df9f9f"], "Lighter 0.5 0.75");
  assert.deepStrictEqual(hslPalette(1, 0, 0.75, 0.75).map(render), ["ef8f8f"], "Lighter 0.75 0.75");
  assert.deepStrictEqual(hslPalette(1, 0, 1, 0.75).map(render), ["ff7f7f"], "Lighter 1 0.75");
});

it("renders the correct HSL palette - 2", () => {
  assert.deepStrictEqual(
    hslPalette(2).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join("")),
    ["ff0000", "00ffff"],
  );
});

it("renders the correct HSL palette - 3", () => {
  assert.deepStrictEqual(
    hslPalette(3).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join("")),
    ["ff0000", "00ff00", "0000ff"],
  );
});

it("renders the correct HSL palette - 4", () => {
  assert.deepStrictEqual(
    hslPalette(4).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join("")),
    ["ff0000", "7fff00", "00ffff", "7f00ff"],
  );
});

it("renders the correct HSL palette - 5", () => {
  assert.deepStrictEqual(
    hslPalette(5).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join("")),
    ["ff0000", "ccff00", "00ff66", "0066ff", "cb00ff"],
  );
});

it("renders the correct HSL palette - 6", () => {
  assert.deepStrictEqual(
    hslPalette(6).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join("")),
    ["ff0000", "ffff00", "00ff00", "00ffff", "0000ff", "ff00ff"],
  );
});

it("renders the correct HSL palette - 7", () => {
  assert.deepStrictEqual(
    hslPalette(7).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join("")),
    ["ff0000", "ffda00", "48ff00", "00ff91", "0091ff", "4800ff", "ff00da"],
  );
});

it("renders the correct HSV palette - 1", () => {
  assert.deepStrictEqual(
    hsvPalette(1).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join("")),
    ["ff0000"],
  );
});
