# Zubora-plugin-coffee

[![npm version](https://badge.fury.io/js/zubora-plugin-coffee.svg)](https://badge.fury.io/js/zubora-plugin-coffee)

A plugin for [zubora-CLI](https://www.npmjs.com/package/zubora-cli) to support CoffeeScript files.

## Usage

Install the plugin.

```sh
npm install zubora-plugin-coffee --save-dev
```

```sh
yarn add -D zubora-plugin-coffee
```

Add the following snippet in to your project's `package.json`:

```json
"zubora" : {
  "plugins" : ["zubora-plugin-coffee"]
}
```

`coffeescript` is this plugin's peer dependency. Make sure `coffeescript` is installed in the same `package.json`.
