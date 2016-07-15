#!/usr/bin/env node

'use strict'

if (!require('../is-supported')) {
  // Drop all arguments, force CLI test to run. Other tests won't work on
  // unsupported platforms.
  process.argv.splice(2, process.argv.length, 'test/cli.js')
}

require('../node_modules/.bin/ava')
