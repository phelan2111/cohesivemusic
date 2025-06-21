module.exports = {
	root: true,
	env: { browser: true, es2021: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:@typescript-eslint/recommended',
		'eslint-config-prettier',
	],
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			alias: {
				map: [
					['@', './src/'],
					['routes', './src/routes/'],
					['services', './src/services/'],
					['assets', './src/assets/'],
					['hook', './src/hook/'],
					['context', './src/context/'],
					['styles', './src/styles/'],
					['utils', './src/util/'],
					['pages', './src/pages/'],
					['ui', './src/ui/'],
				],
			},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', '@typescript-eslint'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'import/no-unresolved': 'off',
		'jsx-a11y/no-autofocus': [
			2,
			{
				ignoreNonDOM: true,
			},
		],
		'react-hooks/exhaustive-deps': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
	},
};
