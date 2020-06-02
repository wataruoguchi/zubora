import { ExportedModule, ClassObject } from '../src/types';
import { importBlock, testCaseBlock } from '../src/template';

describe('importBlock', () => {
  describe('import export.modules', () => {
    it('has on its own 1', () => {
      const modules: ExportedModule[] = [
        { property: null, classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import * as src from './src'`
      );
    });
    it('has one other named module', () => {
      const modules: ExportedModule[] = [
        { property: null, classNameIfExists: null, name: null },
        { property: 'named', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import * as src,{ named } from './src'`
      );
    });
    it('has two other named modules', () => {
      const modules: ExportedModule[] = [
        { property: null, classNameIfExists: null, name: null },
        { property: 'named', classNameIfExists: null, name: null },
        { property: 'anotherNamed', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import * as src,{ named,anotherNamed } from './src'`
      );
    });
    it('has one default module', () => {
      const modules: ExportedModule[] = [
        { property: null, classNameIfExists: null, name: null },
        { property: 'default', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import * as src from './src'`
      );
    });
  });
  describe('import default', () => {
    it('has on its own', () => {
      const modules: ExportedModule[] = [
        { property: 'default', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import src from './src'`
      );
    });
    it('has one other named module', () => {
      const modules: ExportedModule[] = [
        { property: 'default', classNameIfExists: null, name: null },
        { property: 'named', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import src,{ named } from './src'`
      );
    });
    it('has two other named modules', () => {
      const modules: ExportedModule[] = [
        { property: 'default', classNameIfExists: null, name: null },
        { property: 'named', classNameIfExists: null, name: null },
        { property: 'anotherNamed', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import src,{ named,anotherNamed } from './src'`
      );
    });
  });
  describe('import named', () => {
    it('has on its own', () => {
      const modules: ExportedModule[] = [
        { property: 'named', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import { named } from './src'`
      );
    });
    it('has one other named module', () => {
      const modules: ExportedModule[] = [
        { property: 'named', classNameIfExists: null, name: null },
        { property: 'anotherNamed', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import { named,anotherNamed } from './src'`
      );
    });
    it('has two other named modules', () => {
      const modules: ExportedModule[] = [
        { property: 'named', classNameIfExists: null, name: null },
        { property: 'anotherNamed', classNameIfExists: null, name: null },
        { property: 'third', classNameIfExists: null, name: null },
      ];
      expect(importBlock('./src.js', 'src', modules)).toBe(
        `import { named,anotherNamed,third } from './src'`
      );
    });
  });
});

describe('testCaseBlock', () => {
  describe('importing one class', () => {
    it('imports export.modules 1', () => {
      const filePath = 'src';
      const modules: ExportedModule[] = [
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
        `describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })describe('#asyncMethod', function(){ it('', async function() { // TODO Write test for src#asyncMethod }) })})`
      );
    });
    it('imports export.modules 2', () => {
      const filePath = 'src';
      const modules: ExportedModule[] = [
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
        `describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })describe('#asyncMethod', function(){ it('', async function() { // TODO Write test for src#asyncMethod }) })})`
      );
    });
    it('imports default', () => {
      const filePath = 'src';
      const modules: ExportedModule[] = [
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
      const filePath = 'src';
      const modules: ExportedModule[] = [
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
      const filePath = 'src';
      const modules: ExportedModule[] = [
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
        `describe('Cls',function(){describe('#method', function(){ it('', function() { // TODO Write test for src#method }) })describe('#asyncMethod', function(){ it('', async function() { // TODO Write test for src#asyncMethod }) })})describe('Cls2',function(){describe('#method', function(){ it('', function() { // TODO Write test for named#method }) })})`
      );
    });
  });
  describe('imports export.modules', () => {
    it('has one module', () => {
      const filePath = 'src';
      const modules: ExportedModule[] = [
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
      const filePath = 'src';
      const modules: ExportedModule[] = [
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
      const filePath = 'src';
      const modules: ExportedModule[] = [
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
