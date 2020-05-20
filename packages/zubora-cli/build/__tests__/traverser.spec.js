"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var traverser_1 = require("../src/traverser");
var parser_1 = require("../src/parser");
function testUtils(baseContent) {
    function testPatterns(name) {
        describe('Variable of class', function () {
            var content = "class Cls {\n        constructor() {}\n        method() {}\n        async asyncMethod() {}\n        static staticMethod() {}\n      }\n      " + baseContent + " Cls;";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(name);
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe('Cls');
                }
                else {
                    expect(true).toBe(false);
                }
            });
            it('imports one class object that has four methods', function () {
                var classObjects = traverser_1.traverser(parser_1.parser(content)).classObjects;
                expect(classObjects.length).toBe(1);
                var classObject = classObjects.pop();
                if (classObject) {
                    expect(classObject.name).toBe('Cls');
                    expect(classObject.methods.length).toBe(4);
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Class Declaration', function () {
            var content = baseContent + " class Cls {\n        constructor() {}\n      }";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(name);
                    expect(moduleExport.classNameIfExists).toBe('Cls');
                    expect(moduleExport.name).toBe('Cls');
                }
                else {
                    expect(true).toBe(false);
                }
            });
            it('imports one class object that has one method', function () {
                var classObjects = traverser_1.traverser(parser_1.parser(content)).classObjects;
                expect(classObjects.length).toBe(1);
                var classObject = classObjects.pop();
                if (classObject) {
                    expect(classObject.name).toBe('Cls');
                    expect(classObject.methods.length).toBe(1);
                    var methodConstructor = classObject.methods[0];
                    if (methodConstructor) {
                        expect(methodConstructor.name).toBe('constructor');
                        expect(methodConstructor.async).toBe(false);
                        expect(methodConstructor.kind).toBe('constructor');
                    }
                    else {
                        expect(true).toBe(false);
                    }
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Variable of function', function () {
            var content = "function func() {};\n      " + baseContent + " func;";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(name);
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe('func');
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Function Declaration', function () {
            var content = baseContent + " function func() {};";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(name);
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe(null);
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Variable of property {a, b, c}', function () {
            var content = "const a = false;\n      const b = 0;\n      const c = '0';\n      " + baseContent + " {a, b, c};";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(name);
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe(null);
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
    }
    function testDefault() {
        testPatterns('default');
    }
    function testNamed() {
        testPatterns('named');
    }
    return { testDefault: testDefault, testNamed: testNamed };
}
describe('traverser', function () {
    describe('module.exports', function () {
        var baseContent = 'module.exports = ';
        describe('Variable of class', function () {
            var content = "class Cls {\n        constructor() {}\n        method() {}\n        async asyncMethod() {}\n        static staticMethod() {}\n      }\n      " + baseContent + " Cls;";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(null);
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe('Cls');
                }
                else {
                    expect(true).toBe(false);
                }
            });
            it('imports one class object that has four methods', function () {
                var classObjects = traverser_1.traverser(parser_1.parser(content)).classObjects;
                expect(classObjects.length).toBe(1);
                var classObject = classObjects.pop();
                if (classObject) {
                    expect(classObject.name).toBe('Cls');
                    expect(classObject.methods.length).toBe(4);
                    var _a = classObject.methods, methodConstructor = _a[0], methodNormal = _a[1], methodAsync = _a[2], methodStatic = _a[3];
                    if (methodConstructor) {
                        expect(methodConstructor.name).toBe('constructor');
                        expect(methodConstructor.async).toBe(false);
                        expect(methodConstructor.kind).toBe('constructor');
                    }
                    else {
                        expect(true).toBe(false);
                    }
                    if (methodNormal) {
                        expect(methodNormal.name).toBe('method');
                        expect(methodNormal.async).toBe(false);
                        expect(methodNormal.kind).toBe('method');
                    }
                    else {
                        expect(true).toBe(false);
                    }
                    if (methodAsync) {
                        expect(methodAsync.name).toBe('asyncMethod');
                        expect(methodAsync.async).toBe(true);
                        expect(methodAsync.kind).toBe('method');
                    }
                    else {
                        expect(true).toBe(false);
                    }
                    if (methodStatic) {
                        // TODO: We may need info about static
                        expect(methodStatic.name).toBe('staticMethod');
                        expect(methodStatic.async).toBe(false);
                        expect(methodStatic.kind).toBe('method');
                    }
                    else {
                        expect(true).toBe(false);
                    }
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Class Declaration', function () {
            var content = baseContent + " class Cls {\n        constructor() {}\n      }";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(null);
                    expect(moduleExport.classNameIfExists).toBe('Cls');
                    expect(moduleExport.name).toBe('Cls');
                }
                else {
                    expect(true).toBe(false);
                }
            });
            it('imports one class object that has one method', function () {
                var classObjects = traverser_1.traverser(parser_1.parser(content)).classObjects;
                expect(classObjects.length).toBe(1);
                var classObject = classObjects.pop();
                if (classObject) {
                    expect(classObject.name).toBe('Cls');
                    expect(classObject.methods.length).toBe(1);
                    var methodConstructor = classObject.methods[0];
                    if (methodConstructor) {
                        expect(methodConstructor.name).toBe('constructor');
                        expect(methodConstructor.async).toBe(false);
                        expect(methodConstructor.kind).toBe('constructor');
                    }
                    else {
                        expect(true).toBe(false);
                    }
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Variable of function', function () {
            var content = "function func() {};\n      " + baseContent + " func;";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(null);
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe('func');
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Function Declaration', function () {
            var content = baseContent + " function func() {};";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(null);
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe(null);
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Variable of property {a, b, c}', function () {
            var content = "const a = false;\n      const b = 0;\n      const c = '0';\n      " + baseContent + " {a, b, c};";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe(null);
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe(null);
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
    });
    describe('module.exports.default', function () {
        var baseContent = 'module.exports.default =';
        testUtils(baseContent).testDefault();
    });
    describe('module.exports.named', function () {
        var baseContent = 'module.exports.named =';
        testUtils(baseContent).testNamed();
    });
    describe('export default', function () {
        var baseContent = 'export default';
        testUtils(baseContent).testDefault();
    });
    describe('export named', function () {
        var baseContent = 'export';
        describe('Variable of class', function () {
            var content = "class Cls {\n        constructor() {}\n        method() {}\n        async asyncMethod() {}\n        static staticMethod() {}\n      }\n      " + baseContent + " { Cls };";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe('Cls');
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe(null);
                }
                else {
                    expect(true).toBe(false);
                }
            });
            it('imports one class object that has four methods', function () {
                var classObjects = traverser_1.traverser(parser_1.parser(content)).classObjects;
                expect(classObjects.length).toBe(1);
                var classObject = classObjects.pop();
                if (classObject) {
                    expect(classObject.name).toBe('Cls');
                    expect(classObject.methods.length).toBe(4);
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Class Declaration', function () {
            var content = baseContent + " class Cls {\n    constructor() {}\n    }";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe('Cls');
                    expect(moduleExport.classNameIfExists).toBe('Cls');
                    expect(moduleExport.name).toBe('Cls');
                }
                else {
                    expect(true).toBe(false);
                }
            });
            it('imports one class object that has one method', function () {
                var classObjects = traverser_1.traverser(parser_1.parser(content)).classObjects;
                expect(classObjects.length).toBe(1);
                var classObject = classObjects.pop();
                if (classObject) {
                    expect(classObject.name).toBe('Cls');
                    expect(classObject.methods.length).toBe(1);
                    var methodConstructor = classObject.methods[0];
                    if (methodConstructor) {
                        expect(methodConstructor.name).toBe('constructor');
                        expect(methodConstructor.async).toBe(false);
                        expect(methodConstructor.kind).toBe('constructor');
                    }
                    else {
                        expect(true).toBe(false);
                    }
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Variable of function', function () {
            var content = "function func() {};\n    " + baseContent + " {func};";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe('func');
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe(null);
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Function Declaration', function () {
            var content = baseContent + " function func() {};";
            it('imports one module', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(1);
                var moduleExport = exportedModules.pop();
                if (moduleExport) {
                    expect(moduleExport.property).toBe('func');
                    expect(moduleExport.classNameIfExists).toBe(null);
                    expect(moduleExport.name).toBe(null);
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('Variable of property {a, b, c}', function () {
            var content = "const a = false;\n        function b() {};\n        class c { constructor() {} };\n        " + baseContent + " {a, b, c};";
            it('imports three modules', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(3);
                var moduleA = exportedModules[0], moduleB = exportedModules[1], moduleC = exportedModules[2];
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
                }
                else {
                    expect(true).toBe(false);
                }
            });
            it('imports one class object that has one method', function () {
                var classObjects = traverser_1.traverser(parser_1.parser(content)).classObjects;
                expect(classObjects.length).toBe(1);
                var classObject = classObjects.pop();
                if (classObject) {
                    expect(classObject.name).toBe('c');
                    expect(classObject.methods.length).toBe(1);
                    var methodConstructor = classObject.methods[0];
                    if (methodConstructor) {
                        expect(methodConstructor.name).toBe('constructor');
                        expect(methodConstructor.async).toBe(false);
                        expect(methodConstructor.kind).toBe('constructor');
                    }
                    else {
                        expect(true).toBe(false);
                    }
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('The case with "as"', function () {
            var content = "const a = false;\n        const b = 0;\n        const c = '0';\n        " + baseContent + " {a as default, b as beta, c};";
            it('imports three modules', function () {
                var exportedModules = traverser_1.traverser(parser_1.parser(content)).exportedModules;
                expect(exportedModules.length).toBe(3);
                var moduleA = exportedModules[0], moduleB = exportedModules[1], moduleC = exportedModules[2];
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
                }
                else {
                    expect(true).toBe(false);
                }
            });
        });
        describe('The case with "*"', function () {
            // We don't support this.
        });
    });
});
//# sourceMappingURL=traverser.spec.js.map