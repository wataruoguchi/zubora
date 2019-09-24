# Zubora CLI

Zubora CLI is a JavaScript Unit Test File Generator CLI for zubora ("lazy" in Japanese) developers who code without writing tests. It generates unit test template to encourage zubora developers to write tests.

The test template will be written in BDD (Behaviour-Driven Development) syntax.

## Install the CLI

```sh
# Install
$ npm install -g zubora-cli
# Generate test file
$ zubora generate <source file path> <test file path>
```

## Usage

For example, your project looks like this:

```null
root
├── src
|   └── modules
|       └── tsModule.ts
|       └── jsModule.js
└── __tests__
└── package.json
```

Then when you run the command like below:

```sh
zubora generate src/modules/tsModule.ts __tests__/tsModule.spec.js
```

It generates a test template for `tsModule.ts` in the `__tests__` directory.

## Options

There is `--code` option. It takes JS code as a parameter.

### Example: CoffeeScript

_NOTE: It requires `coffeescript@^2` to run `coffee` if you want to parse classes (ES6)._

```sh
zubora generate Coffee.coffee Coffee.spec.js --code "$(coffee --compile --print --bare --no-header Coffee.coffee)"
```

This way, we can generate an unit test template for a CoffeeScript file.

## License

MIT - see LICENSE
