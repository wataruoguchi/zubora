import * as prettier from 'prettier';
import { transformAsync } from '@babel/core';
const presetTypeScript = require('@babel/preset-typescript').default;
import { parser, getRelativePath, importBlock, testCaseBlock } from 'zubora';

async function generateTemplate(
  srcPath: string,
  destPath: string,
  code: string
): Promise<string> {
  return new Promise<string>((resolve, reject): void => {
    try {
      // Babel
      const option = { filename: srcPath, presets: [presetTypeScript] };
      transformAsync(code, option)
        .then((result): void => {
          const { code } = result || { code: '' };
          if (typeof code === 'string' && code.length) {
            const relativePath = getRelativePath(srcPath, destPath);
            const { moduleExports, classObjects } = parser(code);
            const imports = importBlock(relativePath, moduleExports);
            const describes = testCaseBlock(
              relativePath,
              moduleExports,
              classObjects
            );
            resolve(
              prettier.format(`${imports}\n${describes}`, { parser: 'babel' })
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
