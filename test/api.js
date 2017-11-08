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
              column: 10,
              endColumn: 28,
              endLine: 2,
              line: 2,
              message: '\'new Buffer()\' was deprecated since v6. Use \'Buffer.alloc()\' or \'Buffer.from()\' (use \'https://www.npmjs.com/package/safe-buffer\' for \'<4.5.0\') instead.', // eslint-disable-line max-len
              nodeType: 'NewExpression',
              ruleId: 'node/no-deprecated-api',
              severity: 2,
              source: '  return new Buffer("BAR:") + bar.toUpperCase()'
            },
            {
              column: 21,
              endColumn: 27,
              endLine: 2,
              fix: {range: [43, 49], text: '\'BAR:\''},
              line: 2,
              message: 'Strings must use singlequote.',
              nodeType: 'Literal',
              ruleId: 'quotes',
              severity: 2,
              source: '  return new Buffer("BAR:") + bar.toUpperCase()'
            },
            {
              column: 2,
              fix: {range: [71, 73], text: '}'},
              line: 3,
              message: 'Extra semicolon.',
              nodeType: 'ExpressionStatement',
              ruleId: 'semi',
              severity: 2,
              source: '};'
            }
          ],
          errorCount: 3,
          fixableErrorCount: 2,
          warningCount: 0,
          fixableWarningCount: 0,
          source: 'exports.foo = bar => {\n  return new Buffer("BAR:") + bar.toUpperCase()\n};\n'
        }
      ],
      errorCount: 3,
      fixableErrorCount: 2,
      warningCount: 0,
      fixableWarningCount: 0
    })

    t.end()
  })
})
