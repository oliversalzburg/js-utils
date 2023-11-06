/* eslint-disable no-console */
import esbuild from "esbuild";

esbuild
  .build({
    bundle: true,
    entryPoints: ["./source/main.ts"],
    format: "esm",
    outfile: "./lib/main.js",
    platform: "node",
    target: "node18",
  })
  .catch(console.error);
