import { ExportDefaultDeclaration, Node } from '@babel/types';
import { NodePath } from '@babel/core';

function visitExportDefaultDeclaration(
  callback: (property: string, node: Node) => void
): (path: NodePath<ExportDefaultDeclaration>) => void {
  return function exportDefaultDeclaration(path): void {
    const node: ExportDefaultDeclaration = path.node;
    const { declaration } = node;
    callback('default', declaration);
  };
}
export { visitExportDefaultDeclaration };
