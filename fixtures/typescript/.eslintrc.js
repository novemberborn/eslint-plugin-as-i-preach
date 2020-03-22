'use strict'

const plugin = require('../..')

plugin.mergeTypeScriptParserOptions({ tsconfigRootDir: __dirname })

module.exports = {
  ...plugin.configs.nodejs,
  overrides: [
    ...plugin.configs.nodejs.overrides,
    ...plugin.configs.typescript.overrides,
  ],
}
