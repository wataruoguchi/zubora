import { NodePath } from '@babel/core';
import {
  isIdentifier,
  isClassBody,
  isClassMethod,
  ClassExpression,
  ClassDeclaration,
} from '@babel/types';
import { ClassObject, MethodObject } from '../types';

function buildClassObject(
  node: ClassDeclaration | ClassExpression
): ClassObject {
  if (isIdentifier(node.id) && isClassBody(node.body)) {
    const {
      id: { name },
      body: { body },
    } = node;
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
    return { name, methods: methodObjects };
  } else {
    return { name: '', methods: [] };
  }
}

function visitClassExpression(
  classObjects: ClassObject[]
): (path: NodePath<ClassExpression> | NodePath<ClassDeclaration>) => void {
  return function(
    path: NodePath<ClassExpression> | NodePath<ClassDeclaration>
  ): void {
    const classObject = buildClassObject(path.node);
    if (classObject.methods.length) {
      classObjects.push(classObject);
    }
  };
}

export { visitClassExpression };
