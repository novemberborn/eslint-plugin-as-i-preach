'use strict'

const config = require('../.typescript.eslintrc')

function mergeTypescriptConfig (eslintConfig) {
  for (const plugin of config.plugins) {
    eslintConfig.plugins.push(plugin)
  }
  Object.assign(eslintConfig.rules, config.rules)

  if (!eslintConfig.baseConfig) eslintConfig.baseConfig = {}
  const baseConfig = eslintConfig.baseConfig
  if (!baseConfig.settings) baseConfig.settings = {}
  const settings = baseConfig.settings
  if (!settings['import/resolver']) settings['import/resolver'] = {}
  const resolver = settings['import/resolver']
  resolver['eslint-import-resolver-typescript'] = true
}
module.exports = mergeTypescriptConfig
