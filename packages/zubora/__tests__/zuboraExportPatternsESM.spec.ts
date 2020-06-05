// Covering patterns introduced in https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
/**
 * // Exporting individual features
 * [ ] 01. export let name1, name2, …, nameN; // also var, const
 * [x] 01a. I don't think we want to test this pattern. DO NOTHING.
 * [x] 02. export let name1 = …, name2 = …, …, nameN; // also var, const
 * [x] 03. export function functionName(){...}
 * [x] 04. export class ClassName {...}
 * [ ] 04a. TODO: I want to test class methods.
 *
 * // Export list
 * [x] 05. export { name1, name2, …, nameN };
 *
 * // Renaming exports
 * [x] 06. export { variable1 as name1, variable2 as name2, …, nameN };
 *
 * // Exporting destructured assignments with renaming
 * [x] 07. export const { name1, name2: bar } = o;
 *
 * // Default exports
 * [x] 08. export default expression;
 * [x] 09. export default function (…) { … } // also class, function*
 * [x] 10. export default function name1(…) { … } // also class, function*
 * [x] 11. export { name1 as default, … };
 *
 * // Aggregating modules
 * [ ] 12. export * from …; // does not set the default export
 * [x] 12a. TODO: PENDING. It this the pattern we want to write tests for?
 * [ ] 13. export * as name1 from …;
 * [x] 13a. TODO: PENDING. It this the pattern we want to write tests for?
 * [ ] 14. export { name1, name2, …, nameN } from …;
 * [x] 14a. TODO: PENDING. It this the pattern we want to write tests for?
 * [ ] 15. export { import1 as name1, import2 as name2, …, nameN } from …;
 * [x] 15a. TODO: PENDING. It this the pattern we want to write tests for?
 * [ ] 16. export { default } from …;
 * [x] 16a. TODO: PENDING. It this the pattern we want to write tests for?
 */
import { zubora } from '../src/index';
import prettier from 'prettier';
import testCases from '../testSrc/src.zuboraExportPatternsESM';

type ioTestInput = { code: string; expected: string };
async function ioTest({ code, expected }: ioTestInput): Promise<void> {
  const result = await zubora('./test.ts', './test.ts', 'test', code);
  expect(prettier.format(result, { parser: 'babel' })).toBe(
    prettier.format(expected, { parser: 'babel' })
  );
}

describe('export', () => {
  describe('The ES Module (ESM) format', () => {
    describe('named exports', () => {
      it('CASE 01. export let name1, name2, …, nameN; // also var, const', () => {
        expect('I can not think of test cases for this pattern.').toBeTruthy();
      });
      it('CASE 02. export let name1 = …, name2 = …, …, nameN; // also var, const', async () => {
        await ioTest(testCases['0200']);
      });
      it('CASE 03. export function functionName(){...}', async () => {
        await ioTest(testCases['0300']);
      });
      it('CASE 04. export class ClassName {...}', async () => {
        await ioTest(testCases['0400']);
      });
      it('CASE 05. Export list', async () => {
        await ioTest(testCases['0500']);
      });
      it('CASE 06. Renaming exports', async () => {
        await ioTest(testCases['0600']);
      });
      it('CASE 07. Exporting destructured assignments with renaming', async () => {
        await ioTest(testCases['0700']);
      });
    });
    describe('default exports', () => {
      it('CASE 08. export default expression;', async () => {
        await ioTest(testCases['0800']);
      });
      it('CASE 09. export default function (…) { … } // also class, function*', async () => {
        await ioTest(testCases['0900']);
      });
      it('CASE 09. export default class ClassName { … }', async () => {
        await ioTest(testCases['0901']);
      });
      it('CASE 10. export default function name1(…) { … } // also class, function*', async () => {
        await ioTest(testCases['1000']);
      });
      it('CASE 11. export { name1 as default, … };', async () => {
        await ioTest(testCases['1100']);
      });
    });
  });
});
