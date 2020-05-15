/**
 * Transpiler
 * Transpile code with specified plugins. TypeScript & JavaScript are supported by default.
 * With `zubora-plugin-coffee`, we can support CoffeeScript. Please see README for more details.
 */
import { getConfig } from './getConfig';
import resolve from 'resolve';

type loadedPlugin = {
  name: string;
  transpiler: (code: string) => string;
};

/**
 * _loadPlugin
 * Load a zubora plugin
 * @param pluginName
 */
async function _loadPlugin(pluginName: string): Promise<loadedPlugin> {
  const filePath = resolve.sync(pluginName, {
    basedir: process.cwd(),
  });
  if (!filePath)
    throw new Error(
      `Plugin ${pluginName} does not exist. Please try "npm install -D ${pluginName}"`
    );
  const plugin = await import(filePath);
  return {
    name: pluginName,
    transpiler:
      typeof plugin === 'object' && typeof plugin.default === 'function'
        ? plugin.default
        : function(code: string): string {
            return code;
          },
  };
}

/**
 * _transpile
 * Transpile code with a zubora plugin
 * @param code
 * @param loadedPlugin
 */
function _transpile(code: string, loadedPlugin: loadedPlugin): string {
  try {
    if (typeof loadedPlugin.transpiler === 'function') {
      return loadedPlugin.transpiler(code);
    } else {
      return code;
    }
  } catch (error) {
    throw new Error(
      `Zubora plugin should be a function. However, ${
        loadedPlugin.name
      } is ${typeof loadedPlugin.transpiler}`
    );
  }
}

/**
 *
 * @param rawCode
 * @returns Transpiled code
 */
async function transpileWithPlugins(rawCode: string): Promise<string> {
  const { plugins = [] } = await getConfig();
  const loadedPlugins: loadedPlugin[] = await Promise.all(
    plugins.map(_loadPlugin)
  );
  const code = loadedPlugins.reduce(_transpile, rawCode);
  return code;
}

export { transpileWithPlugins };
