import { cosmiconfig } from 'cosmiconfig';

type Config = {
  plugins: string[];
};

export async function getConfig(dir: string = process.cwd()): Promise<Config> {
  const defaultConfig: Config = {
    plugins: [],
  };
  const explorer = cosmiconfig('zubora');
  const { config = {} } = (await explorer.search(dir)) || {};

  return { ...defaultConfig, ...config };
}
