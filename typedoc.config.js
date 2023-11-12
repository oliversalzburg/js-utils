/** @type {import('typedoc').TypeDocOptions} */
export default {
  entryPoints: ["./source"],
  favicon: "./docs/assets/favicon.ico",
  footerLastModified: true,
  footerTypedocVersion: true,
  githubPages: true,
  includeVersion: true,
  navigationLinks: {
    GitHub: "https://github.com/oliversalzburg/js-utils",
  },
  out: "./_site",
  plugin: ["typedoc-plugin-extras", "typedoc-plugin-mdn-links"],
  readme: "./README.md",
  tsconfig: "./tsconfig.json",
  validation: {
    notExported: true,
    invalidLink: true,
    notDocumented: true,
  },
};
