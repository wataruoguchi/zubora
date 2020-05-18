// CommonJS module.exports patterns
import { zubora } from '../src/index';

describe('export', () => {
  describe('CommonJS', () => {
    it('module.exports', async () => {
      const code = `
          function firstName() { return 'Wataru' };
          function lastName() { return 'Oguchi' };
          module.exports = { firstName, lastName }
`;
      const expectedContent = `import * as test from "./test.ts";
describe("test", function() {
  describe("test", function() {
    it("", function() {
      // TODO Write test for test
    });
  });
});
`;
      await zubora('./test.ts', './test.spec.ts', code).then(result => {
        expect(result).toBe(expectedContent);
      });
    });
    it('module.exports.default', async () => {
      const code = `
          function firstName() { return 'Wataru' };
          function lastName() { return 'Oguchi' };
          module.exports.default = { firstName, lastName }
`;
      const expectedContent = `import test from "./test.ts";
describe("test", function() {
  describe("test", function() {
    it("", function() {
      // TODO Write test for test
    });
  });
});
`;
      await zubora('./test.ts', './test.spec.ts', code).then(result => {
        expect(result).toBe(expectedContent);
      });
    });
    it('module.exports.named', async () => {
      const code = `
          function firstName() { return 'Wataru' };
          function lastName() { return 'Oguchi' };
          module.exports.person = { firstName, lastName }
`;
      const expectedContent = `import { person } from "./test.ts";
describe("person", function() {
  describe("person", function() {
    it("", function() {
      // TODO Write test for person
    });
  });
});
`;
      await zubora('./test.ts', './test.spec.ts', code).then(result => {
        expect(result).toBe(expectedContent);
      });
    });
  });
});
