/** @type {import('eslint').Linter.Config} */

module.exports = {
  extends: ['@rocketseat/eslint-config/next'],
  plugins: ['simple-import-sort', '@tanstack/query/recommended'],
  rules: { 'simple-import-sort/imports': 'error' },
}
