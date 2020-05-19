import { generate } from '../src/lib/generator';

describe('generator.ts', () => {
  describe('generateTemplate', () => {
    it('fails with "No code found."', async () => {
      await generate('', '', '').catch(error => {
        expect(error.message).toBe('No code found.');
      });
      await generate('./test.ts', '', '').catch(error => {
        expect(error.message).toBe('No code found.');
      });
      await generate('../test.js', '', '').catch(error => {
        expect(error.message).toBe('No code found.');
      });
      await generate('./test.js', './result.spec.js', '').catch(error => {
        expect(error.message).toBe('No code found.');
      });
    });
  });
});
