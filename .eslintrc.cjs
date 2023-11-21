"use strict";

// @see https://en.wikipedia.org/wiki/Cyclomatic_complexity
const MAX_CYCLOMATIC_COMPLEXITY = 10;

const rulesJsDoc = {
  "jsdoc/require-description": "warn",
  "jsdoc/require-jsdoc": [
    "error",
    {
      contexts: [
        "PropertyDefinition",
        "TSInterfaceDeclaration",
        "TSMethodSignature",
        "TSPropertySignature",
        "TSTypeAliasDeclaration",
      ],
      require: {
        ArrowFunctionExpression: true,
        ClassDeclaration: true,
        ClassExpression: true,
        FunctionDeclaration: true,
        FunctionExpression: true,
        MethodDefinition: true,
      },
      publicOnly: true,
    },
  ],
};

module.exports = {
  root: true,

  env: {
    node: true,
    es2022: true,
  },

  ignorePatterns: [".yarn/", "@types/", "lib", "!.*.*"],
  overrides: [
    {
      files: ["*.cjs"],
      extends: ["eslint:recommended", "plugin:jsdoc/recommended"],
      parserOptions: {
        sourceType: "commonjs",
      },
      plugins: ["jsdoc"],
      rules: rulesJsDoc,
    },
    {
      files: ["*.js", "*.mjs"],
      extends: ["eslint:recommended", "plugin:jsdoc/recommended"],
      parserOptions: {
        sourceType: "module",
      },
      plugins: ["jsdoc"],
      rules: rulesJsDoc,
    },
    {
      files: ["*.cts", "*.mts", "*.ts"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:jsdoc/recommended",
      ],
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
      plugins: ["@typescript-eslint", "eslint-plugin-tsdoc", "jsdoc"],
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
        "tsdoc/syntax": "error",
        ...rulesJsDoc,
        "jsdoc/check-tag-names": "off",
        "jsdoc/no-undefined-types": "off",
        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns-type": "off",
        "jsdoc/valid-types": "off",
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
  settings: {
    jsdoc: {
      tagNamePreference: {
        group: "group",
      },
    },
  },
};
