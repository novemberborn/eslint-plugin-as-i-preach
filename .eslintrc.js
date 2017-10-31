module.exports = {
  extends: ['standard', 'plugin:ava/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true
    }
  },
  env: {
    node: false,
    'node-globals/env': true
  },
  plugins: ['ava', 'import', 'node-globals', 'react', 'unicorn'],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'computed-property-spacing': ['error', 'never'],
    'import/default': 'error',
    'import/extensions': ['error', {
      js: 'never',
      json: 'always'
    }],
    'import/imports-first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': ['error', {}],
    'import/no-mutable-exports': 'error',
    'import/no-named-default': 'error',
    'import/no-unresolved': ['error', {
      commonjs: true
    }],
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
    }],
    'max-len': ['error', {
      code: 130,
      tabWidth: 2,
      ignoreComments: true
    }],
    'no-case-declarations': 'error',
    'no-duplicate-imports': 'off',
    'no-shadow': ['error', {
      builtinGlobals: true,
      hoist: 'never'
    }],
    'no-var': 'error',
    'no-warning-comments': 'warn',
    'object-curly-spacing': ['error', 'never'],
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-string-refs': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': ['error', {ignore: ['for']}],
    'react/no-will-update-set-state': 'error',
    'react/require-render-return': 'error',
    'react/void-dom-elements-no-children': 'error',
    'standard/array-bracket-even-spacing': 'off',
    'standard/computed-property-even-spacing': 'off',
    'standard/object-curly-even-spacing': 'off',
    'unicorn/catch-error-name': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-process-exit': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/prefer-starts-ends-with': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/throw-new-error': 'error'
  }
}
