import {resolve as resolvePath} from 'path'

import test from 'ava'

import linter from '..'

const resolveFixture = name => resolvePath(__dirname, 'fixtures', name)

test.cb('works with valid files', t => {
  linter.lintFiles([resolveFixture('valid.js')], (err, result) => {
    t.true(err === null)

    t.deepEqual(result, {
      results: [
        {
          filePath: resolveFixture('valid.js'),
          messages: [],
          errorCount: 0,
          fixableErrorCount: 0,
          warningCount: 0,
          fixableWarningCount: 0
        }
      ],
      errorCount: 0,
      fixableErrorCount: 0,
      warningCount: 0,
      fixableWarningCount: 0
    })

    t.end()
  })
})

test.cb('works with invalid files', t => {
  linter.lintFiles([resolveFixture('invalid.js')], (err, result) => {
    t.true(err === null)

    t.deepEqual(result, {
      results: [
        {
          filePath: resolveFixture('invalid.js'),
          messages: [
            {
              ruleId: 'quotes',
              severity: 2,
              message: 'Strings must use singlequote.',
              line: 2,
              endLine: 2,
              column: 10,
              endColumn: 16,
              nodeType: 'Literal',
              source: '  return "BAR:" + bar.toUpperCase()',
              fix: {range: [32, 38], text: '\'BAR:\''}
            },
            {
              ruleId: 'semi',
              severity: 2,
              message: 'Extra semicolon.',
              line: 3,
              column: 2,
              nodeType: 'ExpressionStatement',
              source: '};',
              fix: {range: [59, 61], text: '}'}
            }
          ],
          errorCount: 2,
          fixableErrorCount: 2,
          warningCount: 0,
          fixableWarningCount: 0,
          source: 'exports.foo = bar => {\n  return "BAR:" + bar.toUpperCase()\n};\n'
        }
      ],
      errorCount: 2,
      fixableErrorCount: 2,
      warningCount: 0,
      fixableWarningCount: 0
    })

    t.end()
  })
})
