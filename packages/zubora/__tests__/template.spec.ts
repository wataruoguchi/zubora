import { ModuleExportObject, ClassObject } from '../src/zubora';
import { importBlock, testCaseBlock } from '../src/template';

describe('importBlock', () => {
  describe('import export.modules', () => {
    it('has on its own 1', () => {
      const modules: ModuleExportObject[] = [
        { property: null, classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import * as src from './src.js'`
      );
    });
    it('has one other named module', () => {
      const modules: ModuleExportObject[] = [
        { property: null, classNameIfExists: null, name: null },
        { property: 'named', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import * as src,{ named } from './src.js'`
      );
    });
    it('has two other named modules', () => {
      const modules: ModuleExportObject[] = [
        { property: null, classNameIfExists: null, name: null },
        { property: 'named', classNameIfExists: null, name: null },
        { property: 'anotherNamed', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import * as src,{ named,anotherNamed } from './src.js'`
      );
    });
    it('has one default module', () => {
      const modules: ModuleExportObject[] = [
        { property: null, classNameIfExists: null, name: null },
        { property: 'default', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import * as src from './src.js'`
      );
    });
  });
  describe('import default', () => {
    it('has on its own', () => {
      const modules: ModuleExportObject[] = [
        { property: 'default', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import src from './src.js'`
      );
    });
    it('has one other named module', () => {
      const modules: ModuleExportObject[] = [
        { property: 'default', classNameIfExists: null, name: null },
        { property: 'named', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import src,{ named } from './src.js'`
      );
    });
    it('has two other named modules', () => {
      const modules: ModuleExportObject[] = [
        { property: 'default', classNameIfExists: null, name: null },
        { property: 'named', classNameIfExists: null, name: null },
        { property: 'anotherNamed', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import src,{ named,anotherNamed } from './src.js'`
      );
    });
  });
  describe('import named', () => {
    it('has on its own', () => {
      const modules: ModuleExportObject[] = [
        { property: 'named', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import { named } from './src.js'`
      );
    });
    it('has one other named module', () => {
      const modules: ModuleExportObject[] = [
        { property: 'named', classNameIfExists: null, name: null },
        { property: 'anotherNamed', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import { named,anotherNamed } from './src.js'`
      );
    });
    it('has two other named modules', () => {
      const modules: ModuleExportObject[] = [
        { property: 'named', classNameIfExists: null, name: null },
        { property: 'anotherNamed', classNameIfExists: null, name: null },
        { property: 'third', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', modules)).toBe(
        `import { named,anotherNamed,third } from './src.js'`
      );
    });
  });
});

describe('testCaseBlock', () => {
  describe('importing one class', () => {
    it('imports export.modules 1', () => {
      const filePath = '../modules/src.js';
      const modules: ModuleExportObject[] = [
        { property: null, classNameIfExists: 'Cls', name: null },
      ];
      const classObjects: ClassObject[] = [
        {
          name: 'Cls',
          methods: [
            { name: 'method', async: false, kind: 'method' },
            { name: 'asyncMethod', async: true, kind: 'method' },
          ],
        },
      ];
      expect(
        testCaseBlock(filePath, modules, classObjects)
          .replace(/[\n\r]+/g, '')
          .replace(/\s+/g, ' ')
      ).toBe(
        `describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })describe('#asyncMethod', async function(){ it('', function() { // TODO Write test for src#asyncMethod }) })})`
      );
    });
    it('imports export.modules 2', () => {
      const filePath = './modules/src.js';
      const modules: ModuleExportObject[] = [
        { property: null, classNameIfExists: null, name: 'Cls' },
      ];
      const classObjects: ClassObject[] = [
        {
          name: 'Cls',
          methods: [
            { name: 'method', async: false, kind: 'method' },
            { name: 'asyncMethod', async: true, kind: 'method' },
          ],
        },
      ];
      expect(
        testCaseBlock(filePath, modules, classObjects)
          .replace(/[\n\r]+/g, '')
          .replace(/\s+/g, ' ')
      ).toBe(
        `describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })describe('#asyncMethod', async function(){ it('', function() { // TODO Write test for src#asyncMethod }) })})`
      );
    });
    it('imports default', () => {
      const filePath = './modules/src.js';
      const modules: ModuleExportObject[] = [
        { property: 'default', classNameIfExists: 'Cls', name: null },
      ];
      const classObjects: ClassObject[] = [
        {
          name: 'Cls',
          methods: [{ name: 'method', async: false, kind: 'method' }],
        },
      ];
      expect(
        testCaseBlock(filePath, modules, classObjects)
          .replace(/[\n\r]+/g, '')
          .replace(/\s+/g, ' ')
      ).toBe(
        `describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })})`
      );
    });
    it('imports named', () => {
      const filePath = './modules/src.js';
      const modules: ModuleExportObject[] = [
        { property: 'named', classNameIfExists: 'Cls', name: null },
      ];
      const classObjects: ClassObject[] = [
        {
          name: 'Cls',
          methods: [{ name: 'method', async: false, kind: 'method' }],
        },
      ];
      expect(
        testCaseBlock(filePath, modules, classObjects)
          .replace(/[\n\r]+/g, '')
          .replace(/\s+/g, ' ')
      ).toBe(
        `describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for named#method }) })})`
      );
    });
  });
  describe('importing two classes', () => {
    it('imports export.modules and one named module', () => {
      const filePath = './modules/src.js';
      const modules: ModuleExportObject[] = [
        { property: null, classNameIfExists: 'Cls', name: null },
        { property: 'named', classNameIfExists: 'Cls2', name: null },
      ];
      const classObjects: ClassObject[] = [
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
      expect(
        testCaseBlock(filePath, modules, classObjects)
          .replace(/[\n\r]+/g, '')
          .replace(/\s+/g, ' ')
      ).toBe(
        `describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })describe('#asyncMethod', async function(){ it('', function() { // TODO Write test for src#asyncMethod }) })})describe('Cls2',function(){describe('#method', function(){ it('', function() { // TODO Write test for named#method }) })})`
      );
    });
  });
  describe('imports export.modules', () => {
    it('has one module', () => {
      const filePath = './modules/src.js';
      const modules: ModuleExportObject[] = [
        { property: null, classNameIfExists: null, name: null },
      ];
      const classObjects: ClassObject[] = [];
      expect(
        testCaseBlock(filePath, modules, classObjects)
          .replace(/[\n\r]+/g, '')
          .replace(/\s+/g, ' ')
      ).toBe(
        `describe('src',function(){ describe('src', function(){ it('', function() { // TODO Write test for src }) }) })`
      );
    });
    it('has one module and one class', () => {
      const filePath = './modules/src.js';
      const modules: ModuleExportObject[] = [
        { property: 'Cls', classNameIfExists: null, name: null },
      ];
      const classObjects: ClassObject[] = [
        {
          name: 'Cls',
          methods: [{ name: 'method', async: false, kind: 'method' }],
        },
        {
          name: 'Cls2',
          methods: [{ name: 'method', async: false, kind: 'method' }],
        },
      ];
      expect(
        testCaseBlock(filePath, modules, classObjects)
          .replace(/[\n\r]+/g, '')
          .replace(/\s+/g, ' ')
      ).toBe(
        `describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for Cls#method }) })})`
      );
    });
    it('has two modules', () => {
      const filePath = './modules/src.js';
      const modules: ModuleExportObject[] = [
        { property: 'default', classNameIfExists: null, name: null },
        { property: 'named', classNameIfExists: null, name: null },
      ];
      const classObjects: ClassObject[] = [];
      expect(
        testCaseBlock(filePath, modules, classObjects)
          .replace(/[\n\r]+/g, '')
          .replace(/\s+/g, ' ')
      ).toBe(
        `describe('src',function(){ describe('src', function(){ it('', function() { // TODO Write test for src }) }) })describe('named',function(){ describe('named', function(){ it('', function() { // TODO Write test for named }) }) })`
      );
    });
  });
});
