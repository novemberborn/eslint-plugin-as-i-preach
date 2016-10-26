# as-i-preach

Like [`standard`](https://github.com/feross/standard), with additional
configuration:

* Rules for [AVA
tests](https://github.com/sindresorhus/eslint-plugin-ava)
* Rules that [enforce how dependencies are
imported](https://github.com/benmosher/eslint-plugin-import)
* Rules for [experimental language
features](https://github.com/babel/eslint-plugin-babel)
* Rules for [promises](https://github.com/xjamundx/eslint-plugin-promise)
* Various [awesome](https://github.com/sindresorhus/eslint-plugin-unicorn)
ESLint rules

See [`.eslintrc.js`](.eslintrc.js) for details.

It's what [I](https://novemberborn.net/) use.

## Installation

```console
$ npm install --save-dev @novemberborn/as-i-preach
```

Then add it to your `package.json`:

```json
{
  "scripts": {
    "lint": "as-i-preach"
  }
}
```

### Configuration

You can provide configuration in your `package.json` under the `as-i-preach`
key:

```json
{
  "as-i-preach": {
    "ignore": [
      "tmp.js"
    ]
  }
}
```

See [`standard-engine` for
details](https://github.com/Flet/standard-engine#ignoring-files).

Additionally you can provide the following options:

* `allowDevDependencies`: a string or array of glob patterns for files that are
allowed to use `devDependencies`.

  Defaults to `["scripts/**/*.js", "test.js", "test/**/*.js"]`

* `fakeDependencies`: a string or array of regular expression patterns for
dependency sources that are actually fake, and must not be linted.

  For example if you use [`babel-plugin-files`](https://github.com/novemberborn/babel-plugin-files),
  specify `"^files:"` to avoid linter errors for import statements that are
  handled by the plugin.

## Semantic versioning

ESLint config and plugin dependencies are pinned. Any rule or plugin addition
that restricts the rules is considered a breaking change.
