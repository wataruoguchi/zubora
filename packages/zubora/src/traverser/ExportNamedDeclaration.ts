import {
  isIdentifier,
  isClassDeclaration,
  isVariableDeclaration,
  isVariableDeclarator,
  isFunctionDeclaration,
  isExportSpecifier,
  ExportNamedDeclaration,
} from '@babel/types';
import { NodePath } from 'babel__traverse';
import { ExportedModule } from '../types';
import { fetchExportedModule } from './utils';

function visitExportNamedDeclaration(
  moduleExports: ExportedModule[]
): (path: NodePath<ExportNamedDeclaration>) => void {
  return function(path): void {
    const { declaration } = path.node;
    let name = '';
    if (isClassDeclaration(declaration) && isIdentifier(declaration.id)) {
      name = declaration.id.name;
    } else if (
      isVariableDeclaration(declaration) &&
      declaration.declarations &&
      declaration.declarations.length === 1 &&
      isVariableDeclarator(declaration.declarations[0]) &&
      isIdentifier(declaration.declarations[0].id)
    ) {
      name = declaration.declarations[0].id.name;
    } else if (
      isFunctionDeclaration(declaration) &&
      isIdentifier(declaration.id)
    ) {
      name = declaration.id.name;
    } else if (
      declaration === null &&
      path.node.specifiers &&
      path.node.specifiers.length > 0 &&
      path.node.specifiers.every(
        specifier =>
          isExportSpecifier(specifier) && isIdentifier(specifier.exported)
      )
    ) {
      path.node.specifiers.map(specifier => {
        const name = specifier.exported.name;
        const moduleExportObject: ExportedModule = fetchExportedModule(
          name,
          path.node // declaration must be null, let's pass the node to avoid the type error
        );
        moduleExports.push(moduleExportObject);
      });
      return;
    } else if (!declaration) return;
    const moduleExportObject: ExportedModule = fetchExportedModule(
      name,
      declaration
    );
    moduleExports.push(moduleExportObject);
  };
}

export { visitExportNamedDeclaration };
