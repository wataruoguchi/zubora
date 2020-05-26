import {
  isIdentifier,
  isMemberExpression,
  AssignmentExpression,
  MemberExpression,
  Node,
} from '@babel/types';
import { NodePath } from '@babel/core';

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

// TODO This will be better. Issue #128
function visitAssignmentExpression(
  callback: (property: string, node: Node) => void
): (path: NodePath<AssignmentExpression>) => void {
  /**
   * Do something only when the member expression builds `module.exports`.
   */
  return function assignmentExpression(path): void {
    const node: AssignmentExpression = path.node;
    const { left, right } = node;
    if (isMemberExpression(left)) {
      if (flattenMemberExpression(left).match(/^module.exports\.?(.*)$/)) {
        const property = RegExp.$1 || '';
        callback(property, right);
      }
    }
  };
}
export { visitAssignmentExpression };
