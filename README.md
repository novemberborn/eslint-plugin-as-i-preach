# `@novemberborn/eslint-plugin-as-i-preach`

[ESLint](https://eslint.org) to [@novemberborn](https://novemberborn.net/)’s taste.

## Installation

```console
npm install -D @novemberborn/eslint-plugin-as-i-preach eslint eslint-plugin-{ava,import,node,promise,security,standard,unicorn}
```

For TypeScript projects, also install:

```console
npm install -D @typescript-eslint/eslint-plugin
```

You can ignore peer dependency warnings about this plugin (and the `typescript` dependency) if you don't use TypeScript.

## Usage

Use the `as-i-preach` binary in `package.json` scripts:

```json
{
  "scripts": {
    "test": "as-i-preach"
  }
}
```

Or run it with `npx`:

```console
npx as-i-preach
```

Run with `--fix` to automatically fix violations:

```console
npx as-i-preach --fix
```

### Node.js / JavaScript

Create `.eslintrc.js`:

```js
'use strict'

module.exports = {
  plugins: ['@novemberborn/as-i-preach'],
  extends: ['plugin:@novemberborn/as-i-preach/nodejs'],
}
```

### Node.js / TypeScript

Create `.eslintrc.js`:

```js
'use strict'

require('@novemberborn/eslint-plugin-as-i-preach').mergeTypeScriptParserOptions({ tsconfigRootDir: __dirname })

module.exports = {
  plugins: ['@novemberborn/as-i-preach'],
  extends: ['plugin:@novemberborn/as-i-preach/nodejs', 'plugin:@novemberborn/as-i-preach/typescript'],
}
```

All `*.ts` and `*.d.ts` files must be included by your TypeScript config. If you want to exclude certain files from compilation you can create a `tsconfig.eslint.json` file instead. It'll be picked up automatically.

For instance, given a `tsconfig.json`:

```json
{
  "include": ["src/**/*"],
  "exclude": ["src/test/typescript/*"]
}
```

You could write a `tsconfig.eslint.json`:

```json
{
  "extends": "./tsconfig.json",
  "exclude": []
}
```
