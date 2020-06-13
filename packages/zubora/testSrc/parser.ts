// This module has to be only used for testing.
import { types, TransformOptions } from '@babel/core';
import { transform } from '@babel/standalone';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;
function parser(content: string): types.Node | FIXME {
  try {
    // TODO: Let's determine that the input file is module. We will revisit here.
    const options: TransformOptions = { sourceType: 'module', ast: true };
    const { ast } = transform(content, options);
    return ast;
  } catch (error) {
    throw new Error(JSON.stringify({ error, content }));
  }
}

export { parser };
