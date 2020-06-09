import { zubora } from 'zubora';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.addEventListener('message', async ({ data }) => {
  const srcPath = 'foobar.ts';
  if (data && typeof data === 'string') {
    try {
      const result = await zubora(srcPath, `./${srcPath}`, 'foobar', data);
      const formattedResult = prettier.format(result, {
        parser: 'babel',
        plugins: [parserBabel],
      });
      ctx.postMessage(formattedResult);
    } catch (err) {
      ctx.postMessage(JSON.stringify(err));
    }
  }
});
export default ctx;
