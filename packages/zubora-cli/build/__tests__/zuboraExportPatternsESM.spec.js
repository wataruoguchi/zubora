"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var index_1 = require("../src/index");
describe('export', function () {
    describe('The ES Module (ESM) format', function () {
        describe('named exports', function () {
            it('CASE 01. export let name1, name2, …, nameN; // also var, const', function () {
                expect('I can not think of test cases for this pattern.').toBeTruthy();
            });
            it('CASE 02. export let name1 = …, name2 = …, …, nameN; // also var, const', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n          export const firstName = function() { return 'Wataru' }, lastName = function() { return 'Oguchi' };\n";
                            expectedContent = "import { firstName, lastName } from \"./test.ts\";\ndescribe(\"firstName\", function() {\n  describe(\"firstName\", function() {\n    it(\"\", function() {\n      // TODO Write test for firstName\n    });\n  });\n});\ndescribe(\"lastName\", function() {\n  describe(\"lastName\", function() {\n    it(\"\", function() {\n      // TODO Write test for lastName\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('CASE 03. export function functionName(){...}', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n          export function person() {\n            return {\n              firstName() {\n                return 'Wataru';\n              },\n              lastName() {\n                return 'Oguchi';\n              },\n            };\n          }\n";
                            expectedContent = "import { person } from \"./test.ts\";\ndescribe(\"person\", function() {\n  describe(\"person\", function() {\n    it(\"\", function() {\n      // TODO Write test for person\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('CASE 04. export class ClassName {...}', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n          export class Person {\n            constructor() {}\n            firstName() {\n              return 'Wataru';\n            }\n            lastName() {\n              return 'Oguchi';\n            }\n          }\n";
                            expectedContent = "import { Person } from \"./test.ts\";\ndescribe(\"Person\", function() {\n  describe(\"#constructor\", function() {\n    it(\"\", function() {\n      // TODO Write test for Person#constructor\n    });\n  });\n  describe(\"#firstName\", function() {\n    it(\"\", function() {\n      // TODO Write test for Person#firstName\n    });\n  });\n  describe(\"#lastName\", function() {\n    it(\"\", function() {\n      // TODO Write test for Person#lastName\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('CASE 05. Export list', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n            function greeter(person) {\n              return 'Hello, ' + person;\n            }\n            function greeterJa(person) {\n              return '\u3053\u3093\u306B\u3061\u306F, ' + person;\n            }\n            export { greeter, greeterJa };\n";
                            expectedContent = "import { greeter, greeterJa } from \"./test.ts\";\ndescribe(\"greeter\", function() {\n  describe(\"greeter\", function() {\n    it(\"\", function() {\n      // TODO Write test for greeter\n    });\n  });\n});\ndescribe(\"greeterJa\", function() {\n  describe(\"greeterJa\", function() {\n    it(\"\", function() {\n      // TODO Write test for greeterJa\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('CASE 06. Renaming exports', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n      function greeter(person) {\n        return 'Hello, ' + person;\n      }\n      export { greeter as greet};\n";
                            expectedContent = "import { greet } from \"./test.ts\";\ndescribe(\"greet\", function() {\n  describe(\"greet\", function() {\n    it(\"\", function() {\n      // TODO Write test for greet\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('CASE 07. Exporting destructured assignments with renaming', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n        const person = {\n          firstName: function() {\n            return 'Wataru';\n          },\n          lastName: function() {\n            return 'Oguchi';\n          },\n        };\n        export const { firstName, sirName: lastName } = person;\n";
                            expectedContent = "import { firstName, sirName } from \"./test.ts\";\ndescribe(\"firstName\", function() {\n  describe(\"firstName\", function() {\n    it(\"\", function() {\n      // TODO Write test for firstName\n    });\n  });\n});\ndescribe(\"sirName\", function() {\n  describe(\"sirName\", function() {\n    it(\"\", function() {\n      // TODO Write test for sirName\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('default exports', function () {
            it('CASE 08. export default expression;', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n          function firstName() { return 'Wataru' }\n          export default firstName;\n";
                            expectedContent = "import test from \"./test.ts\";\ndescribe(\"test\", function() {\n  describe(\"test\", function() {\n    it(\"\", function() {\n      // TODO Write test for test\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('CASE 09. export default function (…) { … } // also class, function*', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n          export default function () { return 'noname' };\n";
                            expectedContent = "import test from \"./test.ts\";\ndescribe(\"test\", function() {\n  describe(\"test\", function() {\n    it(\"\", function() {\n      // TODO Write test for test\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('CASE 09. export default class ClassName { … }', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n          export default class Person {\n            constructor() {}\n            firstName() {return 'Wataru'}\n            lastName() {return 'Oguchi'}\n          };\n";
                            expectedContent = "import test from \"./test.ts\";\ndescribe(\"Person\", function() {\n  describe(\"#constructor\", function() {\n    it(\"\", function() {\n      // TODO Write test for test#constructor\n    });\n  });\n  describe(\"#firstName\", function() {\n    it(\"\", function() {\n      // TODO Write test for test#firstName\n    });\n  });\n  describe(\"#lastName\", function() {\n    it(\"\", function() {\n      // TODO Write test for test#lastName\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('CASE 10. export default function name1(…) { … } // also class, function*', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n          export default function firstName() { return 'Wataru' };\n";
                            expectedContent = "import test from \"./test.ts\";\ndescribe(\"test\", function() {\n  describe(\"test\", function() {\n    it(\"\", function() {\n      // TODO Write test for test\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('CASE 11. export { name1 as default, … };', function () { return __awaiter(void 0, void 0, void 0, function () {
                var code, expectedContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            code = "\n          function firstName() { return 'Wataru' };\n          function lastName() { return 'Oguchi' };\n          export { firstName as default, lastName }\n";
                            expectedContent = "import test, { lastName } from \"./test.ts\";\ndescribe(\"test\", function() {\n  describe(\"test\", function() {\n    it(\"\", function() {\n      // TODO Write test for test\n    });\n  });\n});\ndescribe(\"lastName\", function() {\n  describe(\"lastName\", function() {\n    it(\"\", function() {\n      // TODO Write test for lastName\n    });\n  });\n});\n";
                            return [4 /*yield*/, index_1.zubora('./test.ts', './test.spec.ts', code).then(function (result) {
                                    expect(result).toBe(expectedContent);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=zuboraExportPatternsESM.spec.js.map