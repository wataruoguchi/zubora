"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Transformer
 * It transforms TypeScript / JavaScript code, then return generated code, source map, and AST.
 */
var core_1 = require("@babel/core");
var presetTypeScript = require('@babel/preset-typescript').default;
/**
 * transformer
 * Setup transformer and return it. The returned transformer transforms given code.
 * @param filename
 */
function transformer(filename) {
    // Babel
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var defaultPresets = [];
    var presets = /\.tsx?$/.test(filename)
        ? __spreadArrays(defaultPresets, [presetTypeScript]) : defaultPresets;
    var option = {
        filename: filename,
        babelrc: false,
        configFile: false,
        code: true,
        comments: false,
        presets: presets,
        ast: true,
    };
    return function (code) {
        return core_1.transformAsync(code, option);
    };
}
exports.transformer = transformer;
//# sourceMappingURL=transformer.js.map