import {
  isIdentifier,
  isMemberExpression,
  AssignmentExpression,
  MemberExpression,
} from '@babel/types';
import { NodePath } from '@babel/core';
import { ExportedModule } from '../types';
import { buildExportedModule } from './buildExportedModule';

function flattenMemberExpression(exp: MemberExpression): string {
  if (!isMemberExpression(exp)) return '';
  const { object, property } = exp;
  if (isMemberExpression(object)) {
    return flattenMemberExpression(object) + `.${property.name}`;
  } else if (isIdentifier(object)) {
    return `${object.name}.${property.name}`;
  } else {
    return '';
  }
}

function visitAssignmentExpression(
  moduleExports: ExportedModule[]
): (path: NodePath<AssignmentExpression>) => void {
  return function(path): void {
    const node: AssignmentExpression = path.node;
    const { left, right } = node;
    if (isMemberExpression(left)) {
      if (flattenMemberExpression(left).match(/^module.exports\.?(.*)$/)) {
        const property = RegExp.$1 || null;
        const moduleExportObject: ExportedModule = buildExportedModule(
          property,
          right
        );
        moduleExports.push(moduleExportObject);
      }
    }
  };
}
export { visitAssignmentExpression };
