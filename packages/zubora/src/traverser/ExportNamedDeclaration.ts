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
} from '@babel/types';
import { NodePath } from '@babel/core';
import { ExportedModule } from '../types';
import { buildExportedModule } from './buildExportedModule';

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
  moduleExports: ExportedModule[]
): (path: NodePath<ExportNamedDeclaration>) => void {
  return function(path): void {
    const node: ExportNamedDeclaration = path.node;
    const { declaration } = node;
    const names: string[] | null =
      classDeclaration(declaration) ||
      variableDeclaration(declaration) ||
      functionDeclaration(declaration);

    if (names) {
      names.forEach(name => {
        const moduleExportObject: ExportedModule = buildExportedModule(
          name,
          declaration
        );
        moduleExports.push(moduleExportObject);
      });
    } else if (
      declaration === null &&
      node.specifiers &&
      node.specifiers.length > 0 &&
      node.specifiers.every(
        specifier =>
          isExportSpecifier(specifier) && isIdentifier(specifier.exported)
      )
    ) {
      node.specifiers.map(specifier => {
        const name = specifier.exported.name;
        const moduleExportObject: ExportedModule = buildExportedModule(
          name,
          node // declaration must be null, let's pass the node to avoid the type error
        );
        moduleExports.push(moduleExportObject);
      });
      return;
    } else if (!declaration) return;
  };
}

export { visitExportNamedDeclaration };
