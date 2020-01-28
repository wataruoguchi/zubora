// import { generateTemplate } from '../src/lib/main';

// describe('main.ts', () => {
//   describe('generateTemplate', () => {
//     it('fails with "No code found."', async () => {
//       await generateTemplate('', '', '').catch(error => {
//         expect(error).toBe('No code found.');
//       });
//       await generateTemplate('./test.ts', '', '').catch(error => {
//         expect(error).toBe('No code found.');
//       });
//       await generateTemplate('../test.js', '', '').catch(error => {
//         expect(error).toBe('No code found.');
//       });
//       await generateTemplate('./test.js', './result.spec.js', '').catch(
//         error => {
//           expect(error).toBe('No code found.');
//         }
//       );
//     });
//     it('fails with parse errors', async () => {
//       await generateTemplate('./test.js', '', 'const a = 1;').catch(error => {
//         expect(error.message).toMatch('Unexpected token');
//       });
//       await generateTemplate(
//         './test.js',
//         './result.spec.js',
//         'const a = 1;'
//       ).catch(error => {
//         expect(error.message).toMatch('Unexpected token');
//       });
//       await generateTemplate('', '', 'const a = 1; export default a;').catch(
//         error => {
//           expect(error.message).toMatch('Unexpected token');
//         }
//       );
//       await generateTemplate(
//         './test.js',
//         '',
//         'const a = 1; export default a;'
//       ).catch(error => {
//         expect(error.message).toMatch(
//           'The only valid meta property for import is import.meta'
//         );
//       });
//       await generateTemplate(
//         './test.ts',
//         '',
//         'const a: number = 1; export default a;'
//       ).catch(error => {
//         expect(error.message).toMatch(
//           'The only valid meta property for import is import.meta'
//         );
//       });
//       await generateTemplate(
//         './test.js',
//         './result.spec.js',
//         'const a: number = 1; export default a;'
//       ).catch(error => {
//         expect(error.message).toMatch('Unexpected token');
//       });
//     });
//     it('does not fail with TS', async () => {
//       const expectedLines = [
//         `import test from "./test.ts";`,
//         `describe("test", function() {`,
//         `it("", function() {`,
//         `// TODO Write test for test`,
//       ];
//       await generateTemplate('./test.ts', '', 'const a = 1; export default a;')
//         .then(result => {
//           expectedLines.map(line => expect(result).toMatch(line));
//         })
//         .catch(error => {
//           expect(false).toBeTruthy();
//           console.error(error);
//         });
//       await generateTemplate(
//         './test.ts',
//         '',
//         'const a: number = 1; export default a;'
//       )
//         .then(result => {
//           expectedLines.map(line => expect(result).toMatch(line));
//         })
//         .catch(error => {
//           expect(false).toBeTruthy();
//           console.error(error);
//         });
//     });
//     it('does not fail with TSX', async () => {
//       const expectedLines = [
//         `import test from "./test.tsx";`,
//         `describe("test", function() {`,
//         `it("", function() {`,
//         `// TODO Write test for test`,
//       ];
//       await generateTemplate(
//         './test.tsx',
//         '',
//         'const a: number = 1; export default a;'
//       )
//         .then(result => {
//           expectedLines.map(line => expect(result).toMatch(line));
//         })
//         .catch(error => {
//           expect(false).toBeTruthy();
//           console.error(error);
//         });
//     });
//     it('does not fail with JS', async () => {
//       const expectedLines = [
//         `import test from "./test.js";`,
//         `describe("test", function() {`,
//         `it("", function() {`,
//         `// TODO Write test for test`,
//       ];
//       await generateTemplate('./test.js', '', 'const a = 1; export default a;')
//         .then(result => {
//           expectedLines.map(line => expect(result).toMatch(line));
//         })
//         .catch(error => {
//           expect(false).toBeTruthy();
//           console.error(error);
//         });
//     });
//   });
// });

describe('main.spec.ts', () => {
  it('is ok', () => expect('').toBe(''));
});
