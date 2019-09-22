import { GluegunToolbox } from 'gluegun';
import { generateTemplate } from '../lib/main';

module.exports = {
  name: 'make',
  description:
    'Read a JS file and generate a test file.\nUsage: $ zubora make <source> <destination>',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const {
      parameters,
      print,
      filesystem: { read, exists, write },
    } = toolbox;
    const srcPath = parameters.first || '';
    const destPath = parameters.second || '';
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
    await generateTemplate(srcPath, destPath, read)
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
