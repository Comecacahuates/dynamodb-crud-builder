const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const eslintConfigPrettier = require('eslint-config-prettier');

const config = [
  eslintConfigPrettier,
  {
    files: ['./src/**/*.ts', './test/**/*.ts'],
    ignores: ['**/*.d.*', '**/*.map.*', '**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2015,
        ecmaFeatures: {
          modules: true,
        },
        project: './tsconfig.json',
      },
      env: {
        es6: true,
        node: true,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      ts,
    },
    rules: {
      ...ts.configs['eslint-recommended'].rules,
      ...ts.configs['recommended'].rules,
    },
  },
];

module.exports = config;
