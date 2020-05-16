import {
  Node,
  MemberExpression,
  ClassDeclaration,
  ClassExpression,
  isMemberExpression,
  isIdentifier,
  isClassMethod,
  isClassExpression,
  isClassBody,
  isClassDeclaration,
} from '@babel/types';
import { ExportedModule, MethodObject, ClassObject } from '../types';

function flattenMemberExpression(exp: MemberExpression): string {
  if (!isMemberExpression(exp)) return '';
  const { object } = exp;
  const property = exp.property;
  if (isMemberExpression(object)) {
    return flattenMemberExpression(object) + `.${property.name}`;
  } else if (isIdentifier(object)) {
    return `${object.name}.${property.name}`;
  } else {
    return '';
  }
}

function fetchClassObject(
  node: ClassDeclaration | ClassExpression
): ClassObject {
  if (isIdentifier(node.id) && isClassBody(node.body)) {
    const { name } = node.id;
    const { body } = node.body;
    const methodObjects: MethodObject[] = body
      .map(method => {
        if (isClassMethod(method) && isIdentifier(method.key)) {
          const name: string = method.key.name || '';
          const { kind, async } = method;
          return { name, async, kind };
        } else {
          return { name: null, async: false, kind: 'get' }; // This will be ignored by 'filter'
        }
      })
      .filter(methodObject => methodObject.name);
    return { name, methods: methodObjects };
  } else {
    return { name: '', methods: [] };
  }
}

function fetchExportedModule(
  property: string | null,
  node: Node
): ExportedModule {
  if (isClassExpression(node) || isClassDeclaration(node)) {
    // e.g., module.exports = class Class { ... }
    // e.g., module.exports.named = class Class { ... }
    // e.g., module.exports.default = class Class { ... }
    // e.g., export default class Class { ... }
    // e.g., export class Class { ... }
    const classNameIfExists = isIdentifier(node.id) ? node.id.name : null;
    return {
      property,
      classNameIfExists,
      name: classNameIfExists,
    };
  } else if (isIdentifier(node)) {
    // e.g., function func() { ... }; module.exports.func = func;
    // e.g., class Class { ... }; module.exports = Class;
    // e.g., class Class { ... }; module.exports.named = Class;
    // e.g., class Class { ... }; module.exports.default = Class;
    // e.g., class Class { ... }; export default = Class;
    return {
      property,
      classNameIfExists: null,
      name: node.name,
    };
  } else {
    // e.g., module.exports = function () { ... }
    // e.g., module.exports.named = function () { ... }
    // e.g., module.exports.default = function () { ... }
    // e.g., export default function () { ... }
    // e.g., export function func() { ... }
    // e.g., function func() { ... }; export { func };
    // e.g., class Class { ... }; export { Class };
    return {
      property,
      classNameIfExists: null,
      name: null,
    };
  }
}

export { flattenMemberExpression, fetchClassObject, fetchExportedModule };
