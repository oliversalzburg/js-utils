module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  sourceType: "module",
  extends: ["eslint:recommended"],
  plugins: ["@typescript-eslint", "jsdoc"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:jsdoc/recommended-typescript",
      ],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-explicit-any": [
          "error",
          {
            ignoreRestArgs: true,
          },
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
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
            require: { ArrowFunctionExpression: true, ClassDeclaration: true },
            publicOnly: true,
          },
        ],
      },
    },
  ],
  rules: {
    "no-unused-expressions": "warn",
    quotes: "warn",
  },
  ignorePatterns: ["output/*"],
};
