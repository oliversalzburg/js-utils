import esbuild from "esbuild";

esbuild
  .build({
    bundle: true,
    entryPoints: ["./source/main.ts"],
    format: "esm",
    outfile: "./output/main.js",
    platform: "node",
    target: "node18",
  })
  .catch(console.error);
