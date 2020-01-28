import * as prettier from 'prettier';
import * as resolve from 'resolve';
import { transformAsync, TransformOptions, BabelFileResult } from '@babel/core';
const presetTypeScript = require('@babel/preset-typescript').default;
import { parser, template, getFileExt } from 'zubora';
import { getConfig } from './getConfig';

async function transpileWithPlugins(rawCode: string): Promise<string> {
  const { plugins = [] } = await getConfig();
  const loadedPlugins = new Map();
  await Promise.all(
    plugins.map(async (pluginName: string) => {
      // Load plugins
      const filePath = await resolve.sync(pluginName, {
        basedir: process.cwd(),
      });
      if (!filePath)
        throw new Error(
          `Plugin ${pluginName} does not exist. Please try "npm install -D ${pluginName}"`
        );
      const plugin = await import(filePath);
      loadedPlugins.set(
        pluginName,
        typeof plugin === 'object' && typeof plugin.default === 'function'
          ? plugin.default
          : function(code: string): string {
              return code;
            }
      );
      return;
    })
  );
  const code = plugins.reduce((code: string, pluginName: string) => {
    try {
      if (typeof loadedPlugins.get(pluginName) === 'function')
        return loadedPlugins.get(pluginName)(code);
    } catch (error) {
      throw new Error(
        `plugin should be a function. However, ${pluginName} is ${typeof loadedPlugins.get(
          pluginName
        )}`
      );
    }
  }, rawCode);
  return code;
}
async function generateTemplate(
  srcPath: string,
  destPath: string,
  rawCode: string // It could be TS or JS
): Promise<string> {
  const code: string = await transpileWithPlugins(rawCode);
  const codeNotFountMessage = 'No code found.';
  if (code.length === 0) return codeNotFountMessage;

  // Babel
  const presets: string[] = /\.tsx?$/.test(getFileExt(srcPath))
    ? [presetTypeScript]
    : [];
  const option: TransformOptions = {
    filename: srcPath,
    babelrc: false,
    configFile: false,
    code: true,
    comments: false,
    presets,
  };

  return new Promise<string>((resolve, reject): void => {
    transformAsync(code, option)
      .then((result: BabelFileResult | null): void => {
        if (result && typeof result.code === 'string') {
          const { code } = result;
          const { moduleExports, classObjects } = parser(code);
          const generateTemplate = template(srcPath, destPath);
          resolve(
            prettier.format(generateTemplate(moduleExports, classObjects), {
              parser: 'babel',
            })
          );
        } else {
          reject(codeNotFountMessage);
        }
      })
      .catch((error): void => {
        reject(error);
      });
  });
}

export { generateTemplate };
