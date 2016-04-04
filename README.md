# as-i-preach

Like [`standard`](https://github.com/feross/standard), but using [Babel as the
parser](https://github.com/babel/babel-eslint) so new syntax can be linted. Also
includes rules for [AVA
tests](https://github.com/sindresorhus/eslint-plugin-ava), as well as for
[enforcing the order of import
statements](https://github.com/jfmengels/eslint-plugin-import-order).

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

Any rule or plugin addition that restricts the rules is considered a breaking
change. Dependencies aren't pinned however.
