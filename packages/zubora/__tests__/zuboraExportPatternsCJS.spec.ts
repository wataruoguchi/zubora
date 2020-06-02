// CommonJS module.exports patterns
import { zubora } from '../src/index';
import prettier from 'prettier';
import testCases from '../testSrc/src.zuboraExportPatternsCJS';

type ioTestInput = { code: string; expected: string };
async function ioTest({ code, expected }: ioTestInput): Promise<void> {
  const result = await zubora('./test.ts', './test.ts', 'test', code);
  expect(result).toBe(prettier.format(expected, { parser: 'babel' }));
}

describe('export', () => {
  describe('CommonJS', () => {
    it('module.exports', async () => {
      await ioTest(testCases['module.exports']);
    });
    it('module.exports.default', async () => {
      await ioTest(testCases['module.exports.default']);
    });
    it('module.exports.named', async () => {
      await ioTest(testCases['module.exports.named']);
    });
  });
});
