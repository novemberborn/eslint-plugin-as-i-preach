#!/usr/bin/env node

'use strict'

require('./lib/patch-file-result-output')(
  require('standard-engine'), console
).cli(require('./options'))
