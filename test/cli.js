import { fork } from 'child_process'
import { resolve as resolvePath } from 'path'

import test from 'ava'
import getStream from 'get-stream'

function getCode (ps) {
  return new Promise(resolve => ps.on('close', resolve))
}

if (require('../lib/is-supported')) {
  test('works with valid files', async t => {
    const cli = fork(resolvePath('../cli.js'), ['valid.js'], {
      cwd: resolvePath('fixtures'),
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
    const cli = fork(resolvePath('../cli.js'), ['invalid.js'], {
      cwd: resolvePath('fixtures'),
      silent: true
    })

    const [code, stdout, stderr] = await Promise.all([
      getCode(cli),
      getStream(cli.stdout),
      getStream(cli.stderr)
    ])

    t.true(code === 1)
    const file = resolvePath('fixtures', 'invalid.js')
    t.true(stdout === `  ${file}:2:10: Strings must use singlequote.
  ${file}:3:2: Extra semicolon.
`)
    t.true(stderr === `as-i-preach: as @novemberborn preaches (https://github.com/novemberborn/as-i-preach#readme)
as-i-preach: Run \`as-i-preach --fix\` to automatically fix some problems.
`)
  })
} else {
  test('fails with exit code 0 when run on an unsupported platform', async t => {
    const cli = fork(resolvePath('../cli.js'), ['valid.js'], {
      cwd: resolvePath('fixtures'),
      silent: true
    })

    const [code, stdout, stderr] = await Promise.all([
      getCode(cli),
      getStream(cli.stdout),
      getStream(cli.stderr)
    ])

    t.true(code === 0)
    t.true(stdout === '')
    t.true(stderr === 'Linting requires Node.js >=4\n')
  })
}
