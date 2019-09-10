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
- [babel](https://babeljs.io/)

TODO:

- Babel

## 3. Parse

Tools:

- [Esprima](http://esprima.org/)

TODO:

- Test (module.export, module.export.default, module.export.foobar)

## 4. Generate template

Tools:

- [Prettier](https://prettier.io/)

### TODO:

- Resolve the file path to import the source file.
- We don't want to test private methods such as \_xxxx() - should sit this in configs
- We don't want to test constructor
- BDD syntax, describe/describe, describe/test

## 5. File output
