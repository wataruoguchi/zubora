import { ExportedModule } from '../../types';
import { visitExportNamedDeclaration } from './ExportNamedDeclaration';
import { visitExportDefaultDeclaration } from './ExportDefaultDeclaration';
import { visitAssignmentExpression } from './AssignmentExpression';
import { NodePath } from '@babel/core';
import {
  ExportNamedDeclaration,
  ExportDefaultDeclaration,
  AssignmentExpression,
  Node,
} from '@babel/types';
import { buildExportedModule } from './buildExportedModule';

type ReturnType = {
  ExportNamedDeclaration: (path: NodePath<ExportNamedDeclaration>) => void;
  ExportDefaultDeclaration: (path: NodePath<ExportDefaultDeclaration>) => void;
  AssignmentExpression: (node: NodePath<AssignmentExpression>) => void;
};

// Collect visitors that could add `exportedModules`.
function exportedModuleBuilder(exportedModules: ExportedModule[]): ReturnType {
  // Callback function that adds up `exportModules`.
  function build(property: string, node: Node): void {
    exportedModules.push(
      buildExportedModule(property.length ? property : null, node)
    );
  }
  return {
    ExportNamedDeclaration: visitExportNamedDeclaration(build),
    ExportDefaultDeclaration: visitExportDefaultDeclaration(build),
    AssignmentExpression: visitAssignmentExpression(build), // CommonJS
  };
}
export { exportedModuleBuilder };
