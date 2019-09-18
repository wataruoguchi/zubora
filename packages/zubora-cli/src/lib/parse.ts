import { ParserOptions } from '@babel/core';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import {
  isMemberExpression,
  isIdentifier,
  MemberExpression,
  isClassMethod,
  isClassExpression,
  isClassBody,
  ClassDeclaration,
  ClassExpression,
} from '@babel/types';
import {
  ModuleExportObject,
  MethodObject,
  ClassObject,
  ParseResult,
} from './zubora';

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

function traverseClassDeclarationOrClassExpression(
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
function parser(content: string): ParseResult {
  const moduleExports: ModuleExportObject[] = [];
  const classObjects: ClassObject[] = [];
  let ast;
  try {
    // We determine that the input file is module
    const options: ParserOptions = { sourceType: 'module' };
    ast = parse(content, options);
  } catch (err) {
    console.log(err); // TODO: Better error handling
  }
  if (ast) {
    traverse(ast, {
      ClassExpression: function(path) {
        const classObject = traverseClassDeclarationOrClassExpression(
          path.node
        );
        if (classObject.methods.length) classObjects.push(classObject);
      },
      ClassDeclaration: function(path) {
        const classObject = traverseClassDeclarationOrClassExpression(
          path.node
        );
        if (classObject.methods.length) classObjects.push(classObject);
      },
      AssignmentExpression: function(path) {
        const { left, right } = path.node;
        if (isMemberExpression(left)) {
          if (flattenMemberExpression(left).match(/^module.exports\.?(.*)$/)) {
            const property = RegExp.$1 || null;
            if (isClassExpression(right)) {
              // e.g., module.exports = class Class { ... }
              // e.g., module.exports.class = class Class { ... }
              // e.g., module.exports.default = class Class { ... }
              const classNameIfExists = isIdentifier(right.id)
                ? right.id.name
                : null;
              moduleExports.push({
                property,
                classNameIfExists,
                name: classNameIfExists,
              });
            } else if (isIdentifier(right)) {
              // e.g., function func() { ... }; module.exports.func = func;
              // e.g., class Class { ... }; module.exports = Class;
              // e.g., class Class { ... }; module.exports.class = Class;
              // e.g., class Class { ... }; module.exports.default = Class;
              moduleExports.push({
                property,
                classNameIfExists: null,
                name: right.name,
              });
            } else {
              // e.g., module.exports = function () { ... }
              // e.g., module.exports.func = function () { ... }
              // e.g., module.exports.default = function () { ... }
              moduleExports.push({
                property,
                classNameIfExists: null,
                name: null,
              });
            }
          }
        }
      },
    });
  }
  return { moduleExports, classObjects };
}

export { parser };
