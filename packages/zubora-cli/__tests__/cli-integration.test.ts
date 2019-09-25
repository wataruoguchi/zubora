import { system, filesystem } from 'gluegun';

const src = filesystem.path(__dirname, '..');

const cli = async (cmd: string): Promise<string> =>
  system.run('node ' + filesystem.path(src, 'bin', 'zubora') + ` ${cmd}`);

test('outputs version', async () => {
  const output = await cli('--version');
  expect(output).toContain('0.0.2');
});

test('outputs help', async () => {
  const output = await cli('--help');
  expect(output).toContain('0.0.2');
});
