import * as fs from 'fs';
import yargs from 'yargs';
import figlet from 'figlet';
import { generate } from './lib/generator';

function exists(path: string): string | false {
  try {
    if (fs.existsSync(path)) {
      const stat = fs.lstatSync(path);
      return stat.isDirectory() ? 'directory' : 'file';
    }
    return false;
  } catch {
    return false;
  }
}

function read(path: string): string {
  return fs.readFileSync(path, 'utf8');
}
function write(path: string, content: string): void {
  return fs.writeFileSync(path, content);
}
function getVersions(): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cliVersion = require('../package.json').version;
  const zuboraVersion = require('zubora/package.json').version;
  return `Zubora CLI   v.${cliVersion}
Zubora Core  v.${zuboraVersion}`;
}
/**
 * Create the cli and kick it off
 */
async function run(): Promise<void> {
  // create a CLI runtime
  const usage = 'Usage: --src <src file path> --dest <test file path>';
  const welcome = `${figlet.textSync('Zubora', { horizontalLayout: 'full' })}\n
    Hi, lazy hackers!\n${usage}`;

  const argv = yargs.version(getVersions()).usage(usage).argv;
  if (
    !(
      argv.src &&
      argv.dest &&
      typeof argv.src === 'string' &&
      typeof argv.dest === 'string'
    )
  ) {
    console.log(welcome);
    return;
  }

  const srcPath: string = `${argv.src}` || '';
  const destPath: string = `${argv.dest}` || '';
  if (exists(srcPath) !== 'file') {
    console.error(`Couldn't find the file.`);
    return;
  }
  if (exists(destPath)) {
    console.error(`The file "${destPath}" already exists.`);
    return;
  }

  try {
    const rawCode = read(srcPath) || '';
    const result = await generate(srcPath, destPath, rawCode);
    console.debug(result);
    write(destPath, result);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { run };
