import prettier from 'prettier';
import { isFile, File } from '@babel/types';
import { transformer } from './transformer';
import { traverser } from './traverser';
import { template } from './template';

function buildNewContent(
  relativePath: string,
  fileName: string,
  ast: File
): string {
  const { exportedModules, classObjects } = traverser(ast);
  const generateTemplate = template(relativePath, fileName);
  return prettier.format(generateTemplate(exportedModules, classObjects), {
    parser: 'babel',
  });
}

async function zubora(
  srcPath: string,
  relativePath: string,
  fileName: string,
  code: string
): Promise<string> {
  const result = await transformer(srcPath)(code);
  if (result && typeof result.code === 'string' && isFile(result.ast)) {
    const { ast } = result;
    const content = buildNewContent(relativePath, fileName, ast);
    return content;
  } else {
    return '// Hmm.. Something is wrong.';
  }
}
export { zubora };
