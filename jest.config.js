const path = require("path")

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.export = {
	verbose: true,
	rootDir: path.resolve(process.env.INIT_CWD || process.cwd(), "__tests__"),
	testEnvironment: "node",
	transform: {
		"^.+.tsx?$": ["ts-jest", {}],
	},
}
