import test from 'ava'

import extensionsRule from 'eslint-plugin-import/lib/rules/extensions'
import noExtraneousDependenciesRule from 'eslint-plugin-import/lib/rules/no-extraneous-dependencies'

import applySettings from '../../lib/settings'

const NOT_PATCHED = new Error('Throw when unpatched code is run')
for (const rule of [extensionsRule, noExtraneousDependenciesRule]) {
  const {create} = rule
  rule.create = function (context) {
    const base = create.call(this, context)
    return Object.assign(base, {
      ImportDeclaration () { throw NOT_PATCHED },
      CallExpression: base.CallExpression && (() => { throw NOT_PATCHED })
    })
  }
}

function makeStaticRequire (value) {
  return {
    callee: {type: 'Identifier', name: 'require'},
    arguments: [{type: 'Literal', value}]
  }
}

function checkPatched (t, rule) {
  applySettings({}, {fakeDependencies: ['^fake', '^reallyFake']}, '/')

  const instance = rule.create({
    getFilename () { return 'test.js' },
    options: []
  })
  {
    t.notThrows(() => instance.ImportDeclaration({source: {value: 'fake'}}))
    t.notThrows(() => instance.ImportDeclaration({source: {value: 'reallyFake'}}))
    t.notThrows(() => instance.ImportDeclaration({source: {value: 'faker'}}))
    const err = t.throws(() => instance.ImportDeclaration({source: {value: 'real'}}))
    t.true(err === NOT_PATCHED)
  }

  if (instance.CallExpression) {
    t.notThrows(() => instance.CallExpression({}))
    t.notThrows(() => instance.CallExpression(makeStaticRequire('fake')))
    t.notThrows(() => instance.CallExpression(makeStaticRequire('reallyFake')))
    t.notThrows(() => instance.CallExpression(makeStaticRequire('faker')))
    const err = t.throws(() => instance.CallExpression(makeStaticRequire('real')))
    t.true(err === NOT_PATCHED)
  }
}
checkPatched.title = name => `patches ${name} if fakeDependencies setting is set`

test('import/extensions', checkPatched, extensionsRule)
test('import/no-extraneous-dependencies', checkPatched, noExtraneousDependenciesRule)
