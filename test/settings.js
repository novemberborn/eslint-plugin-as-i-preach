import test from 'ava'

import applySettings from '../lib/settings'

test('uses existing rules object', t => {
  const rules = {}
  const eslintConfig = { rules }

  applySettings(eslintConfig, {}, '/')
  t.true(eslintConfig.rules === rules)
})

test('creates rules object if necessary', t => {
  const eslintConfig = {}

  applySettings(eslintConfig, {}, '/')
  t.truthy(eslintConfig.rules)
})

test('overrides import/no-extraneous-dependencies with default devDependencies', t => {
  const eslintConfig = {}
  applySettings(eslintConfig, {}, '/root')

  t.deepEqual(eslintConfig.rules['import/no-extraneous-dependencies'], ['error', {
    devDependencies: [
      '/root/scripts/**/*.js',
      '/root/test.js',
      '/root/test/**/*.js'
    ]
  }])
})

test('supports allowDevDependencies with string value', t => {
  const eslintConfig = {}
  applySettings(eslintConfig, { allowDevDependencies: 'foo.js' }, '/root')

  t.deepEqual(eslintConfig.rules['import/no-extraneous-dependencies'], ['error', {
    devDependencies: ['/root/foo.js']
  }])
})

test('supports allowDevDependencies with array value', t => {
  const eslintConfig = {}
  applySettings(eslintConfig, { allowDevDependencies: ['foo.js', 'bar.js'] }, '/root')

  t.deepEqual(eslintConfig.rules['import/no-extraneous-dependencies'], ['error', {
    devDependencies: ['/root/foo.js', '/root/bar.js']
  }])
})

test('supports fakeDependencies with string value', t => {
  const eslintConfig = {}
  applySettings(eslintConfig, { fakeDependencies: 'foo.js' }, '/root')

  t.deepEqual(eslintConfig.rules['import/no-unresolved'], ['error', {
    commonjs: true,
    ignore: ['foo.js']
  }])
})

test('supports fakeDependencies with array value', t => {
  const eslintConfig = {}
  applySettings(eslintConfig, { fakeDependencies: ['foo.js', 'bar.js'] }, '/root')

  t.deepEqual(eslintConfig.rules['import/no-unresolved'], ['error', {
    commonjs: true,
    ignore: ['foo.js', 'bar.js']
  }])
})
