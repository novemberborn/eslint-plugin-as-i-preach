'use strict'

const deglob = require('deglob')
const formatter = require('eslint-formatter-pretty')
const hasFlag = require('has-flag')
const engine = require('standard-engine')

const DEFAULT_PATTERNS = [
  '**/*.js',
  '**/*.jsx',
  '**/*.d.ts',
  '**/*.ts',
  '**/*.tsx'
]

class Linter extends engine.linter {
  parseTypescriptOpts (opts, usePackageJson) {
    return this.parseOpts(Object.assign({}, opts, {parser: 'typescript-eslint-parser'}), usePackageJson)
  }

  lintTextSync (text, opts) {
    if (opts.filename && opts.filename.endsWith('.ts')) {
      opts = this.parseTypescriptOpts(opts, false)
    } else {
      opts = this.parseOpts(opts, false)
    }
    return new this.eslint.CLIEngine(opts.eslintConfig).executeOnText(text, opts.filename)
  }

  lintText (text, opts, cb) {
    try {
      const report = this.lintTextSync(text, opts)
      process.nextTick(cb, null, report)
    } catch (err) {
      process.nextTick(cb, err)
    }
  }

  lintFiles (patterns, opts, cb) {
    if (typeof opts === 'function') return this.lintFiles(patterns, null, opts)

    const regularOpts = this.parseOpts(opts, true)

    if (typeof patterns === 'string') patterns = [patterns]
    if (patterns.length === 0) patterns = DEFAULT_PATTERNS

    deglob(patterns, {
      ignore: regularOpts.ignore,
      cwd: regularOpts.cwd,
      useGitIgnore: true,
      usePackageJson: false
    }, (globErr, allFiles) => {
      if (globErr) return cb(globErr)

      const files = allFiles.filter(file => !file.endsWith('.ts'))
      const tsFiles = allFiles.filter(file => file.endsWith('.ts'))

      let report
      try {
        report = new this.eslint.CLIEngine(regularOpts.eslintConfig).executeOnFiles(files)
      } catch (err) {
        return cb(err)
      }

      let tsReport
      if (tsFiles.length > 0) {
        try {
          const tsOpts = this.parseTypescriptOpts(opts, true)
          tsReport = new this.eslint.CLIEngine(tsOpts.eslintConfig).executeOnFiles(tsFiles)
        } catch (err) {
          return cb(err)
        }
      }

      const combined = tsReport
        ? {
          results: report.results.concat(tsReport.results),
          errorCount: report.errorCount + tsReport.errorCount,
          warningCount: report.warningCount + tsReport.warningCount,
          fixableErrorCount: report.fixableErrorCount + tsReport.fixableErrorCount,
          fixableWarningCount: report.fixableWarningCount + tsReport.fixableWarningCount
        }
        : report

      if (regularOpts.fix) {
        this.eslint.CLIEngine.outputFixes(combined)
      }

      Object.defineProperty(combined.results, 'forEach', {
        enumerable: false,
        value () {
          const output = formatter(this.slice())
          if (hasFlag('stdin') && regularOpts.fix) {
            console.error(output)
          } else {
            console.log(output)
          }
        }
      })

      cb(null, combined)
    })
  }
}
module.exports = Linter
