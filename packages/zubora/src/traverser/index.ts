// TODO This could be a babel plugin in the future.
import traverse from '@babel/traverse';
import { NodePath } from '@babel/core';
import { File, Node, isProgram, Program } from '@babel/types';
import { visitClassExpression } from './ClassExpression';
import { exportedModuleBuilder } from './ExportedModuleBuilder';
import { declarationCollector } from './DeclarationCollector';
import { ExportedModule, ClassObject, ParseResult } from '../types';

function traverser(ast: File): ParseResult {
  const exportedModules: ExportedModule[] = [];
  const classObjects: ClassObject[] = [];
  traverse(ast, {
    Program: function(path: NodePath<Program>) {
      // Top level. Collect those declarations. Some of them could link to `exportedModules` later on.
      if (isProgram(path.node)) {
        path.node.body.forEach(function(child: Node) {
          declarationCollector(child).forEach(childRes =>
            classObjects.push(childRes)
          );
        });
      }
    },
    ClassExpression: visitClassExpression(classObjects),
    ClassDeclaration: visitClassExpression(classObjects),
    ...exportedModuleBuilder(exportedModules),
  });
  const resultClassObjects: ClassObject[] = classObjects
    .reduce((acc: ClassObject[], clsObj) => {
      // TODO Refactoring
      // Link objects
      if (clsObj.identifierName) {
        const foundCls = classObjects.find(
          _clsObj => _clsObj.name === clsObj.identifierName
        );
        if (foundCls) {
          acc.push({
            ...foundCls,
            name: clsObj.name,
          });
        } else acc.push(clsObj);
      } else {
        acc.push(clsObj);
      }
      return acc;
    }, [])
    .reduce((acc: ClassObject[], clsObj) => {
      // Filter out to be unique if it's class. TODO refactoring
      if (clsObj.methods.length) {
        // TODO refactoring
        if (!acc.length || acc.find(cls => cls.name !== clsObj.name)) {
          acc.push(clsObj);
        }
      } else {
        acc.push(clsObj);
      }
      return acc;
    }, []);
  return {
    exportedModules,
    classObjects: resultClassObjects.filter(
      classObject => classObject.name !== ''
    ),
  };
}

export { traverser };
