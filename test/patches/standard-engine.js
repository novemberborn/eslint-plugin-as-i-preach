import { join } from 'path'
import test from 'ava'
import engine from '../../lib/patched-standard-engine'
import options from '../../options'

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
