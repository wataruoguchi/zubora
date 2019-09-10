module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: ['eslint:recommended'],
  settings: {},
  env: {
    node: true,
    es6: true,
    jest: true
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  rules: {
    semi: [2, 'always']
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended']
    }
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  }
}
