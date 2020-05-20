"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolver_1 = require("../src/resolver");
describe('getFileName', function () {
    describe('get file name from file path', function () {
        it('is JS', function () {
            var path = 'src/module.js';
            expect(resolver_1.getFileName(path)).toBe('module');
        });
        it('is TS', function () {
            var path = 'src/module.ts';
            expect(resolver_1.getFileName(path)).toBe('module');
        });
        it('has a dot', function () {
            var path = 'src/module.special.js';
            expect(resolver_1.getFileName(path)).toBe('module.special');
        });
    });
});
describe('getRelativePath', function () {
    describe('gives relative path', function () {
        it('in the same dir 1', function () {
            var src = 'src.js';
            var dest = 'test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('./src.js');
        });
        it('in the same dir 2', function () {
            var src = './src.js';
            var dest = './test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('./src.js');
        });
        it('in different dir 1', function () {
            var src = 'src/src.js';
            var dest = 'test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('./src/src.js');
        });
        it('in different dir 2', function () {
            var src = 'src.js';
            var dest = 'test/test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('../src.js');
        });
        it('in different dir 3', function () {
            var src = 'src/src.js';
            var dest = 'test/test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('../src/src.js');
        });
        it('in different dir 4', function () {
            var src = 'src/lib/src.js';
            var dest = 'test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('./src/lib/src.js');
        });
        it('in different dir 5', function () {
            var src = 'src.js';
            var dest = 'test/unit/test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('../../src.js');
        });
        it('in different dir 6', function () {
            var src = 'src/lib/src.js';
            var dest = 'test/unit/test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('../../src/lib/src.js');
        });
        it('in different dir 7', function () {
            var src = 'src/lib/src.js';
            var dest = 'src/unit/test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('../lib/src.js');
        });
        it('in different dir 8', function () {
            var src = 'src/src.js';
            var dest = 'src/test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('./src.js');
        });
        it('in different dir 9', function () {
            var src = '../src/src.js';
            var dest = 'test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('../src/src.js');
        });
        it('in different dir 10', function () {
            var src = '../src/src.js';
            var dest = 'test/test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('../../src/src.js');
        });
        it('in different dir 11', function () {
            var src = '../../src/src.js';
            var dest = 'test.spec.js';
            var relativePath = resolver_1.getRelativePath(src, dest);
            expect(relativePath).toBe('../../src/src.js');
        });
    });
});
//# sourceMappingURL=resolver.spec.js.map