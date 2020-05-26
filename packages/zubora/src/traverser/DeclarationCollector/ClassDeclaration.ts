import {
  ClassDeclaration,
  isClassBody,
  isIdentifier,
  isClassMethod,
  ClassExpression,
} from '@babel/types';
import { ClassObject, MethodObject } from '../../types';

function visitClassDeclaration(
  node: ClassDeclaration | ClassExpression
): ClassObject {
  if (isIdentifier(node.id) && isClassBody(node.body)) {
    const {
      id: { name },
      body: { body },
    } = node;

    // Scan through class methods.
    const methodObjects: MethodObject[] = body
      .map(method => {
        if (isClassMethod(method) && isIdentifier(method.key)) {
          const {
            key: { name },
            kind,
            async,
          } = method;
          return { name, async, kind };
        } else {
          return { name: null, async: false, kind: '' }; // This will be ignored by 'filter'
        }
      })
      .filter(methodObject => methodObject.name);

    // Set class name and class methods.
    return { name, methods: methodObjects };
  } else {
    // ClassDeclaration and ClassExpression both should satisfy the if condition above. I don't think nothing comes here.
    console.warn('What is falling here? 001');
    // This will be filtered out later.
    return { name: '', methods: [] };
  }
}
export { visitClassDeclaration };
