# as-i-preach

Like [`standard`](https://github.com/feross/standard), but using [Babel as the
parser](https://github.com/babel/babel-eslint) to support experimental language
features.

Additionally includes:

* Rules for [AVA
tests](https://github.com/sindresorhus/eslint-plugin-ava)
* Rules that [enforce the order of import
statements](https://github.com/jfmengels/eslint-plugin-import-order)
* Rules for [experimental language
features](https://github.com/babel/eslint-plugin-babel)
* Rules for [promises](https://github.com/xjamundx/eslint-plugin-promise)

See
[`eslintrc.json`](https://github.com/novemberborn/as-i-preach/blob/master/eslintrc.json)
for details.

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

## Semantic Versioning

ESLint config and plugin dependencies are pinned. Any rule or plugin addition
that restricts the rules is considered a breaking change.
