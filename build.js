/* eslint-disable no-console */
import esbuild from "esbuild";

esbuild
  .build({
    bundle: true,
    entryPoints: ["./source/index.ts"],
    format: "esm",
    outfile: "./lib/index.js",
    platform: "neutral",
    target: "esnext",
  })
  .catch(console.error);
