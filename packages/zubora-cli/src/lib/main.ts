import { parse } from './parse';
import * as prettier from 'prettier';
import { importBlock, testCaseBlock } from './template';
import { transformAsync } from '@babel/core';

function errorHandler(error: any): string {
  let errString = '';
  if (typeof error !== 'object') {
    try {
      errString = JSON.stringify(error);
    } catch (err) {
      errString = 'JSON parse error.';
    }
  } else if (typeof error === 'string') {
    errString = error;
  }
  return errString;
}

async function generateTemplate(
  path: string,
  reader: Function
): Promise<string> {
  if (typeof reader !== 'function') {
    return new Promise<string>((reject): void =>
      reject(errorHandler('File reader is not a function.'))
    );
  }
  let srcContent: string;
  try {
    srcContent = reader(path);
    // Babel
    // TODO Babel option can be from .babelrc
    const option = {};
    await transformAsync(srcContent, option).then((result): void => {
      srcContent = result ? result.code || '' : '';
    });
  } catch (error) {
    return new Promise<string>((reject): void => reject(errorHandler(error)));
  }
  const { exposedNames, classObjects } = parse(srcContent);
  const imports = importBlock(path, exposedNames);
  const describes = testCaseBlock(exposedNames, classObjects);
  return new Promise<string>((resolve): void => {
    resolve(prettier.format(`${imports}\n${describes}`));
  });
}

export { generateTemplate };
