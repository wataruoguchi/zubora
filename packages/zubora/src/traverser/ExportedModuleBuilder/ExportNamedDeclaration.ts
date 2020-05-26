import {
  isIdentifier,
  isClassDeclaration,
  isVariableDeclaration,
  isFunctionDeclaration,
  isExportSpecifier,
  ExportNamedDeclaration,
  isObjectPattern,
  isObjectProperty,
  ObjectPattern,
  VariableDeclarator,
  Node,
} from '@babel/types';
import { NodePath } from '@babel/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function classDeclaration(declaration: any): string[] | null {
  if (isClassDeclaration(declaration) && isIdentifier(declaration.id)) {
    return [declaration.id.name];
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function variableDeclaration(declaration: any): string[] | null {
  if (isVariableDeclaration(declaration) && declaration.declarations) {
    const variableDeclarators: VariableDeclarator[] = declaration.declarations;
    return variableDeclarators.reduce((names: string[], declaration) => {
      if (isIdentifier(declaration.id)) {
        names.push(declaration.id.name);
      }
      if (isObjectPattern(declaration.id)) {
        const objectPattern: ObjectPattern = declaration.id;
        const propNames = objectPattern.properties.reduce(
          (propNames: string[], node) => {
            if (isObjectProperty(node)) {
              propNames.push(node.key.name);
            }
            return propNames;
          },
          []
        );
        names.push(...propNames);
      }
      return names;
    }, []);
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function functionDeclaration(declaration: any): string[] | null {
  if (isFunctionDeclaration(declaration) && isIdentifier(declaration.id)) {
    return [declaration.id.name];
  }
  return null;
}

function visitExportNamedDeclaration(
  callback: (property: string, node: Node) => void
): (path: NodePath<ExportNamedDeclaration>) => void {
  return function exportNamedDeclaration(path): void {
    const node: ExportNamedDeclaration = path.node;
    const { declaration } = node;
    const names: string[] | null =
      classDeclaration(declaration) ||
      variableDeclaration(declaration) ||
      functionDeclaration(declaration);

    if (names) {
      names.forEach((name) => {
        callback(name, declaration);
      });
    } else if (
      declaration === null &&
      node.specifiers &&
      node.specifiers.length > 0 &&
      node.specifiers.every(
        (specifier) =>
          isExportSpecifier(specifier) && isIdentifier(specifier.exported)
      )
    ) {
      node.specifiers.map((specifier) => {
        const name = specifier.exported.name;
        callback(name, node);
      });
      return;
    } else if (!declaration) return;
  };
}

export { visitExportNamedDeclaration };
