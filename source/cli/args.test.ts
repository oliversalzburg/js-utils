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
