/** @type {import('typedoc').TypeDocOptions} */
export default {
  basePath: ".",
  entryPoints: ["./source"],
  githubPages: true,
  out: "./_site",
  plugin: ["typedoc-plugin-mdn-links"],
  tsconfig: "./tsconfig.json",
  validation: {
    notExported: true,
    invalidLink: true,
    notDocumented: true,
  },
};
