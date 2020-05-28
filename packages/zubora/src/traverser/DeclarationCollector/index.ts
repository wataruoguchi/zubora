import {
  Node,
  isClassDeclaration,
  isFunctionDeclaration,
  isVariableDeclaration,
  isExportNamedDeclaration,
  isExportDefaultDeclaration,
  isExportSpecifier,
  isIdentifier,
} from '@babel/types';
import { ClassObject } from '../../types';
import { visitClassDeclaration } from './ClassDeclaration';
import { visitFunctionDeclaration } from './FunctionDeclaration';
import { visitVariableDeclaration } from './VariableDeclaration';
import { isClassExpression } from '@babel/types';

function declarationCollector(node: Node): ClassObject[] {
  const classObjects: ClassObject[] = [];
  if (isExportNamedDeclaration(node)) {
    if (node.specifiers) {
      node.specifiers.map((specifier) => {
        if (isExportSpecifier(specifier) && isIdentifier(specifier.exported)) {
          if (isIdentifier(specifier.local)) {
            classObjects.push({
              name: specifier.exported.name,
              methods: [],
              identifierName: specifier.local.name,
            });
          }
          // TODO Cases for Function, Class
        }
      });
    }
    node = node.declaration;
  }
  if (isExportDefaultDeclaration(node)) {
    node = node.declaration;
  }
  if (isClassExpression(node) || isClassDeclaration(node)) {
    const classObject = visitClassDeclaration(node);
    if (classObject && classObject.name) {
      classObjects.push(classObject);
    }
  } else if (isFunctionDeclaration(node)) {
    const classObject = visitFunctionDeclaration(node);
    if (classObject) {
      classObjects.push(classObject);
    }
  } else if (isVariableDeclaration(node)) {
    visitVariableDeclaration(node).forEach((classObj) =>
      classObjects.push(classObj)
    );
  }
  return classObjects;
}
export { declarationCollector };
