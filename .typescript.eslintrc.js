module.exports = {
  plugins: ['typescript'],
  rules: {
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'import/imports-first': 'off',
    'import/first': 'off',
    'typescript/adjacent-overload-signatures': 'error',
    'typescript/class-name-casing': 'error',
    'typescript/explicit-member-accessibility': 'error',
    'typescript/interface-name-prefix': 'error',
    'typescript/member-delimiter-style': ['error', {delimiter: 'none', requireLast: true, ignoreSingleLine: true}],
    'typescript/member-ordering': 'error',
    'typescript/no-angle-bracket-type-assertion': 'error',
    'typescript/no-empty-interface': 'error',
    'typescript/no-namespace': ['error', {allowDefinitionFiles: true}],
    'typescript/no-parameter-properties': 'error',
    'typescript/no-triple-slash-reference': 'error',
    'typescript/no-unused-vars': 'error',
    'typescript/no-use-before-define': ['error', {functions: false, classes: false, variables: false, typedefs: false}],
    'typescript/prefer-namespace-keyword': 'error',
    'typescript/type-annotation-spacing': 'error'
  }
}
