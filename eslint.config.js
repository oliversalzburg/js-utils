import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";
import tsdoc from "eslint-plugin-tsdoc";
import globals from "globals";
import tseslint from "typescript-eslint";

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

export default tseslint.config(
  eslint.configs.recommended,
  jsdoc.configs["flat/recommended"],
  prettierConfig,
  {
    ignores: [
      "_site/",
      ".yarn/",
      ".git/",
      "coverage/",
      "dist-area/",
      "lib/",
      "node_modules/",
      "*.config.*",
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.web,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      parserOptions: {
        sourceType: "commonjs",
      },
    },
    plugins: { jsdoc },
    rules: rulesJsDoc,
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: { jsdoc },
    rules: rulesJsDoc,
  },
  {
    files: ["**/*.cts", "**/*.mts", "**/*.ts"],
    extends: tseslint.configs.strictTypeChecked,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { jsdoc, tsdoc },
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
  {
    rules: {
      "consistent-return": "error",
      eqeqeq: "error",
      "no-console": "error",
      "no-else-return": "error",
      "no-unused-expressions": "warn",
      "no-use-before-define": "error",
      "prefer-const": "error",
      strict: ["error", "global"],
    },
    settings: {
      jsdoc: {
        tagNamePreference: {
          group: "group",
        },
      },
    },
  },
);
