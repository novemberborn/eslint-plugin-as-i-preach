#!/usr/bin/env node

'use strict'

// istanbul ignore else
if (require('./is-supported')) {
  require('standard-engine').cli(require('./options'))
} else {
  console.warn('Linting requires Node.js >=4')
}
