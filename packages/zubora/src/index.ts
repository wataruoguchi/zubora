import { types } from '@babel/core';
import { transformer } from './transformer';
import { traverser } from './traverser';
import { template } from './template';

function buildNewContent(
  relativePath: string,
  fileName: string,
  ast: types.Node
): string {
  const { exportedModules, classObjects } = traverser(ast);
  const generateTemplate = template(relativePath, fileName);
  return generateTemplate(exportedModules, classObjects);
}

async function zubora(
  srcPath: string,
  relativePath: string,
  fileName: string,
  code: string
): Promise<string> {
  const result = await transformer(srcPath)(code);
  if (result && typeof result.code === 'string' && result.ast) {
    const { ast } = result;
    return buildNewContent(relativePath, fileName, ast);
  } else {
    return '// Hmm.. Something is wrong.';
  }
}
export { zubora };
