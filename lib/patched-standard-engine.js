'use strict'

const findRoot = require('find-root')
const pkgConfig = require('pkg-config')
const engine = require('standard-engine')
const applySettings = require('./settings')

function nextTick (cb, err, val) {
  process.nextTick(function () {
    cb(err, val)
  })
}

engine.linter.prototype.lintText = function (text, opts, cb, filename) {
  if (typeof opts === 'function') return this.lintText(text, null, opts, cb)
  opts = this.parseOpts(opts)

  let result
  try {
    result = new this.eslint.CLIEngine(opts.eslintConfig).executeOnText(text, filename)
  } catch (err) {
    return nextTick(cb, err)
  }
  return nextTick(cb, null, result)
}

const parseOpts = engine.linter.prototype.parseOpts
engine.linter.prototype.parseOpts = function (opts) {
  opts = parseOpts.call(this, opts)

  let root = opts.cwd
  let packageOpts = {}
  try {
    root = findRoot(root)
    packageOpts = pkgConfig(this.cmd, { root: false, cwd: root }) || packageOpts
  } catch (err) {}

  applySettings(opts.eslintConfig, packageOpts, root)

  return opts
}

module.exports = engine
