# TODO

Create CLI that generates a test file from specified JS/TS/CoffeeScript file.

## 0. Strategy

Start small! Forget about the transpile part right now. Test case has to be super simple. Just to get the basic things done first.

Let's say, the command would look something like this:

```sh
$ zubora <source> <destination>
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

## 3. Parse

Tools:

- [Esprima](http://esprima.org/)

## 4. Generate template

Tools:

- [Prettier](https://prettier.io/)

## 5. File output
