import { GluegunToolbox } from 'gluegun';
import * as figlet from 'figlet';

module.exports = {
  name: 'zubora',
  run: async (toolbox: GluegunToolbox): Promise<void> => {
    const { print } = toolbox;
    print.info(figlet.textSync('Zubora', { horizontalLayout: 'full' }));
    print.info("Hi, lazy hackers!\nLet's start with `zubora --help`\n");
  },
};
