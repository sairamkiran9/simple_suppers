import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js'],
    ignores: ['node_modules'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // or 'commonjs' if you're using require
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
