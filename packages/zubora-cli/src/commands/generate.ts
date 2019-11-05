import { GluegunToolbox } from 'gluegun';
import { generateTemplate } from '../lib/main';
import { getConfig } from '../lib/getConfig';
import * as resolve from 'resolve';

// ~/webdev/namakemono/zubora/packages/zubora-cli/bin/zubora

module.exports = {
  name: 'generate',
  alias: ['gen'],
  description:
    'Read a JS file and generate a test file.\nUsage: $ zubora generate <source> <destination>',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const {
      parameters: { first, second },
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
    const rawCode = read(srcPath) || '';

    const { plugins = [] } = await getConfig();
    async function codeThroughPlugins(rawCode: string): Promise<string> {
      const loadedPlugins = new Map();
      await Promise.all(
        plugins.map(async (pluginName: string) => {
          // Load plugins
          const filePath = await resolve.sync(pluginName, {
            basedir: process.cwd(),
          });
          if (!filePath)
            throw new Error(
              `Plugin ${pluginName} does not exist. Please try "npm install -D ${pluginName}"`
            );
          const plugin = await import(filePath);
          loadedPlugins.set(
            pluginName,
            typeof plugin === 'object' && typeof plugin.default === 'function'
              ? plugin.default
              : function(code: string): string {
                  return code;
                }
          );
          return;
        })
      );
      const code = plugins.reduce((code: string, pluginName: string) => {
        try {
          if (loadedPlugins.get(pluginName))
            return loadedPlugins.get(pluginName)(code);
        } catch (error) {
          console.log('plugin error', error);
          return code;
        }
      }, rawCode);
      return code;
    }
    const code: string = await codeThroughPlugins(rawCode);

    return generateTemplate(srcPath, destPath, code)
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
