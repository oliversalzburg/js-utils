# Project Template

## Does

-   [Yarn 3](https://yarnpkg.com/)
-   Uses [TypeScript](https://www.typescriptlang.org/)
-   Target application runs in [Node.js](https://nodejs.org/)
-   [esbuild](https://esbuild.github.io/)
-   [EditorConfig](https://editorconfig.org/) + [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) + [lint-staged](https://github.com/okonet/lint-staged)
-   QA with [GitHub Actions](https://github.com/features/actions)
-   [MkDocs](https://www.mkdocs.org/)-oriented Markdown in mind

## Doesn't

-   [Yarn PnP](https://yarnpkg.com/features/pnp)
-   [Yarn telemetry](https://yarnpkg.com/advanced/telemetry)
-   [Yarn Zero-Installs](https://yarnpkg.com/features/zero-installs)
-   [Husky](https://github.com/typicode/husky)

## Why

1.  Why modern Yarn?

    Among other things, Yarn is robust, performant and extremely versatile when it comes to repository management. The given configuration provides a very solid first-time experience. Some of the things that make modern Yarn great can be seen in this project template.

1.  Why esbuild?

    We want fast builds. The code is still checked for correctness in the editor and in CI.

1.  Why the MkDocs Markdown?

    If you're going to want to build any documentation site, you will appreciate having auto-formatted to this style from the start. Using mkdocs-material for documentation sites is highly recommended. The Python Markdown ecosystem is much more versatile and performant than the JS/TS space.

1.  Why is PnP disabled?

    While PnP is generally preferred for its strictness, using it still incurs a lot of friction. Because PnP is enabled by default in modern Yarn, this deters many users from adopting modern Yarn. Thus, this project uses Yarn's `node-modules` linker, the behavior of which should be very familiar to most adopters.

1.  Why is telemetry disabled?

    Whenever possible, the disclosure of _any_ data should be opt-in. Please refer to the document linked above, and enable telemetry after carefully reading it.

1.  Why not Zero-Installs?

    Zero-Installs are purely a `.gitignore`-controlled feature. Most new adopters do not expect the behavior of the default configuration and some adopters have raised concerns over long-term effects. Enable it after carefully reading the article linked above.

1.  Why not use Husky for the hook?

    Husky is more complex than what is required to install the hook in a modern Yarn repository. We also do not want to hand over control over repository behavior to a dependency.
