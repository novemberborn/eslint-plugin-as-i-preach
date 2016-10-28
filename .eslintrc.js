module.exports = {
  'extends': ['standard', 'plugin:ava/recommended'],
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module',
    'ecmaFeatures': {
      'impliedStrict': true
    }
  },
  'env': {
    'node': false,
    'node-globals/env': true
  },
  'plugins': ['ava', 'babel', 'import', 'node-globals', 'unicorn'],
  'rules': {
    'arrow-parens': ['error', 'as-needed'],
    'ava/no-async-fn-without-await': 'error',
    'ava/no-duplicate-modifiers': 'error',
    'babel/generator-star-spacing': ['error', {'before': true, 'after': true}],
    'babel/no-await-in-loop': 'error',
    'generator-star-spacing': 'off',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': ['error', {'js': 'never', 'json': 'always'}],
    'import/first': 'error',
    'import/imports-first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': ['error', {}],
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': ['error', {'commonjs': true}],
    'import/order': ['error', {'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']}],
    'no-duplicate-imports': 'off',
    'no-shadow': ['error', {'builtinGlobals': true, 'hoist': 'never'}],
    'no-use-before-define': ['error', 'nofunc'],
    'no-var': 'error',
    'no-warning-comments': 'warn',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'promise/always-return': 'error',
    'promise/catch-or-return': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-process-exit': 'error',
    'unicorn/throw-new-error': 'error'
  }
}
