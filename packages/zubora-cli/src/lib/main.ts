import * as prettier from 'prettier';
import { transformAsync } from '@babel/core';
import { parser } from './parser';
import { importBlock, testCaseBlock } from './template';

async function generateTemplate(
  path: string,
  reader: Function,
  write?: any
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (typeof reader !== 'function') {
      reject('File reader is not a function.');
    }
    try {
      const code: string = reader(path);
      // Babel
      const option = {};
      transformAsync(code, option)
        .then((result): void => {
          const { code } = result || { code: '' };
          if (typeof code === 'string') {
            write('code.js', code);
            const { moduleExports, classObjects } = parser(code);
            const imports = importBlock(path, moduleExports);
            const describes = testCaseBlock(moduleExports, classObjects);
            resolve(prettier.format(`${imports}\n${describes}`));
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
