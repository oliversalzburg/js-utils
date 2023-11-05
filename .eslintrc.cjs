"use strict";

// @see https://en.wikipedia.org/wiki/Cyclomatic_complexity
const MAX_CYCLOMATIC_COMPLEXITY = 10;

module.exports = {
  root: true,

  env: {
    node: true,
    es2022: true,
  },

  plugins: ["@typescript-eslint", "jsdoc"],

  overrides: [
    {
      files: ["*.cjs"],
      extends: ["eslint:recommended"],
      parserOptions: {
        sourceType: "commonjs",
      },
      plugins: ["jsdoc"],
    },
    {
      files: ["*.js", "*.mjs"],
      extends: ["eslint:recommended"],
      parserOptions: {
        sourceType: "module",
      },
      plugins: ["jsdoc"],
    },
    {
      files: ["*.cts", "*.mts", "*.ts"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:jsdoc/recommended-typescript",
      ],
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
      plugins: ["@typescript-eslint", "jsdoc"],
      rules: {
        "@typescript-eslint/array-type": ["error", { default: "generic" }],
        "@typescript-eslint/no-explicit-any": [
          "error",
          {
            ignoreRestArgs: true,
          },
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
        "@typescript-eslint/no-var-requires": "off",
        "jsdoc/require-description": "warn",
        "jsdoc/require-jsdoc": [
          "error",
          {
            contexts: [
              "TSInterfaceDeclaration",
              "TSMethodSignature",
              "TSPropertySignature",
              "TSTypeAliasDeclaration",
            ],
            require: {
              ArrowFunctionExpression: true,
              ClassDeclaration: true,
              MethodDefinition: true,
            },
            publicOnly: true,
          },
        ],
      },
    },
  ],
  rules: {
    complexity: ["warn", MAX_CYCLOMATIC_COMPLEXITY],
    "consistent-return": "error",
    eqeqeq: "error",
    "no-console": "error",
    "no-else-return": "error",
    "no-unused-expressions": "warn",
    "no-use-before-define": "error",
    "prefer-const": "error",
    quotes: "warn",
    strict: ["error", "global"],
  },
  ignorePatterns: [".yarn/", "@types/", "**/cdk.out", "**/output", "*.d.mts", "!.*.*"],
};
