import prettier from 'prettier';
import { isFile, File } from '@babel/types';
import { transformer } from './transformer';
import { traverser } from './traverser';
import { template } from './template';
import { parser } from './parser';

function buildNewContent(srcPath: string, destPath: string, ast: File): string {
  const { moduleExports, classObjects } = traverser(ast);
  const generateTemplate = template(srcPath, destPath);
  return prettier.format(generateTemplate(moduleExports, classObjects), {
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
    // TODO Let's see the difference. ast vs ast2. It looks like they are different, but not sure how it affects. Probably we only need ast so we can remove parser.
    const ast2 = parser(code);
    let content = buildNewContent(srcPath, destPath, ast);
    content += buildNewContent(srcPath, destPath, ast2);
    return content;
  } else {
    return '// Hmm.. Something is wrong.';
  }
}
export { zubora };
