'use strict'

const findRoot = require('find-root')
const pkgConfig = require('pkg-config')
const engine = require('standard-engine')
const applySettings = require('./settings')

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
