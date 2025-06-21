/** @type {import('typedoc').TypeDocOptions} */
export default {
  entryPoints: ["./source/**/*.ts"],
  exclude: ["**/*.test.ts"],
  githubPages: true,
  hostedBaseUrl: "https://oliversalzburg.github.io/js-utils/",
  includeVersion: true,
  navigationLinks: {
    GitHub: "https://github.com/oliversalzburg/js-utils/",
  },
  out: "./_site",
  plugin: ["typedoc-plugin-mdn-links", "./docs/typedoc-favicon-plugin.js"],
  readme: "./README.md",
  tsconfig: "./tsconfig.json",
  validation: {
    invalidLink: true,
    notDocumented: true,
    notExported: true,
  },
};
