import {
  VariableDeclaration,
  isClassExpression,
  isFunctionExpression,
  isVariableDeclarator,
  isObjectPattern,
  isArrayPattern,
  isObjectProperty,
  isObjectExpression,
  Identifier,
} from '@babel/types';
import { ClassObject } from '../../types';
import { visitClassDeclaration } from './ClassDeclaration';
import { visitFunctionDeclaration } from './FunctionDeclaration';
import { isIdentifier, FunctionExpression } from '@babel/types';

function _visitFunctionExpression(
  id: Identifier,
  init: FunctionExpression
): ClassObject[] {
  const classObject = visitFunctionDeclaration(init);
  if (classObject.name === '') {
    // TODO : Refactoring
    return [
      {
        ...classObject,
        name: id.name,
      },
    ];
  } else {
    return [classObject];
  }
}
function visitVariableDeclaration(node: VariableDeclaration): ClassObject[] {
  const classObjectsArray: ClassObject[][] = node.declarations.map(function(
    declaration
  ): ClassObject[] {
    if (isClassExpression(declaration.init)) {
      return [visitClassDeclaration(declaration.init)];
    } else if (isFunctionExpression(declaration.init)) {
      const { id, init } = declaration;
      if (isIdentifier(id)) {
        return _visitFunctionExpression(id, init);
      } else {
        // TODO refactoring
        return [];
      }
    } else if (isVariableDeclarator(declaration)) {
      const classObjects: ClassObject[] = [];
      if (isIdentifier(declaration.id)) {
        if (isIdentifier(declaration.init)) {
          /**
           * Example:
           * function fnOrig() {};
           * const fn = fnOrig;
           * export {fn};
           */
          classObjects.push({
            name: declaration.id.name,
            methods: [],
            identifierName: declaration.init.name,
          });
        } else if (isObjectExpression(declaration.init)) {
          declaration.init.properties.forEach(property => {
            if (isObjectProperty(property)) {
              const { key, value } = property;
              if (isIdentifier(key) && isFunctionExpression(value)) {
                _visitFunctionExpression(key, value).forEach(clsObj =>
                  classObjects.push(clsObj)
                );
              }
            }
          });
        }
      } else if (isObjectPattern(declaration.id)) {
        declaration.id.properties.forEach(property => {
          if (isObjectProperty(property)) {
            // TODO: refactoring
            const { key, value } = property;
            if (isIdentifier(key)) {
              if (isIdentifier(value)) {
                // key is exposed
                classObjects.push({
                  name: key.name,
                  methods: [],
                  identifierName: value.name,
                });
              }
              // TODO: The case: `const {a, b} = {a: function() {}, b: function() {}}`
            }
          }
        });
      } else if (isArrayPattern(declaration.id)) {
        // TODO: The case: `const [a, b] = [function() {}, function() {}]
      }
      return classObjects;
    } else {
      // TODO: This should be filtered out later.
      return [{ name: '', methods: [] }];
    }
  });
  // Flatting
  return classObjectsArray.reduce((acc, classObjects) =>
    acc.concat(classObjects, [])
  );
}
export { visitVariableDeclaration };
