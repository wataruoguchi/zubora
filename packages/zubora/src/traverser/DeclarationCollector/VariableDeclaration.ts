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
  isIdentifier,
  FunctionExpression,
} from '@babel/types';
import { ClassObject } from '../../types';
import { visitClassDeclaration } from './ClassDeclaration';
import { visitFunctionDeclaration } from './FunctionDeclaration';

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
    const { id, init } = declaration;
    if (isClassExpression(init)) {
      return [visitClassDeclaration(init)];
    } else if (isIdentifier(id) && isFunctionExpression(init)) {
      return _visitFunctionExpression(id, init);
    } else if (isVariableDeclarator(declaration)) {
      const classObjects: ClassObject[] = [];
      if (isIdentifier(id)) {
        if (isIdentifier(init)) {
          /**
           * Example:
           * function fnOrig() {};
           * const fn = fnOrig;
           * export {fn};
           */
          classObjects.push({
            name: id.name,
            methods: [],
            identifierName: init.name,
          });
        } else if (isObjectExpression(init)) {
          init.properties.forEach(property => {
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
      } else if (isObjectPattern(id)) {
        id.properties.forEach(property => {
          if (isObjectProperty(property)) {
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
      } else if (isArrayPattern(id)) {
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
