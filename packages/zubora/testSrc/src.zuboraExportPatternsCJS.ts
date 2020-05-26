const testCases: { [key: string]: { code: string; expected: string } } = {
  'module.exports': {
    code: `function firstName() { return 'Wataru' };
      function lastName() { return 'Oguchi' };
      module.exports = { firstName, lastName }`,
    expected: `import * as test from "./test.ts";
      describe("test", function() {
        describe("test", function() {
          it("", function() {
            // TODO Write test for test
          });
        });
      });`,
  },
  'module.exports.default': {
    code: `function firstName() { return 'Wataru' };
      function lastName() { return 'Oguchi' };
      module.exports.default = { firstName, lastName }`,
    expected: `import test from "./test.ts";
      describe("test", function() {
        describe("test", function() {
          it("", function() {
            // TODO Write test for test
          });
        });
      });`,
  },
  'module.exports.named': {
    code: `function firstName() { return 'Wataru' };
      function lastName() { return 'Oguchi' };
        module.exports.person = { firstName, lastName }`,
    expected: `import { person } from "./test.ts";
      describe("person", function() {
        describe("person", function() {
          it("", function() {
            // TODO Write test for person
          });
        });
      });`,
  },
};
export default testCases;
