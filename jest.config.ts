import path from 'path';

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  verbose: true,
  rootDir: path.resolve(process.env.INIT_CWD, '__tests__'),
	testEnvironment: "node",
	transform: {
		"^.+.tsx?$": ["ts-jest", {}],
	},
}
