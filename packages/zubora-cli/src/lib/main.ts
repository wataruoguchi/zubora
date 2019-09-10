import { parse } from './parse';
import * as prettier from 'prettier';
import { importBlock, testCaseBlock } from './template';

function errorHandler(error: any) {
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
  return { error: errString, result: '' };
}

function generateTemplate(
  path: string,
  reader: Function
): { error?: string; result: string } {
  if (typeof reader !== 'function') {
    return errorHandler('File reader is not a function.');
  }
  let srcContent;
  try {
    srcContent = reader(path);
  } catch (error) {
    return errorHandler(error);
  }
  const { exposedNames, classObjects } = parse(srcContent);
  const imports = importBlock(path, exposedNames);
  const describes = testCaseBlock(exposedNames, classObjects);
  return {
    result: prettier.format(`
    ${imports}\n
    ${describes}
  `),
  };
}

export { generateTemplate };
