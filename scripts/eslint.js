#!/usr/bin/env node

'use strict'

if (require('../is-supported')) {
  require('../node_modules/.bin/eslint')
} else {
  console.warn('Linting requires Node.js >=4')
}
