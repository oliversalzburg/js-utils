/** @type {import('typedoc').TypeDocOptions} */
export default {
  basePath: "./source",
  entryPoints: ["./source/index.ts"],
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
