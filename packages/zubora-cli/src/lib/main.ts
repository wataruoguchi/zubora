import * as prettier from 'prettier';
import { transformAsync } from '@babel/core';
const presetTypeScript = require('@babel/preset-typescript').default;
import { parser, template, getFileExt } from 'zubora';

async function generateTemplate(
  srcPath: string,
  destPath: string,
  code: string
): Promise<string> {
  return new Promise<string>((resolve, reject): void => {
    try {
      // Babel
      const presets: string[] = /\.tsx?$/.test(getFileExt(srcPath))
        ? [presetTypeScript]
        : [];
      const option = { filename: srcPath, presets };
      transformAsync(code, option)
        .then((result): void => {
          const { code } = result || { code: '' };
          if (typeof code === 'string' && code.length) {
            const { moduleExports, classObjects } = parser(code);
            const generateTemplate = template(srcPath, destPath);
            resolve(
              prettier.format(generateTemplate(moduleExports, classObjects), {
                parser: 'babel',
              })
            );
          } else {
            reject('No code found.');
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
