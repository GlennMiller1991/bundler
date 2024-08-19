/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  verbose: true,
  rootDir: "__tests__",
	testEnvironment: "node",
	transform: {
		"^.+.tsx?$": ["ts-jest", {}],
	},
}
