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

[x] TypeScript
[] CoffeeScript - well, let's take transpiled code instead.

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

[x] Let's write unit tests
[x] Resolve the file path to import the source file.
[x] Let's write unit tests
[x] Template for Class in BDD syntax
[x] Let's write unit tests
[x] Template for others in BDD syntax

### Someday

[] We don't want to test constructor, so remove it from test case
[] We don't want to test "private" methods such as \_xxxx() - it should be configurable

## 5. File output

## 6. Documentation

Remove unused file (e.g., src/commands/generate)

[] Decoupling this to zubora & zubora-CLI
[] README.md
[] docs/\*.md
