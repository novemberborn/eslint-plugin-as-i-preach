'use strict'

const path = require('path')
const arrify = require('arrify')
const baseRules = require('../.eslintrc').rules
const patchImportRule = require('./patch-import-rule')

const ALLOW_DEV_DEPENDENCIES = [
  'scripts/**/*.js',
  'test.js',
  'test/**/*.js'
]

function applySettings (eslintConfig, settings, rootDir) {
  if (!eslintConfig.rules) eslintConfig.rules = {}

  {
    const allowDevDependencies = settings.allowDevDependencies || ALLOW_DEV_DEPENDENCIES
    const config = baseRules['import/no-extraneous-dependencies'][1]
    config.devDependencies = arrify(allowDevDependencies).map(pattern => path.join(rootDir, pattern))
    eslintConfig.rules['import/no-extraneous-dependencies'] = ['error', config]
  }

  {
    const fakeDependencies = settings.fakeDependencies
    if (fakeDependencies) {
      const config = baseRules['import/no-unresolved'][1]
      config.ignore = arrify(fakeDependencies)
      eslintConfig.rules['import/no-unresolved'] = ['error', config]

      const patterns = config.ignore.map(str => new RegExp(str))
      patchImportRule('extensions', patterns)
      patchImportRule('no-extraneous-dependencies', patterns)
    }
  }

  {
    const resolvers = settings.resolvers
    if (resolvers) {
      eslintConfig.baseConfig = {
        settings: {
          'import/resolver': resolvers
        }
      }
    }
  }
}

module.exports = applySettings
