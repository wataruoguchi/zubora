import { ParserOptions } from '@babel/core';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
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
  isVariableDeclaration,
  isVariableDeclarator,
  isFunctionDeclaration,
  isExportSpecifier,
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

function fetchModuleExportObject(
  property: string | null,
  node: Node
): ModuleExportObject {
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
function parser(content: string): ParseResult {
  const moduleExports: ModuleExportObject[] = [];
  const classObjects: ClassObject[] = [];
  let ast;
  try {
    // We determine that the input file is module
    const options: ParserOptions = { sourceType: 'module' };
    ast = parse(content, options);
  } catch (err) {
    console.log('ERR', err, content); // TODO: Better error handling
  }
  if (ast) {
    traverse(ast, {
      ClassExpression: function(path) {
        const classObject = fetchClassObject(path.node);
        if (classObject.methods.length) classObjects.push(classObject);
      },
      ClassDeclaration: function(path) {
        const classObject = fetchClassObject(path.node);
        if (classObject.methods.length) classObjects.push(classObject);
      },
      ExportNamedDeclaration: function(path) {
        const { declaration } = path.node;
        let name = '';
        if (isClassDeclaration(declaration) && isIdentifier(declaration.id)) {
          name = declaration.id.name;
        } else if (
          isVariableDeclaration(declaration) &&
          declaration.declarations &&
          declaration.declarations.length === 1 &&
          isVariableDeclarator(declaration.declarations[0]) &&
          isIdentifier(declaration.declarations[0].id)
        ) {
          name = declaration.declarations[0].id.name;
        } else if (
          isFunctionDeclaration(declaration) &&
          isIdentifier(declaration.id)
        ) {
          name = declaration.id.name;
        } else if (
          declaration === null &&
          path.node.specifiers &&
          path.node.specifiers.length > 0 &&
          path.node.specifiers.every(
            specifier =>
              isExportSpecifier(specifier) && isIdentifier(specifier.exported)
          )
        ) {
          path.node.specifiers.map(specifier => {
            const name = specifier.exported.name;
            const moduleExportObject: ModuleExportObject = fetchModuleExportObject(
              name,
              path.node // declaration must be null, let's pass the node to avoid the type error
            );
            moduleExports.push(moduleExportObject);
          });
          return;
        } else if (!declaration) return;
        const moduleExportObject: ModuleExportObject = fetchModuleExportObject(
          name,
          declaration
        );
        moduleExports.push(moduleExportObject);
      },
      ExportDefaultDeclaration: function(path) {
        const declaration = path.node.declaration;
        const moduleExportObject: ModuleExportObject = fetchModuleExportObject(
          'default',
          declaration
        );
        moduleExports.push(moduleExportObject);
      },
      AssignmentExpression: function(path) {
        const { left, right } = path.node;
        if (isMemberExpression(left)) {
          if (flattenMemberExpression(left).match(/^module.exports\.?(.*)$/)) {
            const property = RegExp.$1 || null;
            const moduleExportObject: ModuleExportObject = fetchModuleExportObject(
              property,
              right
            );
            moduleExports.push(moduleExportObject);
          }
        }
      },
    });
  }
  console.log('moduleExports', moduleExports);
  console.log('classObjects', classObjects);
  return { moduleExports, classObjects };
}

export { parser };
