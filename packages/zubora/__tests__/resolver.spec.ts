import { getFileName, getRelativePath } from '../src/resolver';

describe('getFileName', () => {
  describe('get file name from file path', () => {
    it('is JS', () => {
      const path = 'src/module.js';
      expect(getFileName(path)).toBe('module');
    });
    it('is TS', () => {
      const path = 'src/module.ts';
      expect(getFileName(path)).toBe('module');
    });
    it('has a dot', () => {
      const path = 'src/module.special.js';
      expect(getFileName(path)).toBe('module.special');
    });
  });
});

describe('getRelativePath', () => {
  describe('gives relative path', () => {
    it('in the same dir 1', () => {
      const src = 'src.js';
      const dest = 'test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('./src.js');
    });
    it('in the same dir 2', () => {
      const src = './src.js';
      const dest = './test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('./src.js');
    });
    it('in different dir 1', () => {
      const src = 'src/src.js';
      const dest = 'test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('./src/src.js');
    });
    it('in different dir 2', () => {
      const src = 'src.js';
      const dest = 'test/test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('../src.js');
    });
    it('in different dir 3', () => {
      const src = 'src/src.js';
      const dest = 'test/test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('../src/src.js');
    });
    it('in different dir 4', () => {
      const src = 'src/lib/src.js';
      const dest = 'test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('./src/lib/src.js');
    });
    it('in different dir 5', () => {
      const src = 'src.js';
      const dest = 'test/unit/test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('../../src.js');
    });
    it('in different dir 6', () => {
      const src = 'src/lib/src.js';
      const dest = 'test/unit/test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('../../src/lib/src.js');
    });
    it('in different dir 7', () => {
      const src = 'src/lib/src.js';
      const dest = 'src/unit/test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('../lib/src.js');
    });
    it('in different dir 8', () => {
      const src = 'src/src.js';
      const dest = 'src/test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('./src.js');
    });
    it('in different dir 9', () => {
      const src = '../src/src.js';
      const dest = 'test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('../src/src.js');
    });
    it('in different dir 10', () => {
      const src = '../src/src.js';
      const dest = 'test/test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('../../src/src.js');
    });
    it('in different dir 11', () => {
      const src = '../../src/src.js';
      const dest = 'test.spec.js';
      const relativePath = getRelativePath(src, dest);
      expect(relativePath).toBe('../../src/src.js');
    });
  });
});
