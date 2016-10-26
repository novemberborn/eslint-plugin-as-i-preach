'use strict'

const isStaticRequire = require('eslint-plugin-import/lib/core/staticRequire').default

function shouldIgnore (source, patterns) {
  return patterns.some(pattern => pattern.test(source))
}

function patch (ruleName, ignorePatterns) {
  const rule = require(`eslint-plugin-import/lib/rules/${ruleName}`) // eslint-disable-line import/no-dynamic-require
  const create = rule.create
  rule.create = function (context) {
    const result = create.call(this, context)
    const ImportDeclaration = result.ImportDeclaration
    result.ImportDeclaration = function (node) {
      if (!shouldIgnore(node.source.value, ignorePatterns)) {
        ImportDeclaration.call(this, node)
      }
    }

    const CallExpression = result.CallExpression
    result.CallExpression = function (node) {
      if (isStaticRequire(node) && !shouldIgnore(node.arguments[0].value, ignorePatterns)) {
        CallExpression.call(this, node)
      }
    }

    return result
  }
}
module.exports = patch
