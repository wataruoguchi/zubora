class Simple {
  constructor(name) {
    this.name = name;
  }
  static staticMethod() {
    return 'Static Method';
  }
  method() {
    return `Hello ${this.name}`;
  }
  async asyncMethod() {
    function sleep(ms) {
      return new Promise(function(resolve) {
        return setTimeout(resolve, ms);
      });
    }
    await sleep(1);
    return `Yo ${this.name}`;
  }
}

module.exports = Simple;
