'use strict'

const fs = require('fs')
const path = require('path')

const ecmaVersion = 2021

let typescriptParserOptions = {
  ecmaVersion,
  sourceType: 'module',
}

const mergeTypeScriptParserOptions = ({ tsconfigRootDir }) => {
  let project = path.join(tsconfigRootDir, 'tsconfig.eslint.json')
  try {
    fs.accessSync(project)
  } catch {
    project = path.join(tsconfigRootDir, 'tsconfig.json')
  }

  typescriptParserOptions = {
    ...typescriptParserOptions,
    project,
    tsconfigRootDir,
  }
}

const noShadowOptions = { builtinGlobals: true, hoist: 'never' }

const nodejs = {
  reportUnusedDisableDirectives: true,
  parserOptions: {
    ecmaVersion,
    sourceType: 'script',
  },
  overrides: [
    {
      files: ['ava.config.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  plugins: ['ava', 'import', 'security', 'unicorn'],
  extends: ['standard'],
  env: {
    node: true,
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
    'ava/assertion-arguments': 'error',
    'ava/hooks-order': 'error',
    'ava/no-async-fn-without-await': 'error',
    'ava/no-ignored-test-files': 'error',
    'ava/no-import-test-files': 'error',
    'ava/no-incorrect-deep-equal': 'error',
    'ava/no-inline-assertions': 'error',
    'ava/no-nested-tests': 'error',
    'ava/no-only-test': 'error',
    'ava/no-skip-assert': 'error',
    'ava/no-statement-after-end': 'error',
    'ava/no-todo-test': 'warn',
    'ava/prefer-async-await': 'error',
    'ava/prefer-t-regex': 'error',
    'ava/test-ended': 'error',
    'ava/use-t': 'error',
    'ava/use-t-well': 'error',
    'ava/use-t-throws-async-well': 'error',
    'ava/use-true-false': 'error',
    'default-param-last': 'error',
    'grouped-accessor-pairs': 'error',
    'import/default': 'error',
    'import/extensions': ['error', { js: 'never', json: 'always' }],
    'import/imports-first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': ['error', {}],
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-unresolved': ['error', { commonjs: true }],
    'import/no-useless-path-segments': 'error',
    'import/order': ['error', {
      alphabetize: { order: 'asc' },
      groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index'],
    }],
    'max-len': ['error', {
      code: 130,
      tabWidth: 2,
      ignoreComments: true,
    }],
    'no-constructor-return': 'error',
    'no-dupe-else-if': 'error',
    'no-duplicate-imports': 'off',
    'no-import-assign': 'error',
    'no-setter-return': 'error',
    'no-shadow': ['error', { ...noShadowOptions }],
    'no-var': 'error',
    'no-void': 'off',
    'no-warning-comments': 'warn',
    'object-shorthand': 'error',
    'prefer-exponentiation-operator': 'error',
    'prefer-regex-literals': 'error',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'off',
    'promise/valid-params': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-unsafe-regex': 'error',
    'standard/array-bracket-even-spacing': 'off',
    'standard/computed-property-even-spacing': 'off',
    strict: ['error', 'global'],
    'unicorn/better-regex': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/custom-error-definition': 'error',
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/expiring-todo-comments': 'warn',
    'unicorn/explicit-length-check': 'error',
    'unicorn/import-index': 'error',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-fn-reference-in-iterator': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-hex-escape': 'error',
    'unicorn/no-object-as-default-parameter': 'error',
    'unicorn/no-useless-undefined': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-set-has': 'error',
    'unicorn/prefer-starts-ends-with': 'error',
    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-trim-start-end': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/throw-new-error': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
}

const typescript = {
  overrides: [
    {
      files: ['*.ts', '*.d.ts'],
      parser: '@typescript-eslint/parser',
      get parserOptions () {
        return typescriptParserOptions
      },
      plugins: ['@typescript-eslint'],
      rules: {
        camelcase: 'off',
        'comma-spacing': 'off',
        'default-param-last': 'off',
        'func-call-spacing': 'off',
        indent: 'off',
        'no-dupe-class-members': 'off',
        'no-shadow': ['error', { ...noShadowOptions, allow: ['URL', 'URLSearchParams'] }],
        'no-throw-literal': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        strict: 'off',
        'space-before-function-paren': 'off',
        'unicorn/no-for-loop': 'off',
        'unicorn/prefer-includes': 'off',
        'unicorn/prefer-starts-ends-with': 'off',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],
        '@typescript-eslint/consistent-type-assertions': ['error', {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow-as-parameter',
        }],
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/func-call-spacing': 'error',
        '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: 'none',
          },
          overrides: {
            typeLiteral: {
              multiline: {
                delimiter: 'comma',
                requireLast: true,
              },
              singleline: {
                delimiter: 'comma',
                requireLast: false,
              },
            },
          },
        }],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/naming-convention': 'error',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': ['error', { allowDefinitionFiles: true }],
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: true }],
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unused-vars-experimental': ['error', { ignoreArgsIfArgsAfterAreUsed: true }],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-use-before-define': ['error', {
          functions: false,
          classes: false,
          variables: false,
          typedefs: false,
        }],
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true, allowBoolean: true }],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/space-before-function-paren': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'error',
        '@typescript-eslint/triple-slash-reference': ['error', { path: 'never', types: 'never', lib: 'never' }],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',
      },
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.js', '.ts', '.d.ts'],
          },
        },
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        strict: 'off',
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['src/**/test/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
      },
    },
  ],
}

module.exports = {
  mergeTypeScriptParserOptions,
  configs: {
    nodejs,
    typescript,
  },
}
