"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = require("../src/template");
describe('importBlock', function () {
    describe('import export.modules', function () {
        it('has on its own 1', function () {
            var modules = [
                { property: null, classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import * as src from './src.js'");
        });
        it('has one other named module', function () {
            var modules = [
                { property: null, classNameIfExists: null, name: null },
                { property: 'named', classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import * as src,{ named } from './src.js'");
        });
        it('has two other named modules', function () {
            var modules = [
                { property: null, classNameIfExists: null, name: null },
                { property: 'named', classNameIfExists: null, name: null },
                { property: 'anotherNamed', classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import * as src,{ named,anotherNamed } from './src.js'");
        });
        it('has one default module', function () {
            var modules = [
                { property: null, classNameIfExists: null, name: null },
                { property: 'default', classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import * as src from './src.js'");
        });
    });
    describe('import default', function () {
        it('has on its own', function () {
            var modules = [
                { property: 'default', classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import src from './src.js'");
        });
        it('has one other named module', function () {
            var modules = [
                { property: 'default', classNameIfExists: null, name: null },
                { property: 'named', classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import src,{ named } from './src.js'");
        });
        it('has two other named modules', function () {
            var modules = [
                { property: 'default', classNameIfExists: null, name: null },
                { property: 'named', classNameIfExists: null, name: null },
                { property: 'anotherNamed', classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import src,{ named,anotherNamed } from './src.js'");
        });
    });
    describe('import named', function () {
        it('has on its own', function () {
            var modules = [
                { property: 'named', classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import { named } from './src.js'");
        });
        it('has one other named module', function () {
            var modules = [
                { property: 'named', classNameIfExists: null, name: null },
                { property: 'anotherNamed', classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import { named,anotherNamed } from './src.js'");
        });
        it('has two other named modules', function () {
            var modules = [
                { property: 'named', classNameIfExists: null, name: null },
                { property: 'anotherNamed', classNameIfExists: null, name: null },
                { property: 'third', classNameIfExists: null, name: null },
            ];
            expect(template_1.importBlock('./src.js', modules)).toBe("import { named,anotherNamed,third } from './src.js'");
        });
    });
});
describe('testCaseBlock', function () {
    describe('importing one class', function () {
        it('imports export.modules 1', function () {
            var filePath = '../modules/src.js';
            var modules = [
                { property: null, classNameIfExists: 'Cls', name: null },
            ];
            var classObjects = [
                {
                    name: 'Cls',
                    methods: [
                        { name: 'method', async: false, kind: 'method' },
                        { name: 'asyncMethod', async: true, kind: 'method' },
                    ],
                },
            ];
            expect(template_1.testCaseBlock(filePath, modules, classObjects)
                .replace(/[\n\r]+/g, '')
                .replace(/\s+/g, ' ')).toBe("describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })describe('#asyncMethod', async function(){ it('', function() { // TODO Write test for src#asyncMethod }) })})");
        });
        it('imports export.modules 2', function () {
            var filePath = './modules/src.js';
            var modules = [
                { property: null, classNameIfExists: null, name: 'Cls' },
            ];
            var classObjects = [
                {
                    name: 'Cls',
                    methods: [
                        { name: 'method', async: false, kind: 'method' },
                        { name: 'asyncMethod', async: true, kind: 'method' },
                    ],
                },
            ];
            expect(template_1.testCaseBlock(filePath, modules, classObjects)
                .replace(/[\n\r]+/g, '')
                .replace(/\s+/g, ' ')).toBe("describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })describe('#asyncMethod', async function(){ it('', function() { // TODO Write test for src#asyncMethod }) })})");
        });
        it('imports default', function () {
            var filePath = './modules/src.js';
            var modules = [
                { property: 'default', classNameIfExists: 'Cls', name: null },
            ];
            var classObjects = [
                {
                    name: 'Cls',
                    methods: [{ name: 'method', async: false, kind: 'method' }],
                },
            ];
            expect(template_1.testCaseBlock(filePath, modules, classObjects)
                .replace(/[\n\r]+/g, '')
                .replace(/\s+/g, ' ')).toBe("describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })})");
        });
        it('imports named', function () {
            var filePath = './modules/src.js';
            var modules = [
                { property: 'named', classNameIfExists: 'Cls', name: null },
            ];
            var classObjects = [
                {
                    name: 'Cls',
                    methods: [{ name: 'method', async: false, kind: 'method' }],
                },
            ];
            expect(template_1.testCaseBlock(filePath, modules, classObjects)
                .replace(/[\n\r]+/g, '')
                .replace(/\s+/g, ' ')).toBe("describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for named#method }) })})");
        });
    });
    describe('importing two classes', function () {
        it('imports export.modules and one named module', function () {
            var filePath = './modules/src.js';
            var modules = [
                { property: null, classNameIfExists: 'Cls', name: null },
                { property: 'named', classNameIfExists: 'Cls2', name: null },
            ];
            var classObjects = [
                {
                    name: 'Cls',
                    methods: [
                        { name: 'method', async: false, kind: 'method' },
                        { name: 'asyncMethod', async: true, kind: 'method' },
                    ],
                },
                {
                    name: 'Cls2',
                    methods: [{ name: 'method', async: false, kind: 'method' }],
                },
            ];
            expect(template_1.testCaseBlock(filePath, modules, classObjects)
                .replace(/[\n\r]+/g, '')
                .replace(/\s+/g, ' ')).toBe("describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })describe('#asyncMethod', async function(){ it('', function() { // TODO Write test for src#asyncMethod }) })})describe('Cls2',function(){describe('#method', function(){ it('', function() { // TODO Write test for named#method }) })})");
        });
    });
    describe('imports export.modules', function () {
        it('has one module', function () {
            var filePath = './modules/src.js';
            var modules = [
                { property: null, classNameIfExists: null, name: null },
            ];
            var classObjects = [];
            expect(template_1.testCaseBlock(filePath, modules, classObjects)
                .replace(/[\n\r]+/g, '')
                .replace(/\s+/g, ' ')).toBe("describe('src',function(){ describe('src', function(){ it('', function() { // TODO Write test for src }) }) })");
        });
        it('has one module and one class', function () {
            var filePath = './modules/src.js';
            var modules = [
                { property: 'Cls', classNameIfExists: null, name: null },
            ];
            var classObjects = [
                {
                    name: 'Cls',
                    methods: [{ name: 'method', async: false, kind: 'method' }],
                },
                {
                    name: 'Cls2',
                    methods: [{ name: 'method', async: false, kind: 'method' }],
                },
            ];
            expect(template_1.testCaseBlock(filePath, modules, classObjects)
                .replace(/[\n\r]+/g, '')
                .replace(/\s+/g, ' ')).toBe("describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for Cls#method }) })})");
        });
        it('has two modules', function () {
            var filePath = './modules/src.js';
            var modules = [
                { property: 'default', classNameIfExists: null, name: null },
                { property: 'named', classNameIfExists: null, name: null },
            ];
            var classObjects = [];
            expect(template_1.testCaseBlock(filePath, modules, classObjects)
                .replace(/[\n\r]+/g, '')
                .replace(/\s+/g, ' ')).toBe("describe('src',function(){ describe('src', function(){ it('', function() { // TODO Write test for src }) }) })describe('named',function(){ describe('named', function(){ it('', function() { // TODO Write test for named }) }) })");
        });
    });
});
//# sourceMappingURL=template.spec.js.map