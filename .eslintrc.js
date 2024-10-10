module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "unused-imports"],
	extends: [
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended",
		"prettier"
	],
	rules: {
		"no-console": ["warn", { allow: ["warn", "error"] }],
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				vars: "all",
				varsIgnorePattern: "^_",
				args: "after-used",
				argsIgnorePattern: "^_"
			}
		],
		"@typescript-eslint/no-explicit-any": "error",
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{
				vars: "all",
				varsIgnorePattern: "^_",
				args: "after-used",
				argsIgnorePattern: "^_"
			}
		],
		"import/no-unused-modules": "error"
	},
	overrides: [
		{
			files: [
				"app/**/*.ts",
				"app/**/*.tsx",
				"components/**/*.ts",
				"components/**/*.tsx"
			],
			rules: {
				"@typescript-eslint/explicit-module-boundary-types": "warn"
			}
		}
	]
}
