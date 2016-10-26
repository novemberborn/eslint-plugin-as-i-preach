#!/usr/bin/env node

'use strict'

// istanbul ignore else
if (require('./lib/is-supported')) {
  require('./lib/patched-standard-engine').cli(require('./options'))
} else {
  console.warn('Linting requires Node.js >=4')
}
