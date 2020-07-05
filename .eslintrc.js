module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'import/no-unresolved': 'off',
  },
};
