/**
 * Transformer
 * It transforms TypeScript / JavaScript code, then return generated code, source map, and AST.
 */
import { TransformOptions, BabelFileResult, PluginItem } from '@babel/core';
import { transform } from '@babel/standalone';

/**
 * transformer
 * Setup transformer and return it. The returned transformer transforms given code.
 * @param filename
 */
function transformer(
  filename: string
): (code: string) => Promise<BabelFileResult | null> {
  // Babel
  const defaultPresets: PluginItem[] = [];
  const presets: PluginItem[] = /\.tsx?$/.test(filename)
    ? [...defaultPresets, 'typescript']
    : defaultPresets;
  const option: TransformOptions = {
    filename,
    babelrc: false,
    configFile: false,
    code: true,
    comments: false,
    presets,
    ast: true,
  };
  return function (code: string): Promise<BabelFileResult | null> {
    return new Promise((resolve) => {
      resolve(transform(code, option));
    });
  };
}

export { transformer };
