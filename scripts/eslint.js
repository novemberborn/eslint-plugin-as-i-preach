#!/usr/bin/env node

'use strict'

if (require('../lib/is-supported')) {
  require('../node_modules/.bin/eslint')
} else {
  console.warn('Linting requires Node.js >=4')
}
