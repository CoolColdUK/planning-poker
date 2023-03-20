/**
 * Config for packages
 * - based on airbnb typescript
 * - use with prettier
 * @see https://stackoverflow.com/q/61963749/7058536
 */
module.exports = {
  //required!; use the previously installed parser; it allows ESLint to understand
  //TypeScript syntax; it converts TypeScript into an ESTree-compatible form so it
  //can be used in ESLint
  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    jest: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb-typescript/base', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    // tsconfigRootDir: __dirname,
    project: '**/tsconfig.json', //required for "type-aware linting"
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-await-in-loop': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    '@typescript-eslint/dot-notation': ['warn', {allowIndexSignaturePropertyAccess: true}],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  ignorePatterns: ['.eslintrc.js', 'dist', '/*.*'],
};
