import prettier from 'prettier';
import { isFile, File } from '@babel/types';
import { transformer } from './transformer';
import { traverser } from './traverser';
import { template } from './template';

function buildNewContent(
  srcPath: string,
  destPath: string,
  ast: File,
  code: string
): string {
  const { exportedModules, classObjects } = traverser(ast);
  if (!exportedModules) {
    throw new Error(
      `exportedModules got lost. ${JSON.stringify(exportedModules)} ${code}`
    );
  }
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
    const { code, ast } = result;
    const content = buildNewContent(srcPath, destPath, ast, code);
    return content;
  } else {
    return '// Hmm.. Something is wrong.';
  }
}
export { zubora };
