import { parse, ParserOptions } from '@babel/parser';
import { File } from '@babel/types';

function parser(content: string): File {
  try {
    // TODO: Let's determine that the input file is module. We will revisit here.
    const options: ParserOptions = { sourceType: 'module' };
    return parse(content, options);
  } catch (error) {
    throw new Error(JSON.stringify({ error, content }));
  }
}

export { parser };
