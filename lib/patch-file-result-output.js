'use strict'

const formatter = require('eslint-formatter-pretty')
const hasFlag = require('has-flag')

function patchFileResultOutput (engine, consoleWriter) {
  const lintFiles = engine.linter.prototype.lintFiles
  engine.linter.prototype.lintFiles = function (files, opts, cb) {
    if (typeof opts === 'function') return this.lintFiles(files, null, opts)

    return lintFiles.call(this, files, opts, (err, result) => {
      if (err) return cb(err)

      result.results.forEach = () => {
        const output = formatter(result.results.slice())
        if (hasFlag('stdin') && hasFlag('fix')) {
          consoleWriter.error(output)
        } else {
          consoleWriter.log(output)
        }
      }
      cb(null, result)
    })
  }

  return engine
}
module.exports = patchFileResultOutput
