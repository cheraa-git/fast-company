module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react'],
  ignorePatterns: ['reportWebVitals.ts', 'babel.config.js', '.eslintrc.js'],
  rules: {
    'space-before-function-paren': ['warn', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    'react/react-in-jsx-scope': 'off',
    'no-multiple-empty-lines': ['warn', { max: 2 }],
    'multiline-ternary': ['warn', 'always-multiline'],
    'react/jsx-key': 'warn',
    'no-trailing-spaces': 'off',
    'no-unused-vars': 'warn',
    'no-empty': 'warn'
  }
}
