import prettier from 'prettier';
import { isFile, File } from '@babel/types';
import { transformer } from './transformer';
import { traverser } from './traverser';
import { template } from './template';

function buildNewContent(srcPath: string, destPath: string, ast: File): string {
  const { exportedModules, classObjects } = traverser(ast);
  const generateTemplate = template(srcPath, destPath);
  return prettier.format(generateTemplate(exportedModules, classObjects), {
    parser: 'babel',
  });
}

async function zubora(
  srcPath: string,
  destPath: string,
  code: string
): Promise<string> {
  const result = await transformer(srcPath)(code);
  if (result && typeof result.code === 'string' && isFile(result.ast)) {
    const { ast } = result;
    const content = buildNewContent(srcPath, destPath, ast);
    return content;
  } else {
    return '// Hmm.. Something is wrong.';
  }
}
export { zubora };
