# Zubora CLI

![Zubora Sloth Logo](https://user-images.githubusercontent.com/8963743/84110724-40011980-a9da-11ea-9b79-ff020333fba9.jpg 'Zubora Sloth Logo')

[![npm version](https://badge.fury.io/js/zubora-cli.svg)](https://badge.fury.io/js/zubora-cli)

## Introduction

Zubora CLI is a JavaScript Unit Test File Generator. It is made for zubora ("lazy" in Japanese) developers. It generates unit test templates for you.

The test template will be written in BDD (Behaviour-Driven Development) syntax.

### Input

```typescript
export function greeter(person: string) {
  return 'Hello, ' + person;
}

class iAmClass {
  constructor() {}
  async myAsync() {
    return await 'It takes some time';
  }
  myMethod(str: string) {
    return str;
  }
}

function iWillBeRenamed() {
  return true;
}

async function iAmDefaultAndAsync() {}

export {
  iAmClass,
  iWillBeRenamed as iAmRenamed,
  iAmDefaultAndAsync as default,
};
```

### Output

```javascript
import foobar, { greeter, iAmClass, iAmRenamed } from './foobar';
describe('greeter', function () {
  describe('greeter', function () {
    it('', function () {
      // TODO Write test for greeter
    });
  });
});
describe('iAmClass', function () {
  describe('#constructor', function () {
    it('', function () {
      // TODO Write test for iAmClass#constructor
    });
  });
  describe('#myAsync', function () {
    it('', async function () {
      // TODO Write test for iAmClass#myAsync
    });
  });
  describe('#myMethod', function () {
    it('', function () {
      // TODO Write test for iAmClass#myMethod
    });
  });
});
describe('iAmRenamed', function () {
  describe('iAmRenamed', function () {
    it('', function () {
      // TODO Write test for iAmRenamed
    });
  });
});
describe('foobar', function () {
  describe('foobar', function () {
    it('', async function () {
      // TODO Write test for foobar
    });
  });
});
```

## Playground

Before you install the CLI, try it in [The Zubora Page](https://zubora.io/).

## Installation & Usage

### How to install

```sh
# Install
$ npm install -g zubora-cli
# Generate test file
$ zubora --src <source file path> --dest <test file path>
```

### Usage

For example, your project looks like this:

```null
root
├── src
|   └── modules
|       └── tsModule.ts
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
zubora --src src/modules/tsModule.ts --dest __tests__/tsModule.spec.js
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

## Supported File Type

We're only supporting module files.

- Source File: We're currently supporting JavaScript and TypeScript files.
- Destination File: Test template file is currently generated as a JavaScript file.

## Plugins

We have developed plugin system.

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
