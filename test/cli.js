import {fork} from 'child_process'
import fs from 'fs'
import path from 'path'

import test from 'ava'
import getStream from 'get-stream'

function getCode (ps) {
  return new Promise(resolve => ps.on('close', resolve))
}

const CLI_PATH = path.resolve(__dirname, '..', 'cli.js')
const FIXTURES_DIR = path.resolve(__dirname, 'fixtures')

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
  t.snapshot(stdout, 'stdout')
  t.snapshot(stderr, 'stderr')
})

test('writes report to stderr if --stdin and --fix are passed', async t => {
  const cli = fork(CLI_PATH, ['--stdin', '--fix'], {
    cwd: FIXTURES_DIR,
    silent: true
  })
  cli.stdin.end(fs.readFileSync(path.join(FIXTURES_DIR, 'invalid.js')))

  const [code, stdout, stderr] = await Promise.all([
    getCode(cli),
    getStream(cli.stdout),
    getStream(cli.stderr)
  ])

  t.true(code === 1)
  t.snapshot(stdout, 'stdout')
  t.snapshot(stderr, 'stderr')
})
