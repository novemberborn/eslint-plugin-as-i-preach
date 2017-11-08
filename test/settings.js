import {join} from 'path'

import test from 'ava'

import applySettings from '../lib/settings'

test('uses existing rules object', t => {
  const rules = {}
  const eslintConfig = {rules}

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
      '/root/scripts/**/{*.js,*.ts}',
      '/root/test.js',
      '/root/test.ts',
      '/root/test/**/{*.js,*.ts}',
      '/root/typings/**/*.d.ts'
    ]
  }])
})

test('supports allowDevDependencies with string value', t => {
  const eslintConfig = {}
  applySettings(eslintConfig, {allowDevDependencies: 'foo.js'}, '/root')

  t.deepEqual(eslintConfig.rules['import/no-extraneous-dependencies'], ['error', {
    devDependencies: ['/root/foo.js']
  }])
})

test('supports allowDevDependencies with array value', t => {
  const eslintConfig = {}
  applySettings(eslintConfig, {allowDevDependencies: ['foo.js', 'bar.js']}, '/root')

  t.deepEqual(eslintConfig.rules['import/no-extraneous-dependencies'], ['error', {
    devDependencies: ['/root/foo.js', '/root/bar.js']
  }])
})

test('supports fakeDependencies with string value', t => {
  const eslintConfig = {}
  applySettings(eslintConfig, {fakeDependencies: 'foo.js'}, '/root')

  t.deepEqual(eslintConfig.rules['import/no-unresolved'], ['error', {
    commonjs: true,
    ignore: ['foo.js']
  }])
})

test('supports fakeDependencies with array value', t => {
  const eslintConfig = {}
  applySettings(eslintConfig, {fakeDependencies: ['foo.js', 'bar.js']}, '/root')

  t.deepEqual(eslintConfig.rules['import/no-unresolved'], ['error', {
    commonjs: true,
    ignore: ['foo.js', 'bar.js']
  }])
})

const RESOLVERS_DIR = join(__dirname, 'fixtures', 'resolvers')

test('supports resolvers — resolves string values from the rootDir', t => {
  const eslintConfig = {}
  const settings = {resolvers: 'foo'}
  applySettings(eslintConfig, settings, RESOLVERS_DIR)

  t.deepEqual(eslintConfig.baseConfig, {
    settings: {
      'import/resolver': join(RESOLVERS_DIR, 'node_modules', 'foo', 'index.js')
    }
  })
})

test('supports resolvers — resolves object keys from the rootDir', t => {
  const eslintConfig = {}
  const settings = {
    resolvers: {
      foo: Symbol(''),
      bar: Symbol('')
    }
  }
  applySettings(eslintConfig, settings, RESOLVERS_DIR)

  t.deepEqual(eslintConfig.baseConfig, {
    settings: {
      'import/resolver': {
        [join(RESOLVERS_DIR, 'node_modules', 'foo', 'index.js')]: settings.resolvers.foo,
        [join(RESOLVERS_DIR, 'node_modules', 'bar', 'index.js')]: settings.resolvers.bar
      }
    }
  })
})

test('supports resolvers — throws if values cannot be resolved', t => {
  const eslintConfig = {}
  const settings = {resolvers: 'foo'}

  const err = t.throws(() => applySettings(eslintConfig, settings, '/root'))
  t.true(err.message === 'Could not resolve \'foo\' import resolver')
})
