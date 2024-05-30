"use strict";

module.exports = {
  package: "./package.json",
  parallel: !process.env.CI,
  recursive: true,
  spec: ["lib/**/*.test.js"],
};
