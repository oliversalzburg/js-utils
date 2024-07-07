/** @type {import('typedoc').TypeDocOptions} */
export default {
  entryPoints: ["./source/**/*.ts"],
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
    notExported: true,
    invalidLink: true,
    notDocumented: true,
  },
};
