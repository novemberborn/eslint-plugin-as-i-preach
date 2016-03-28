import test from 'ava'

import { fork } from 'child_process'
import { resolve } from 'path'

import getStream from 'get-stream'

test('works with valid files', async t => {
  const cli = fork(resolve('../cli.js'), ['valid.js'], {
    cwd: resolve('fixtures'),
    silent: true
  })

  const [stdout, stderr] = await Promise.all([
    getStream(cli.stdout),
    getStream(cli.stderr)
  ])

  t.true(stdout === '')
  t.true(stderr === '')
})

test('works with invalid files', async t => {
  const cli = fork(resolve('../cli.js'), ['invalid.js'], {
    cwd: resolve('fixtures'),
    silent: true
  })

  const [stdout, stderr] = await Promise.all([
    getStream(cli.stdout),
    getStream(cli.stderr)
  ])

  const file = resolve('fixtures', 'invalid.js')
  t.true(stdout === `  ${file}:2:10: Strings must use singlequote.
  ${file}:3:2: Extra semicolon.
`)
  t.true(stderr === 'as-i-preach: as @novemberborn preaches (https://github.com/novemberborn/as-i-preach#readme) \n')
})
