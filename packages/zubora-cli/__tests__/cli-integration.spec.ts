import { system, filesystem } from 'gluegun';
const src = filesystem.path(__dirname, '..');
const cli = async (cmd: string): Promise<string> =>
  system.run('node ' + filesystem.path(src, 'bin', 'zubora') + ` ${cmd}`);

async function expectsContainingVersion(command: string): Promise<void> {
  const output = await cli(command);
  expect(output).toContain('0.1.0');
}

describe('CLI', () => {
  describe('nothing', () => {
    it('Welcome', async () => {
      const output = await cli('');
      expect(output).toContain('Hi, lazy hackers!');
      expect(output).toContain("Let's start with `zubora --help`");
    });
  });
  describe('output version', () => {
    it('version', async () => {
      await expectsContainingVersion('version');
    });
    it('v', async () => {
      await expectsContainingVersion('v');
    });
    it('--version', async () => {
      await expectsContainingVersion('--version');
    });
    it('--v', async () => {
      await expectsContainingVersion('--v');
    });
  });
  describe('output help', () => {
    it('help', async () => {
      await expectsContainingVersion('help');
    });
    it('h', async () => {
      await expectsContainingVersion('h');
    });
    it('--help', async () => {
      await expectsContainingVersion('--help');
    });
    it('--h', async () => {
      await expectsContainingVersion('--h');
    });
  });
  describe('generate', () => {
    it('generate', async () => {
      const output = await cli('generate Test.js Test.spec.js');
      expect(output).toContain(`Couldn't find the file.`);
    });
    it('gen (shortcut)', async () => {
      const output = await cli('gen Test.js Test.spec.js');
      expect(output).toContain(`Couldn't find the file.`);
    });
  });
});
