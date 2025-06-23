import { expect } from "chai";
import { it } from "mocha";
import { hslPalette, hsvPalette } from "./palette.js";

const render = (_: [number, number, number]) =>
  _.map(x => x.toString(16).padStart(2, "0")).join("");

it("renders the correct HSL palettes - Size 1", () => {
  expect(hslPalette(1).map(render)).to.eql(["ff0000"], "Default case");
  // Under-saturated
  expect(hslPalette(1, 0, 0.25, 0.5).map(render)).to.eql(["9f5f5f"], "Under-saturated 0.25");
  expect(hslPalette(1, 0, 0.5, 0.5).map(render)).to.eql(["bf3f3f"], "Under-saturated 0.5");
  expect(hslPalette(1, 0, 0.75, 0.5).map(render)).to.eql(["df1f1f"], "Under-saturated 0.75");
  // Darker
  expect(hslPalette(1, 0, 0.25, 0.25).map(render)).to.eql(["4f2f2f"], "Darker 0.25 0.25");
  expect(hslPalette(1, 0, 0.5, 0.25).map(render)).to.eql(["5f1f1f"], "Darker 0.5 0.25");
  expect(hslPalette(1, 0, 0.75, 0.25).map(render)).to.eql(["6f0f0f"], "Darker 0.75 0.25");
  expect(hslPalette(1, 0, 1, 0.25).map(render)).to.eql(["7f0000"], "Darker 1 0.25");
  // Lighter
  expect(hslPalette(1, 0, 0.25, 0.75).map(render)).to.eql(["cfafaf"], "Lighter 0.25 0.75");
  expect(hslPalette(1, 0, 0.5, 0.75).map(render)).to.eql(["df9f9f"], "Lighter 0.5 0.75");
  expect(hslPalette(1, 0, 0.75, 0.75).map(render)).to.eql(["ef8f8f"], "Lighter 0.75 0.75");
  expect(hslPalette(1, 0, 1, 0.75).map(render)).to.eql(["ff7f7f"], "Lighter 1 0.75");
});

it("renders the correct HSL palette - 2", () => {
  expect(hslPalette(2).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join(""))).to.eql([
    "ff0000",
    "00ffff",
  ]);
});

it("renders the correct HSL palette - 3", () => {
  expect(hslPalette(3).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join(""))).to.eql([
    "ff0000",
    "00ff00",
    "0000ff",
  ]);
});

it("renders the correct HSL palette - 4", () => {
  expect(hslPalette(4).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join(""))).to.eql([
    "ff0000",
    "7fff00",
    "00ffff",
    "7f00ff",
  ]);
});

it("renders the correct HSL palette - 5", () => {
  expect(hslPalette(5).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join(""))).to.eql([
    "ff0000",
    "ccff00",
    "00ff66",
    "0066ff",
    "cb00ff",
  ]);
});

it("renders the correct HSL palette - 6", () => {
  expect(hslPalette(6).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join(""))).to.eql([
    "ff0000",
    "ffff00",
    "00ff00",
    "00ffff",
    "0000ff",
    "ff00ff",
  ]);
});

it("renders the correct HSL palette - 7", () => {
  expect(hslPalette(7).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join(""))).to.eql([
    "ff0000",
    "ffda00",
    "48ff00",
    "00ff91",
    "0091ff",
    "4800ff",
    "ff00da",
  ]);
});

it("renders the correct HSV palette - 1", () => {
  expect(hsvPalette(1).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join(""))).to.eql([
    "ff0000",
  ]);
});
