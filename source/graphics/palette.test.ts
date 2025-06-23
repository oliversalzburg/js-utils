import { expect } from "chai";
import { it } from "mocha";
import { hslPalette, hsvPalette } from "./palette.js";

it("renders the correct HSL palette - 1", () => {
  expect(hslPalette(1).map(_ => _.map(x => x.toString(16).padStart(2, "0")).join(""))).to.eql([
    "ff0000",
  ]);
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
