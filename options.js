'use strict'

const eslint = require('eslint')
const applySettings = require('./lib/settings')
const pkg = require('./package.json')

module.exports = {
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,

  cmd: 'as-i-preach',
  tagline: 'as @novemberborn preaches',

  eslint,
  eslintConfig: {
    configFile: require.resolve('./.eslintrc')
  },

  parseOpts (opts, packageOpts, rootDir) {
    applySettings(opts.eslintConfig, packageOpts, rootDir)
    return opts
  },

  cwd: ''
}
