import { ClassObject, MethodObject } from '../../types';
import { FunctionDeclaration, FunctionExpression } from '@babel/types';
function visitFunctionDeclaration(
  node: FunctionDeclaration | FunctionExpression
): ClassObject {
  const methodObject: MethodObject = {
    name: null,
    async: node.async,
    kind: 'method',
  };
  return {
    name: node.id ? node.id.name : '', // Anonymous function has no name.
    methods: [methodObject],
    isFunction: true,
  };
}
export { visitFunctionDeclaration };
