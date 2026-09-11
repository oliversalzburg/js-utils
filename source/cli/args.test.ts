import assert from "node:assert";
import { it } from "node:test";
import { parseArgv } from "./args.js";

it("parses boolean parameters", () => {
	assert.deepStrictEqual(parseArgv(["node", "script.js", "--yes"]), {
		yes: true,
	});
	assert.deepStrictEqual(
		parseArgv(["node", "script.js", "--yes", "filename.ext"], true),
		{
			"": ["filename.ext"],
			yes: true,
		},
	);
});

it("parses parameters using '='", () => {
	assert.deepStrictEqual(parseArgv(["node", "script.js", "--yes=true"]), {
		yes: "true",
	});
	assert.deepStrictEqual(
		parseArgv(["node", "script.js", "--yes=true", "filename.ext"]),
		{
			"": ["filename.ext"],
			yes: "true",
		},
	);
});

it("parses parameters using ' '", () => {
	assert.deepStrictEqual(parseArgv(["node", "script.js", "--yes", "true"]), {
		yes: "true",
	});
	assert.deepStrictEqual(
		parseArgv(["node", "script.js", "--yes", "true", "filename.ext"]),
		{
			"": ["filename.ext"],
			yes: "true",
		},
	);
});

it("aggregates multiple occurrences of the same parameter", () => {
	assert.deepStrictEqual(
		parseArgv(["node", "script.js", "--lang", "de", "--lang", "en"]),
		{
			lang: ["de", "en"],
		},
	);
	assert.deepStrictEqual(
		parseArgv([
			"node",
			"script.js",
			"--lang",
			"de",
			"--lang",
			"en",
			"filename.ext",
		]),
		{
			"": ["filename.ext"],
			lang: ["de", "en"],
		},
	);
});

it("aggregates multiple unlabeled parameters", () => {
	assert.deepStrictEqual(
		parseArgv(["node", "script.js", "filename.ext", "otherfile.ext"]),
		{
			"": ["filename.ext", "otherfile.ext"],
		},
	);
});
