import { ExportDefaultDeclaration } from '@babel/types';
import { NodePath } from '@babel/core';
import { ExportedModule } from '../types';
import { buildExportedModule } from './buildExportedModule';

function visitExportDefaultDeclaration(
  moduleExports: ExportedModule[]
): (path: NodePath<ExportDefaultDeclaration>) => void {
  return function(path): void {
    const node: ExportDefaultDeclaration = path.node;
    const { declaration } = node;
    const moduleExportObject: ExportedModule = buildExportedModule(
      'default',
      declaration
    );
    moduleExports.push(moduleExportObject);
  };
}
export { visitExportDefaultDeclaration };
