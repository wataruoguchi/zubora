# Zubora CLI

![Zubora Sloth Logo](https://user-images.githubusercontent.com/8963743/84110724-40011980-a9da-11ea-9b79-ff020333fba9.jpg 'Zubora Sloth Logo')

[![npm version](https://badge.fury.io/js/zubora-cli.svg)](https://badge.fury.io/js/zubora-cli)

Zubora CLI is a JavaScript Unit Test File Generator CLI for zubora ("lazy" in Japanese) developers who code without writing tests. It generates unit test template to encourage zubora developers to write tests.

The test template will be written in BDD (Behaviour-Driven Development) syntax.

## Install the CLI

```sh
# Install
$ npm install -g zubora-cli
# Generate test file
$ zubora --src <source file path> --dist <test file path>
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

`src/modules/tsModule.ts`

```typescript
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}
export default Greeter;
```

Then when you run the command like below:

```sh
zubora --src src/modules/tsModule.ts --dist __tests__/tsModule.spec.js
```

It generates a test template for `tsModule.ts` in the `__tests__` directory.

`__tests__/tsModule.spec.js`

```javascript
import tsModule from '../src/modules/tsModule';
describe('Greeter', function () {
  describe('#constructor', function () {
    it('', function () {
      // TODO Write test for tsModule#constructor
    });
  });
  describe('#greet', function () {
    it('', function () {
      // TODO Write test for tsModule#greet
    });
  });
});
```

Play more in [The Zubora Page](https://zubora.io/) !!

## Supported File Type

We're only supporting module files.

- Source File: We're currently support JavaScript and TypeScript files.
- Dist file: The test file is currently generated as a JavaScript file.

## Plugins

We have developed plugin system. Currently, there's one plugin.

- [zubora-plugin-coffee](https://www.npmjs.com/package/zubora-plugin-coffee)

### Plugin Usage

Install the plugin and add this snippet in your `package.json`:

```json
"zubora" : {
  "plugins" : ["zubora-plugin-coffee"]
}
```

## License

MIT - see [LICENSE](https://github.com/wataruoguchi/zubora/blob/master/LICENSE)
