import plugin from '../src/index';

describe('zubora-plugin-coffee', () => {
  describe('Transpiling CoffeeScript', () => {
    it('transpiles CoffeeScript', () => {
      const code = `
        class Cls
          constructor: (val) ->
            console.log "test #{val}"
        module.exports = Cls
      `;
      const expected = `
var Cls;
Cls = class Cls {
  constructor(val) {
    console.log(\`test \${val}\`);
  }
};
module.exports = Cls;
      `;
      const result = plugin(code);
      function cleanup(orig: string): string {
        return orig.replace(/[\n\r]/g, '').trim();
      }
      expect(cleanup(result)).toBe(cleanup(expected));
    });
  });
});
