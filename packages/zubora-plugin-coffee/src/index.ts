import * as CoffeeScript from 'coffeescript';

function plugin(code: string): string {
  try {
    return CoffeeScript.compile(code, { bare: true });
  } catch (err) {
    console.error('Oops, something happened in zubora-plugin-coffee.', err);
    return '';
  }
}

export default plugin;
