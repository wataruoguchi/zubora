import { ParserOptions } from '@babel/core';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import {
  isMemberExpression,
  isIdentifier,
  MemberExpression,
  isClassMethod,
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

function parser(content: string): ParseResult {
  const exposedNames: ModuleExportObject[] = [];
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
      ClassDeclaration: function(path) {
        if (isIdentifier(path.node.id)) {
          const { name } = path.node.id;
          const { body } = path.node.body;
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
          classObjects.push({ name, methods: methodObjects });
        }
      },
      AssignmentExpression: function(path) {
        const { left, right } = path.node;
        if (isMemberExpression(left)) {
          if (flattenMemberExpression(left).match(/^module.exports\.?(.*)$/)) {
            const property = RegExp.$1;
            if (property) {
              if (isIdentifier(right)) {
                // e.g., function func() { ... }; module.exports.func = func;
                exposedNames.push({ name: right.name, property }); // TODO: Review what to pass
              } else {
                // e.g., module.exports.func = function () { ... }
                // e.g., module.exports.default = function () { ... }
                exposedNames.push({ name: property, property }); // TODO: Review what to pass
              }
            } else {
              if (isIdentifier(right)) {
                // e.g., function func() { ... }; module.exports = func;
                exposedNames.push({ name: right.name }); // TODO: Review what to pass
              } else {
                // e.g., module.exports = function () { ... }
                exposedNames.push({ name: 'FILE' }); // TODO: Review what to pass
              }
            }
          }
        }
      },
    });
  }
  return { exposedNames, classObjects };
}

export { parser };
