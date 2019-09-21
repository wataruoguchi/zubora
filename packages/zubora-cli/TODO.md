# TODO

Create CLI that generates a test file from specified JS/TS/CoffeeScript file.

## 0. Strategy

Start small! Forget about the transpile part right now. Test case has to be super simple. Just to get the basic things done first.

Let's say, the command would look something like this:

```sh
$ zubora make <source> <destination>
Test template is created at <destination>
```

We could have some settings in config file, such as:

- Destination pattern
- Output file type
- Transpiler settings

## 1. Open the file

Create a CLI tool that takes a file path to open the file.

## 2. Detect the file type and transpile

Tools:

- [typescript](https://www.typescriptlang.org/)
- [coffee-script](http://coffeescript.org/)

TODO:
[] TypeScript
[] CoffeeScript

## 3. Parse

Tools:

- [@babel/parser](https://babeljs.io/docs/en/babel-parser)

Docs:

- <https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#best-practices>

TODO:

[x] Let's write unit tests
[x] Test Exporting Class (module.export, module.export.default, module.export.named)
[x] Let's write unit tests
[x] Test Exporting Class (export default)
[x] Let's write unit tests
[x] Test Exporting Class (export named)
[x] Let's write unit tests
[x] Test all patterns you can find in <https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export>

## 4. Generate template

Tools:

- [Prettier](https://prettier.io/)

### TODO:

[] Let's write unit tests
[] Resolve the file path to import the source file.
[] Let's write unit tests
[] describe/describe in BDD syntax
[] Let's write unit tests
[] We don't want to test constructor
[] Let's write unit tests
[] We don't want to test private methods such as \_xxxx() - it should be configurable

## 5. File output
