const testCases: { [key: string]: { code: string; expected: string } } = {
  '0200': {
    code: `export const firstName = function() { return 'Wataru' }, lastName = function() { return 'Oguchi' }, asyncFunc = async function() { return await 'async' };`,
    expected: `import { firstName, lastName, asyncFunc } from "./test.ts";
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
      describe("asyncFunc", function() {
        describe("asyncFunc", function() {
          it("", async function() {
            // TODO Write test for asyncFunc
          });
        });
      });`,
  },
  '0300': {
    code: `export function person() {
      return {
        firstName() {
          return 'Wataru';
        },
        lastName() {
          return 'Oguchi';
        },
        async asyncFunc() {
          return await 'asyncFunc';
        },
      };
    }`,
    expected: `import { person } from "./test.ts";
      describe("person", function() {
        describe("person", function() {
          it("", function() {
            // TODO Write test for person
          });
        });
      });`,
  },
  '0400': {
    code: `export class Person {
      constructor() {}
      firstName() {
        return 'Wataru';
      }
      lastName() {
        return 'Oguchi';
      }
      async asyncFunc() {
        return await 'asyncFunc';
      }
    }`,
    expected: `import { Person } from "./test.ts";
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
        describe("#asyncFunc", function() {
          it("", async function() {
            // TODO Write test for Person#asyncFunc
          });
        });
      });`,
  },
  '0500': {
    code: `function greeter(person) {
        return 'Hello, ' + person;
      }
      function greeterJa(person) {
        return 'こんにちは, ' + person;
      }
      async function asyncFunc() {
        return await ' asyncFunc';
      }
      export { greeter, greeterJa, asyncFunc };`,
    expected: `import { greeter, greeterJa, asyncFunc } from "./test.ts";
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
      describe("asyncFunc", function() {
        describe("asyncFunc", function() {
          it("", async function() {
            // TODO Write test for asyncFunc
          });
        });
      });`,
  },
  '0600': {
    code: `function greeter(person) {
        return 'Hello, ' + person;
      }
      async function asyncFunc() {
        return await 'asyncFunc';
      }
      export { greeter as greet, asyncFunc as asyncFn};`,
    expected: `import { greet, asyncFn } from "./test.ts";
      describe("greet", function() {
        describe("greet", function() {
          it("", function() {
            // TODO Write test for greet
          });
        });
      });
      describe("asyncFn", function() {
        describe("asyncFn", function() {
          it("", async function() {
            // TODO Write test for asyncFn
          });
        });
      });`,
  },
  '0700': {
    code: `const person = {
        firstName: function() {
          return 'Wataru';
        },
        lastName: function() {
          return 'Oguchi';
        },
        asyncFunc: async function() {
          return await 'asyncFunc';
        }
      };
      export const { firstName, sirName: lastName, asyncFn: asyncFunc } = person;`,
    expected: `import { firstName, sirName, asyncFn } from "./test.ts";
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
      describe("asyncFn", function() {
        describe("asyncFn", function() {
          it("", async function() {
            // TODO Write test for asyncFn
          });
        });
      });`,
  },
  '0800': {
    code: `function firstName() { return 'Wataru' }
      export default firstName;`,
    expected: `import test from "./test.ts";
      describe("test", function() {
        describe("test", function() {
          it("", function() {
            // TODO Write test for test
          });
        });
      });`,
  },
  '0900': {
    code: `export default function () { return 'noname' };`,
    expected: `import test from "./test.ts";
      describe("test", function() {
        describe("test", function() {
          it("", function() {
            // TODO Write test for test
          });
        });
      });`,
  },
  '0901': {
    code: `export default class Person {
        constructor() {}
        firstName() {return 'Wataru'}
        lastName() {return 'Oguchi'}
        async asyncFunc() { return await 'async' }
      };`,
    expected: `import test from "./test.ts";
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
        describe("#asyncFunc", function() {
        it("", async function() {
          // TODO Write test for test#asyncFunc
        });
      });
    });`,
  },
  '1000': {
    code: `export default function firstName() { return 'Wataru' };`,
    expected: `import test from "./test.ts";
      describe("test", function() {
        describe("test", function() {
          it("", function() {
            // TODO Write test for test
          });
        });
      });`,
  },
  '1100': {
    code: `function firstName() { return 'Wataru' };
      function lastName() { return 'Oguchi' };
      async function asyncFunc() { return await 'asyncFunc' };
      export { firstName as default, lastName, asyncFunc }`,
    expected: `import test, { lastName, asyncFunc } from "./test.ts";
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
      describe("asyncFunc", function() {
        describe("asyncFunc", function() {
          it("", async function() {
            // TODO Write test for asyncFunc
          });
        });
      });`,
  },
};
export default testCases;
