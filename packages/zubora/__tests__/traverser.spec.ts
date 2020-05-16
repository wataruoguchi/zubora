import { traverser } from '../src/traverser';
import { parser } from '../src/parser';

function testUtils(
  baseContent: string
): { testDefault: Function; testNamed: Function } {
  function testPatterns(name: 'default' | 'named'): void {
    describe('Variable of class', () => {
      const content = `class Cls {
        constructor() {}
        method() {}
        async asyncMethod() {}
        static staticMethod() {}
      }
      ${baseContent} Cls;`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(name);
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe('Cls');
        } else {
          expect(true).toBe(false);
        }
      });
      it('imports one class object that has four methods', () => {
        const { classObjects } = traverser(parser(content));
        expect(classObjects.length).toBe(1);
        const classObject = classObjects.pop();
        if (classObject) {
          expect(classObject.name).toBe('Cls');
          expect(classObject.methods.length).toBe(4);
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Class Declaration', () => {
      const content = `${baseContent} class Cls {
        constructor() {}
      }`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(name);
          expect(moduleExport.classNameIfExists).toBe('Cls');
          expect(moduleExport.name).toBe('Cls');
        } else {
          expect(true).toBe(false);
        }
      });
      it('imports one class object that has one method', () => {
        const { classObjects } = traverser(parser(content));
        expect(classObjects.length).toBe(1);
        const classObject = classObjects.pop();
        if (classObject) {
          expect(classObject.name).toBe('Cls');
          expect(classObject.methods.length).toBe(1);
          const [methodConstructor] = classObject.methods;
          if (methodConstructor) {
            expect(methodConstructor.name).toBe('constructor');
            expect(methodConstructor.async).toBe(false);
            expect(methodConstructor.kind).toBe('constructor');
          } else {
            expect(true).toBe(false);
          }
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Variable of function', () => {
      const content = `function func() {};
      ${baseContent} func;`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(name);
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe('func');
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Function Declaration', () => {
      const content = `${baseContent} function func() {};`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(name);
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe(null);
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Variable of property {a, b, c}', () => {
      const content = `const a = false;
      const b = 0;
      const c = '0';
      ${baseContent} {a, b, c};`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(name);
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe(null);
        } else {
          expect(true).toBe(false);
        }
      });
    });
  }
  function testDefault(): void {
    testPatterns('default');
  }
  function testNamed(): void {
    testPatterns('named');
  }
  return { testDefault, testNamed };
}

describe('parser', () => {
  describe('module.exports', () => {
    const baseContent = 'module.exports = ';
    describe('Variable of class', () => {
      const content = `class Cls {
        constructor() {}
        method() {}
        async asyncMethod() {}
        static staticMethod() {}
      }
      ${baseContent} Cls;`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(null);
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe('Cls');
        } else {
          expect(true).toBe(false);
        }
      });
      it('imports one class object that has four methods', () => {
        const { classObjects } = traverser(parser(content));
        expect(classObjects.length).toBe(1);
        const classObject = classObjects.pop();
        if (classObject) {
          expect(classObject.name).toBe('Cls');
          expect(classObject.methods.length).toBe(4);
          const [
            methodConstructor,
            methodNormal,
            methodAsync,
            methodStatic,
          ] = classObject.methods;
          if (methodConstructor) {
            expect(methodConstructor.name).toBe('constructor');
            expect(methodConstructor.async).toBe(false);
            expect(methodConstructor.kind).toBe('constructor');
          } else {
            expect(true).toBe(false);
          }
          if (methodNormal) {
            expect(methodNormal.name).toBe('method');
            expect(methodNormal.async).toBe(false);
            expect(methodNormal.kind).toBe('method');
          } else {
            expect(true).toBe(false);
          }
          if (methodAsync) {
            expect(methodAsync.name).toBe('asyncMethod');
            expect(methodAsync.async).toBe(true);
            expect(methodAsync.kind).toBe('method');
          } else {
            expect(true).toBe(false);
          }
          if (methodStatic) {
            // TODO: We may need info about static
            expect(methodStatic.name).toBe('staticMethod');
            expect(methodStatic.async).toBe(false);
            expect(methodStatic.kind).toBe('method');
          } else {
            expect(true).toBe(false);
          }
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Class Declaration', () => {
      const content = `${baseContent} class Cls {
        constructor() {}
      }`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(null);
          expect(moduleExport.classNameIfExists).toBe('Cls');
          expect(moduleExport.name).toBe('Cls');
        } else {
          expect(true).toBe(false);
        }
      });
      it('imports one class object that has one method', () => {
        const { classObjects } = traverser(parser(content));
        expect(classObjects.length).toBe(1);
        const classObject = classObjects.pop();
        if (classObject) {
          expect(classObject.name).toBe('Cls');
          expect(classObject.methods.length).toBe(1);
          const [methodConstructor] = classObject.methods;
          if (methodConstructor) {
            expect(methodConstructor.name).toBe('constructor');
            expect(methodConstructor.async).toBe(false);
            expect(methodConstructor.kind).toBe('constructor');
          } else {
            expect(true).toBe(false);
          }
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Variable of function', () => {
      const content = `function func() {};
      ${baseContent} func;`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(null);
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe('func');
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Function Declaration', () => {
      const content = `${baseContent} function func() {};`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(null);
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe(null);
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Variable of property {a, b, c}', () => {
      const content = `const a = false;
      const b = 0;
      const c = '0';
      ${baseContent} {a, b, c};`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe(null);
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe(null);
        } else {
          expect(true).toBe(false);
        }
      });
    });
  });
  describe('module.exports.default', () => {
    const baseContent = 'module.exports.default =';
    testUtils(baseContent).testDefault();
  });
  describe('module.exports.named', () => {
    const baseContent = 'module.exports.named =';
    testUtils(baseContent).testNamed();
  });
  describe('export default', () => {
    const baseContent = 'export default';
    testUtils(baseContent).testDefault();
  });
  describe('export named', () => {
    const baseContent = 'export';
    describe('Variable of class', () => {
      const content = `class Cls {
        constructor() {}
        method() {}
        async asyncMethod() {}
        static staticMethod() {}
      }
      ${baseContent} { Cls };`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe('Cls');
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe(null);
        } else {
          expect(true).toBe(false);
        }
      });
      it('imports one class object that has four methods', () => {
        const { classObjects } = traverser(parser(content));
        expect(classObjects.length).toBe(1);
        const classObject = classObjects.pop();
        if (classObject) {
          expect(classObject.name).toBe('Cls');
          expect(classObject.methods.length).toBe(4);
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Class Declaration', () => {
      const content = `${baseContent} class Cls {
    constructor() {}
    }`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe('Cls');
          expect(moduleExport.classNameIfExists).toBe('Cls');
          expect(moduleExport.name).toBe('Cls');
        } else {
          expect(true).toBe(false);
        }
      });
      it('imports one class object that has one method', () => {
        const { classObjects } = traverser(parser(content));
        expect(classObjects.length).toBe(1);
        const classObject = classObjects.pop();
        if (classObject) {
          expect(classObject.name).toBe('Cls');
          expect(classObject.methods.length).toBe(1);
          const [methodConstructor] = classObject.methods;
          if (methodConstructor) {
            expect(methodConstructor.name).toBe('constructor');
            expect(methodConstructor.async).toBe(false);
            expect(methodConstructor.kind).toBe('constructor');
          } else {
            expect(true).toBe(false);
          }
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Variable of function', () => {
      const content = `function func() {};
    ${baseContent} {func};`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe('func');
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe(null);
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Function Declaration', () => {
      const content = `${baseContent} function func() {};`;
      it('imports one module', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(1);
        const moduleExport = moduleExports.pop();
        if (moduleExport) {
          expect(moduleExport.property).toBe('func');
          expect(moduleExport.classNameIfExists).toBe(null);
          expect(moduleExport.name).toBe(null);
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('Variable of property {a, b, c}', () => {
      const content = `const a = false;
        function b() {};
        class c { constructor() {} };
        ${baseContent} {a, b, c};`;
      it('imports three modules', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(3);
        const [moduleA, moduleB, moduleC] = moduleExports;
        if (moduleA && moduleB && moduleC) {
          expect(moduleA.property).toBe('a');
          expect(moduleA.classNameIfExists).toBe(null);
          expect(moduleA.name).toBe(null);
          expect(moduleB.property).toBe('b');
          expect(moduleB.classNameIfExists).toBe(null);
          expect(moduleB.name).toBe(null);
          expect(moduleC.property).toBe('c');
          expect(moduleC.classNameIfExists).toBe(null);
          expect(moduleC.name).toBe(null);
        } else {
          expect(true).toBe(false);
        }
      });
      it('imports one class object that has one method', () => {
        const { classObjects } = traverser(parser(content));
        expect(classObjects.length).toBe(1);
        const classObject = classObjects.pop();
        if (classObject) {
          expect(classObject.name).toBe('c');
          expect(classObject.methods.length).toBe(1);
          const [methodConstructor] = classObject.methods;
          if (methodConstructor) {
            expect(methodConstructor.name).toBe('constructor');
            expect(methodConstructor.async).toBe(false);
            expect(methodConstructor.kind).toBe('constructor');
          } else {
            expect(true).toBe(false);
          }
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('The case with "as"', () => {
      const content = `const a = false;
        const b = 0;
        const c = '0';
        ${baseContent} {a as default, b as beta, c};`;
      it('imports three modules', () => {
        const { moduleExports } = traverser(parser(content));
        expect(moduleExports.length).toBe(3);
        const [moduleA, moduleB, moduleC] = moduleExports;
        if (moduleA && moduleB && moduleC) {
          expect(moduleA.property).toBe('default');
          expect(moduleA.classNameIfExists).toBe(null);
          expect(moduleA.name).toBe(null);
          expect(moduleB.property).toBe('beta');
          expect(moduleB.classNameIfExists).toBe(null);
          expect(moduleB.name).toBe(null);
          expect(moduleC.property).toBe('c');
          expect(moduleC.classNameIfExists).toBe(null);
          expect(moduleC.name).toBe(null);
        } else {
          expect(true).toBe(false);
        }
      });
    });
    describe('The case with "*"', () => {
      // We don't support this.
    });
  });
});
