module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'standard',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    _logger: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: { ecmaVersion: 11 },
  plugins: ['eslint-plugin-prefer-arrow'],
  rules: {
    semi: [2, 'always'],
    'no-warning-comments': [0, { terms: ['todo', 'fixme', 'xxx', 'debug'], location: 'start' }],
    'prefer-arrow/prefer-arrow-functions': [2, { singleReturnOnly: true, disallowPrototype: true }],
    'object-curly-newline': ['error', { multiline: true }],
    'arrow-parens': [2, 'as-needed'],
    'arrow-body-style': [2, 'as-needed'],
    'operator-linebreak': [2, 'after']
  }
};
