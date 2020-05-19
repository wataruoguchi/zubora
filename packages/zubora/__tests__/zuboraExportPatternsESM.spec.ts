// Covering patterns introduced in https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
/**
 * // Exporting individual features
 * [ ] 01. export let name1, name2, …, nameN; // also var, const
 * [x] 01a. TODO: I don't think we want to test this pattern. DO NOTHING.
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

describe('export', () => {
  describe('The ES Module (ESM) format', () => {
    describe('named exports', () => {
      it('CASE 01. export let name1, name2, …, nameN; // also var, const', () => {
        expect('I can not think of test cases for this pattern.').toBeTruthy();
      });
      it('CASE 02. export let name1 = …, name2 = …, …, nameN; // also var, const', async () => {
        const code = `
          export const firstName = function() { return 'Wataru' }, lastName = function() { return 'Oguchi' };
`;
        const expectedContent = `import { firstName, lastName } from "./test.ts";
describe("firstName", function() {
  describe("firstName", function() {
    it("", function() {
      // TODO Write test for firstName
    });
  });
});
describe("lastName", function() {
  describe("lastName", function() {
    it("", function() {
      // TODO Write test for lastName
    });
  });
});
`;
        await zubora('./test.ts', './test.spec.ts', code).then(result => {
          expect(result).toBe(expectedContent);
        });
      });
      it('CASE 03. export function functionName(){...}', async () => {
        const code = `
          export function person() {
            return {
              firstName() {
                return 'Wataru';
              },
              lastName() {
                return 'Oguchi';
              },
            };
          }
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
      it('CASE 04. export class ClassName {...}', async () => {
        const code = `
          export class Person {
            constructor() {}
            firstName() {
              return 'Wataru';
            }
            lastName() {
              return 'Oguchi';
            }
          }
`;
        const expectedContent = `import { Person } from "./test.ts";
describe("Person", function() {
  describe("#constructor", function() {
    it("", function() {
      // TODO Write test for Person#constructor
    });
  });
  describe("#firstName", function() {
    it("", function() {
      // TODO Write test for Person#firstName
    });
  });
  describe("#lastName", function() {
    it("", function() {
      // TODO Write test for Person#lastName
    });
  });
});
`;
        await zubora('./test.ts', './test.spec.ts', code).then(result => {
          expect(result).toBe(expectedContent);
        });
      });
      it('CASE 05. Export list', async () => {
        const code = `
            function greeter(person) {
              return 'Hello, ' + person;
            }
            function greeterJa(person) {
              return 'こんにちは, ' + person;
            }
            export { greeter, greeterJa };
`;
        const expectedContent = `import { greeter, greeterJa } from "./test.ts";
describe("greeter", function() {
  describe("greeter", function() {
    it("", function() {
      // TODO Write test for greeter
    });
  });
});
describe("greeterJa", function() {
  describe("greeterJa", function() {
    it("", function() {
      // TODO Write test for greeterJa
    });
  });
});
`;
        await zubora('./test.ts', './test.spec.ts', code).then(result => {
          expect(result).toBe(expectedContent);
        });
      });
      it('CASE 06. Renaming exports', async () => {
        const code = `
      function greeter(person) {
        return 'Hello, ' + person;
      }
      export { greeter as greet};
`;
        const expectedContent = `import { greet } from "./test.ts";
describe("greet", function() {
  describe("greet", function() {
    it("", function() {
      // TODO Write test for greet
    });
  });
});
`;
        await zubora('./test.ts', './test.spec.ts', code).then(result => {
          expect(result).toBe(expectedContent);
        });
      });
      it('CASE 07. Exporting destructured assignments with renaming', async () => {
        const code = `
        const person = {
          firstName: function() {
            return 'Wataru';
          },
          lastName: function() {
            return 'Oguchi';
          },
        };
        export const { firstName, sirName: lastName } = person;
`;
        const expectedContent = `import { firstName, sirName } from "./test.ts";
describe("firstName", function() {
  describe("firstName", function() {
    it("", function() {
      // TODO Write test for firstName
    });
  });
});
describe("sirName", function() {
  describe("sirName", function() {
    it("", function() {
      // TODO Write test for sirName
    });
  });
});
`;
        await zubora('./test.ts', './test.spec.ts', code).then(result => {
          expect(result).toBe(expectedContent);
        });
      });
    });
    describe('default exports', () => {
      it('CASE 08. export default expression;', async () => {
        const code = `
          function firstName() { return 'Wataru' }
          export default firstName;
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
      it('CASE 09. export default function (…) { … } // also class, function*', async () => {
        const code = `
          export default function () { return 'noname' };
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
      it('CASE 09. export default class ClassName { … }', async () => {
        const code = `
          export default class Person {
            constructor() {}
            firstName() {return 'Wataru'}
            lastName() {return 'Oguchi'}
          };
`;
        const expectedContent = `import test from "./test.ts";
describe("Person", function() {
  describe("#constructor", function() {
    it("", function() {
      // TODO Write test for test#constructor
    });
  });
  describe("#firstName", function() {
    it("", function() {
      // TODO Write test for test#firstName
    });
  });
  describe("#lastName", function() {
    it("", function() {
      // TODO Write test for test#lastName
    });
  });
});
`;
        await zubora('./test.ts', './test.spec.ts', code).then(result => {
          expect(result).toBe(expectedContent);
        });
      });
      it('CASE 10. export default function name1(…) { … } // also class, function*', async () => {
        const code = `
          export default function firstName() { return 'Wataru' };
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
      it('CASE 11. export { name1 as default, … };', async () => {
        const code = `
          function firstName() { return 'Wataru' };
          function lastName() { return 'Oguchi' };
          export { firstName as default, lastName }
`;
        const expectedContent = `import test, { lastName } from "./test.ts";
describe("test", function() {
  describe("test", function() {
    it("", function() {
      // TODO Write test for test
    });
  });
});
describe("lastName", function() {
  describe("lastName", function() {
    it("", function() {
      // TODO Write test for lastName
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
});
