import { ExportDefaultDeclaration } from '@babel/types';
import { NodePath } from 'babel__traverse';
import { ExportedModule } from '../types';
import { fetchExportedModule } from './utils';

function visitExportDefaultDeclaration(
  moduleExports: ExportedModule[]
): (path: NodePath<ExportDefaultDeclaration>) => void {
  return function(path): void {
    const { declaration } = path.node;
    const moduleExportObject: ExportedModule = fetchExportedModule(
      'default',
      declaration
    );
    moduleExports.push(moduleExportObject);
  };
}
export { visitExportDefaultDeclaration };
