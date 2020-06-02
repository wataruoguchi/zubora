import { zubora } from '../src/index';
import prettier from 'prettier';
function prettierFormat(str: string): string {
  try {
    return prettier.format(str, { parser: 'babel' });
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

describe('index.ts', () => {
  describe('zubora', () => {
    it('fails with parse errors', async () => {
      await zubora('./test.js', './test.js', 'test', 'const a = 1;').catch(
        error => {
          expect(error.message).toMatch('Unexpected token');
        }
      );
      await zubora('./test.js', './test.js', 'test', 'const a = 1;').catch(
        error => {
          expect(error.message).toMatch('Unexpected token');
        }
      );
      await zubora('', '', '', 'const a = 1; export default a;').catch(
        error => {
          expect(error.message).toMatch('Unexpected token');
        }
      );
      await zubora(
        './test.js',
        'test.js',
        'test',
        'const a = 1; export default a;'
      ).catch(error => {
        expect(error.message).toMatch(
          'The only valid meta property for import is import.meta'
        );
      });
      await zubora(
        './test.ts',
        './test.ts',
        'test',
        'const a: number = 1; export default a;'
      ).catch(error => {
        expect(error.message).toMatch(
          'The only valid meta property for import is import.meta'
        );
      });
      await zubora(
        './test.js',
        './test.js',
        'test',
        'const a: number = 1; export default a;'
      ).catch(error => {
        expect(error.message).toMatch('Unexpected token');
      });
    });
    it('does not fail with TS', async () => {
      const expected = `
      import test from "./test";
      describe("test", function () {
        describe("test", function () {
          it("", function () {
            // TODO Write test for test
          });
        });
      });
      `;
      await zubora(
        './test.ts',
        './test.ts',
        'test',
        'const a = 1; export default a;'
      )
        .then(result => {
          expect(result).toBe(prettierFormat(expected));
        })
        .catch(error => {
          expect(false).toBeTruthy();
          console.error(error);
        });
      await zubora(
        './test.ts',
        './test.ts',
        'test',
        'const a: number = 1; export default a;'
      )
        .then(result => {
          expect(result).toBe(prettierFormat(expected));
        })
        .catch(error => {
          expect(false).toBeTruthy();
          console.error(error);
        });
    });
    it('does not fail with TSX', async () => {
      const expected = `
      import test from "./test";
    describe("test", function () {
      describe("test", function () {
        it("", function () {
          // TODO Write test for test
        });
      });
    });`;
      await zubora(
        './test.tsx',
        './test.tsx',
        'test',
        'const a: number = 1; export default a;'
      )
        .then(result => {
          expect(result).toBe(prettierFormat(expected));
        })
        .catch(error => {
          expect(false).toBeTruthy();
          console.error(error);
        });
    });
    it('does not fail with JS', async () => {
      const expected = `
      import test from "./test";
    describe("test", function () {
      describe("test", function () {
        it("", function () {
          // TODO Write test for test
        });
      });
    });
`;
      await zubora(
        './test.js',
        './test.ts',
        'test',
        'const a = 1; export default a;'
      )
        .then(result => {
          expect(result).toBe(prettierFormat(expected));
        })
        .catch(error => {
          expect(false).toBeTruthy();
          console.error(error);
        });
    });
  });
});
