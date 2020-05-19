// TODO This could be a babel plugin in the future.
import traverse from '@babel/traverse';
import { File } from '@babel/types';
import { visitClassExpression } from './ClassExpression';
import { visitExportNamedDeclaration } from './ExportNamedDeclaration';
import { visitExportDefaultDeclaration } from './ExportDefaultDeclaration';
import { visitAssignmentExpression } from './AssignmentExpression';
import { ExportedModule, ClassObject, ParseResult } from '../types';

function traverser(ast: File): ParseResult {
  const exportedModules: ExportedModule[] = [];
  const classObjects: ClassObject[] = [];
  traverse(ast, {
    ClassExpression: visitClassExpression(classObjects),
    ClassDeclaration: visitClassExpression(classObjects),
    ExportNamedDeclaration: visitExportNamedDeclaration(exportedModules),
    ExportDefaultDeclaration: visitExportDefaultDeclaration(exportedModules),
    AssignmentExpression: visitAssignmentExpression(exportedModules), // CommonJS
  });
  return { exportedModules, classObjects };
}

export { traverser };
