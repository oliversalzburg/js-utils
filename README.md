# JS Utils

[![npm version](https://img.shields.io/npm/v/@oliversalzburg%2Fjs-utils)](https://www.npmjs.com/package/@oliversalzburg%2Fjs-utils) [![QA](https://github.com/oliversalzburg/js-utils/actions/workflows/qa.yml/badge.svg)](https://github.com/oliversalzburg/js-utils/actions/workflows/qa.yml)

A collection of random utilities for JS/TS development.

-   ESM only.

-   Tree-shaking in mind. Only subpath-imports are supported.

-   Consumable with `node` and `nodenext` [module resolution](https://www.typescriptlang.org/tsconfig/#moduleResolution).

-   No runtime dependencies.

-   All runtime code is licensed under MIT, or fully compatible licenses.

## Release Process

```
npm version patch --message "chore: Version bump %s"
```
