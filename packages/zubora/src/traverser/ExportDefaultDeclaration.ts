import { ExportDefaultDeclaration } from '@babel/types';
import { NodePath } from '@babel/core';
import { ExportedModule } from '../types';
import { buildExportedModule } from './buildExportedModule';

function visitExportDefaultDeclaration(
  exportedModules: ExportedModule[]
): (path: NodePath<ExportDefaultDeclaration>) => void {
  return function(path): void {
    const node: ExportDefaultDeclaration = path.node;
    const { declaration } = node;
    const moduleExportObject: ExportedModule = buildExportedModule(
      'default',
      declaration
    );
    exportedModules.push(moduleExportObject);
  };
}
export { visitExportDefaultDeclaration };
