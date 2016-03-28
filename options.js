'use strict'

var path = require('path')
var eslint = require('eslint')
var pkg = require('./package.json')

module.exports = {
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,

  cmd: 'as-i-preach',
  tagline: 'as @novemberborn preaches',

  eslint: eslint,
  eslintConfig: {
    configFile: path.join(__dirname, 'eslintrc.json')
  },

  cwd: ''
}
