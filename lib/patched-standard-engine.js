'use strict'

const engine = require('standard-engine')
const Linter = require('./Linter')

engine.linter = opts => new Linter(opts)
module.exports = engine
