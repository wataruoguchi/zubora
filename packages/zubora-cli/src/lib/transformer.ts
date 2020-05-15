/**
 * Transformer
 * It transforms TypeScript / JavaScript code, then return generated code, source map, and AST.
 */
import { transformAsync, TransformOptions, BabelFileResult } from '@babel/core';
const presetTypeScript = require('@babel/preset-typescript').default;

/**
 * transformer
 * Setup transformer and return it. The returned transformer transforms given code.
 * @param filename
 */
function transformer(
  filename: string
): (code: string) => Promise<BabelFileResult | null> {
  // Babel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultPresets: any[] = [];
  const presets: string[] = /\.tsx?$/.test(filename)
    ? [...defaultPresets, presetTypeScript]
    : defaultPresets;
  const option: TransformOptions = {
    filename,
    babelrc: false,
    configFile: false,
    code: true,
    comments: false,
    presets,
  };
  return function(code: string): Promise<BabelFileResult | null> {
    return transformAsync(code, option);
  };
}

export { transformer };
