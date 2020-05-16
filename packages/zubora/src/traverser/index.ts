// TODO This could be a babel plugin in the future.
import traverse from '@babel/traverse';
import { isMemberExpression, File } from '@babel/types';
import { ExportedModule, ClassObject, ParseResult } from '../types';
import {
  flattenMemberExpression,
  fetchClassObject,
  fetchExportedModule,
} from './utils';
import { visitExportNamedDeclaration } from './ExportNamedDeclaration';
import { visitExportDefaultDeclaration } from './ExportDefaultDeclaration';

function traverser(ast: File): ParseResult {
  const moduleExports: ExportedModule[] = [];
  const classObjects: ClassObject[] = [];
  traverse(ast, {
    ClassExpression: function(path) {
      const classObject = fetchClassObject(path.node);
      if (classObject.methods.length) classObjects.push(classObject);
    },
    ClassDeclaration: function(path) {
      const classObject = fetchClassObject(path.node);
      if (classObject.methods.length) classObjects.push(classObject);
    },
    ExportNamedDeclaration: visitExportNamedDeclaration(moduleExports),
    ExportDefaultDeclaration: visitExportDefaultDeclaration(moduleExports),
    AssignmentExpression: function(path) {
      const { left, right } = path.node;
      if (isMemberExpression(left)) {
        if (flattenMemberExpression(left).match(/^module.exports\.?(.*)$/)) {
          const property = RegExp.$1 || null;
          const moduleExportObject: ExportedModule = fetchExportedModule(
            property,
            right
          );
          moduleExports.push(moduleExportObject);
        }
      }
    },
  });
  return { moduleExports, classObjects };
}

export { traverser };
