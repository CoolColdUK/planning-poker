/**
 * Config for react
 */
module.exports = {
  env: {
    browser: true,
    jest: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-await-in-loop': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true},
    ],
    '@typescript-eslint/dot-notation': ['warn', {allowIndexSignaturePropertyAccess: true}],
    // 'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    // 'import/no-unresolved': 'off', //disabled as airbnb has no absolute import which takes more effort to disable
    // 'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // 'import/extensions': 'off',
    // 'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    // 'no-shadow': 'off',
    // '@typescript-eslint/no-shadow': ['error'],
    // 'spaced-comment': 'off',
    // 'no-console': 'off',
    // 'no-nested-ternary': 'off',
    // 'import/no-cycle': 'warn',
    // 'no-unused-vars': 'off',
    'react/require-default-props': 'off',
    // 'import/prefer-default-export': 'off',
    // 'prettier/prettier': 'warn',
    'react/jsx-no-duplicate-props': ['warn', {ignoreCase: false}],
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
