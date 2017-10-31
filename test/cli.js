import {fork} from 'child_process'
import {resolve as resolvePath} from 'path'

import test from 'ava'
import getStream from 'get-stream'

function getCode (ps) {
  return new Promise(resolve => ps.on('close', resolve))
}

const CLI_PATH = resolvePath(__dirname, '..', 'cli.js')
const FIXTURES_DIR = resolvePath(__dirname, 'fixtures')

test('works with valid files', async t => {
  const cli = fork(CLI_PATH, ['valid.js'], {
    cwd: FIXTURES_DIR,
    silent: true
  })

  const [code, stdout, stderr] = await Promise.all([
    getCode(cli),
    getStream(cli.stdout),
    getStream(cli.stderr)
  ])

  t.true(code === 0)
  t.true(stdout === '')
  t.true(stderr === '')
})

test('works with invalid files', async t => {
  const cli = fork(CLI_PATH, ['invalid.js'], {
    cwd: FIXTURES_DIR,
    silent: true
  })

  const [code, stdout, stderr] = await Promise.all([
    getCode(cli),
    getStream(cli.stdout),
    getStream(cli.stderr)
  ])

  t.true(code === 1)
  t.regex(stdout, /2:10\s+Strings must use singlequote/)
  t.regex(stdout, /3:2\s+Extra semicolon/)
  t.true(stderr === `as-i-preach: as @novemberborn preaches (https://github.com/novemberborn/as-i-preach#readme)
as-i-preach: Run \`as-i-preach --fix\` to automatically fix some problems.
`)
})
