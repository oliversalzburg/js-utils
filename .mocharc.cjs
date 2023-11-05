"use strict";

module.exports = {
  package: "./package.json",
  parallel: true,
  recursive: true,
  spec: ["output/**/*.test.js"],
  timeout: "2000",
};
