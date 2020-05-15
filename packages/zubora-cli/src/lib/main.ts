import * as prettier from 'prettier';
import { transpileWithPlugins } from './transpiler';
import { transformer } from './transformer';
import { parser, template } from 'zubora';

async function generateTemplate(
  srcPath: string,
  destPath: string,
  rawCode: string
): Promise<string> {
  const code: string = await transpileWithPlugins(rawCode);
  const codeNotFountMessage = 'No code found.'; // TODO - Each error should have a unique message.
  if (code.length === 0) throw new Error(codeNotFountMessage);

  const result = await transformer(srcPath)(code);
  if (result && typeof result.code === 'string') {
    const { code } = result;
    const { moduleExports, classObjects } = parser(code);
    const generateTemplate = template(srcPath, destPath);
    return prettier.format(generateTemplate(moduleExports, classObjects), {
      parser: 'babel',
    });
  } else {
    return `// Hmm.. ${codeNotFountMessage}`;
  }
}

export { generateTemplate };
