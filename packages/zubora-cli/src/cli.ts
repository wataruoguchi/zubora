import { build, GluegunToolbox } from 'gluegun';

/**
 * Create the cli and kick it off
 */
// TODO The type of 'argv'. I'm guessing it's string, but maybe not.
async function run(argv: string): Promise<GluegunToolbox> {
  // create a CLI runtime
  const cli = build()
    .brand('zubora')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'zubora-*', hidden: true })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create();

  // and run it
  const toolbox = await cli.run(argv);

  // send it back (for testing, mostly)
  return toolbox;
}

module.exports = { run };
