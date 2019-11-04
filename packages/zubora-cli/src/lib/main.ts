import * as prettier from 'prettier';
import { transformAsync, TransformOptions, BabelFileResult } from '@babel/core';
const presetTypeScript = require('@babel/preset-typescript').default;
import { parser, template, getFileExt } from 'zubora';

async function generateTemplate(
  srcPath: string,
  destPath: string,
  code: string // It could be TS or JS
): Promise<string> {
  return new Promise<string>((resolve, reject): void => {
    const codeNotFountMessage = 'No code found.';
    if (code.length === 0) reject(codeNotFountMessage);
    try {
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
    } catch (error) {
      reject(error);
    }
  });
}

export { generateTemplate };
