module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['react', '@typescript-eslint'],
  ignorePatterns: ['reportWebVitals.ts', 'babel.config.js', '.eslintrc.js'],
  rules: {
    'space-before-function-paren': ['warn', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    '@typescript-eslint/space-before-function-paren': [
      'warn',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' }
    ],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],
    '@typescript-eslint/no-confusing-void-expression': ['warn', { ignoreArrowShorthand: true }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-floating-promises': ['warn', { ignoreVoid: true, ignoreIIFE: false }],
    // 'no-floating-promises': ['warn', { ignoreVoid: true, ignoreIIFE: false }],
    '@typescript-eslint/strict-boolean-expressions': ['warn', { allowNullableBoolean: true }],
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'multiline-ternary': ['warn', 'always-multiline']
  }
}
