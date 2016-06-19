import { resolve } from 'path'

import test from 'ava'

import linter from '../'

test.cb('works with valid files', t => {
  linter.lintFiles(['fixtures/valid.js'], (err, result) => {
    t.true(err === null)

    t.deepEqual(result, {
      results: [
        {
          filePath: resolve('fixtures', 'valid.js'),
          messages: [],
          errorCount: 0,
          warningCount: 0
        }
      ],
      errorCount: 0,
      warningCount: 0
    })

    t.end()
  })
})

test.cb('works with invalid files', t => {
  linter.lintFiles(['fixtures/invalid.js'], (err, result) => {
    t.true(err === null)

    t.deepEqual(result, {
      results: [
        {
          filePath: resolve('fixtures', 'invalid.js'),
          messages: [
            {
              ruleId: 'quotes',
              severity: 2,
              message: 'Strings must use singlequote.',
              line: 2,
              column: 10,
              nodeType: 'Literal',
              source: '  return "BAR:" + bar.toUpperCase()',
              fix: { range: [32, 38], text: '\'BAR:\'' }
            },
            {
              ruleId: 'semi',
              severity: 2,
              message: 'Extra semicolon.',
              line: 3,
              column: 2,
              nodeType: 'ExpressionStatement',
              source: '};',
              fix: { range: [60, 61], text: '' }
            }
          ],
          errorCount: 2,
          warningCount: 0
        }
      ],
      errorCount: 2,
      warningCount: 0
    })

    t.end()
  })
})
