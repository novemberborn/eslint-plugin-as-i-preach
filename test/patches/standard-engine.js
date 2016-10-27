import { join } from 'path'
import test from 'ava'
import engine from '../../lib/patched-standard-engine'
import options from '../../options'

test('lintText() takes a fourth filename argument', async t => {
  const linter = engine.linter(Object.assign({}, options))
  linter.parseOpts = opts => {
    linter.eslint = {
      CLIEngine (config) {
        return {
          executeOnText (text, filename) {
            return { opts, config, text, filename }
          }
        }
      }
    }
    return opts
  }

  const expectedText = 'some text'
  const expectedConfig = {}
  const expectedOpts = { eslintConfig: expectedConfig }
  const expectedFilename = 'file.js'

  const actual = await new Promise(resolve => {
    linter.lintText(expectedText, expectedOpts, (_, result) => resolve(result), expectedFilename)
  })

  t.true(actual.opts === expectedOpts)
  t.true(actual.config === expectedConfig)
  t.true(actual.text === expectedText)
  t.true(actual.filename === expectedFilename)
})

test('lintText() takes a third filename argument if there are no options', async t => {
  const expectedConfig = {}

  const linter = engine.linter(Object.assign({}, options))
  linter.parseOpts = opts => {
    linter.eslint = {
      CLIEngine (config) {
        return {
          executeOnText (text, filename) {
            return { opts, config, text, filename }
          }
        }
      }
    }
    return { eslintConfig: expectedConfig }
  }

  const expectedText = 'some text'
  const expectedFilename = 'file.js'

  const actual = await new Promise(resolve => {
    linter.lintText(expectedText, (_, result) => resolve(result), expectedFilename)
  })

  t.true(actual.opts === null)
  t.true(actual.config === expectedConfig)
  t.true(actual.text === expectedText)
  t.true(actual.filename === expectedFilename)
})

test('lintText() propagates linting exceptions', async t => {
  const linter = engine.linter(Object.assign({}, options))
  const expected = new Error()
  linter.eslint = {
    CLIEngine () { throw expected }
  }

  const result = new Promise((resolve, reject) => {
    linter.lintText('some text', reject)
  })
  const err = await t.throws(result)
  t.true(err === expected)
})

test('parseOpts() applies settings', t => {
  const cwd = join(__dirname, '..', 'fixtures', 'settings')
  const linter = engine.linter(Object.assign({}, options, { cwd }))
  const { eslintConfig } = linter.parseOpts()

  t.deepEqual(eslintConfig.rules['import/no-extraneous-dependencies'][1], {
    devDependencies: [join(cwd, 'foo.js')]
  })
  t.deepEqual(eslintConfig.rules['import/no-unresolved'][1], {
    commonjs: true,
    ignore: ['fake']
  })
})
