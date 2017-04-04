import { join } from 'path'
import test from 'ava'
import engine from 'standard-engine'
import patchFileResultOutput from '../../lib/patch-file-result-output'
import options from '../../options'

const fixture = join(__dirname, '..', 'fixtures', 'invalid.js')

test.beforeEach(t => {
  class Linter extends engine.linter {}

  t.context = {
    stdout: '',
    stderr: ''
  }

  patchFileResultOutput({ linter: Linter }, {
    error (output) {
      t.context.stderr += output
    },
    log (output) {
      t.context.stdout += output
    }
  })

  t.context.linter = new Linter(Object.assign({}, options))
})

async function checkOutput (t, out, ...args) {
  const other = out === 'stderr' ? 'stdout' : 'stderr'
  const { results } = await new Promise(resolve => {
    t.context.linter.lintFiles(...args, (_, result) => resolve(result))
  })

  t.falsy(t.context[out])
  t.falsy(t.context[other])

  results.forEach(() => {
    t.fail()
  })

  t.falsy(t.context[other])
  t.regex(t.context[out], /✖.+Strings must use singlequote/)
  t.regex(t.context[out], /✖.+Extra semicolon/)
}
checkOutput.title = (suffix, out) => `patches lintFiles() to write formatted results to ${out} when results are accessed${suffix}`

test(checkOutput, 'stdout', [fixture], null)
test(', even without options', checkOutput, 'stdout', [fixture])

test('patched lintFiles() propagates errors', async t => {
  const expected = new Error()
  class Linter extends engine.linter {
    lintFiles (files, opts, cb) {
      cb(expected)
    }
  }

  patchFileResultOutput({ linter: Linter })
  const linter = new Linter(Object.assign({}, options))
  const err = await t.throws(new Promise((resolve, reject) => {
    linter.lintFiles([fixture], null, reject)
  }))
  t.true(err === expected)
})

async function checkStderr (t, ...args) {
  process.argv.push('--stdin', '--fix')
  await checkOutput(t, 'stderr', ...args)
  process.argv.pop()
  process.argv.pop()
}
checkStderr.title = suffix => checkOutput.title(suffix, 'stderr')
test.serial(checkStderr, [fixture], null)
