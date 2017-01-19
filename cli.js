#!/usr/bin/env node

'use strict'

require('./lib/patch-file-result-output')(
  require('./lib/patched-standard-engine'), console
).cli(require('./options'))
