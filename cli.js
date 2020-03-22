#!/usr/bin/env node
'use strict'

const execa = require('execa')
const pkgDir = require('pkg-dir')

const fixArgs = process.argv.filter(arg => arg.startsWith('--fix'))
const cwd = pkgDir.sync()

execa('eslint', [
  '--ignore-path', '.gitignore',
  '--cache',
  '--cache-location', './node_modules/.cache/eslint/',
  '--format', require.resolve('eslint-formatter-pretty'),
  '--ext', '.js,.ts',
  ...fixArgs,
  '.',
], {
  cwd,
  preferLocal: true,
  buffer: false,
  stdout: 'inherit',
  stderr: 'inherit',
  reject: false,
}).then(({ exitCode }) => {
  process.exitCode = exitCode
})
