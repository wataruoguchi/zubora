import { transpileWithPlugins } from './transpiler';
import { zubora } from 'zubora';

async function generate(
  srcPath: string,
  destPath: string,
  rawCode: string
): Promise<string> {
  const code: string = await transpileWithPlugins(rawCode);
  if (code.length === 0) throw new Error('No code found.');
  return zubora(srcPath, destPath, code);
}

export { generate };
