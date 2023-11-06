"use strict";

module.exports = {
  package: "./package.json",
  parallel: true,
  recursive: true,
  spec: ["lib/**/*.test.js"],
  timeout: "2000",
};
