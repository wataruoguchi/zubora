import { GluegunToolbox } from 'gluegun';
import { generateTemplate } from '../lib/main';

module.exports = {
  name: 'generate',
  alias: ['gen'],
  description:
    'Read a JS file and generate a test file.\nUsage: $ zubora generate <source> <destination>',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const {
      parameters: { first, second, options },
      print,
      filesystem: { read, exists, write },
    } = toolbox;
    const srcPath: string = first || '';
    const destPath: string = second || '';
    if (srcPath === '') {
      print.error(`Set the source file path.`);
      return;
    }
    if (destPath === '') {
      print.error(`Set the destination file path.`);
      return;
    }
    if (exists(srcPath) !== 'file') {
      print.error(`Couldn't find the file.`);
      return;
    }
    // if (exists(destPath)) {
    //   print.error(`The file "${destPath}" already exists.`)
    //   return
    // }
    const code: string = options.code || read(srcPath);
    await generateTemplate(srcPath, destPath, code)
      .then((result): void => {
        print.debug(result);
        write(destPath, result);
        return;
      })
      .catch((error): void => {
        print.error(error);
        return;
      });
  },
};
