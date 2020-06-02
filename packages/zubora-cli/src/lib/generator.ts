import { transpileWithPlugins } from './transpiler';
import { getRelativePath, getFileName } from './resolver';
import { zubora } from 'zubora';

async function generate(
  srcPath: string,
  destPath: string,
  rawCode: string
): Promise<string> {
  const code: string = await transpileWithPlugins(rawCode);
  if (code.length === 0) throw new Error('No code found.');
  const relativePath = getRelativePath(srcPath, destPath);
  const fileName = getFileName(relativePath);
  return zubora(srcPath, relativePath, fileName, code);
}

export { generate };
