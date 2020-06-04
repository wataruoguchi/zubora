import { transformFromAst } from '@babel/standalone';
import { NodePath, types } from '@babel/core';
import { Node, isProgram, Program } from '@babel/types';
import { visitClassExpression } from './ClassExpression';
import { exportedModuleBuilder } from './ExportedModuleBuilder';
import { declarationCollector } from './DeclarationCollector';
import { ExportedModule, ClassObject, ParseResult } from '../types';

function traverser(ast: types.Node): ParseResult {
  const exportedModules: ExportedModule[] = [];
  const classObjects: ClassObject[] = [];
  function plugin(): { visitor: any } {
    return {
      visitor: {
        Program: function(path: NodePath<Program>): void {
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
      },
    };
  }
  transformFromAst(ast, undefined, {
    plugins: [plugin],
    configFile: false,
    babelrc: false,
    babelrcRoots: false,
    code: false,
    comments: false,
    filename: '_zubora',
    filenameRelative: './_zubora',
  });
  // Unique by name
  const classObjMap = new Map(
    classObjects.map(classObject => [classObject.name, classObject])
  );
  const resultClassObjects: ClassObject[] = Array.from(classObjMap).reduce(
    (acc: ClassObject[], [name, clsObj]) => {
      /**
       * Link objects.
       * If the identifierName is matched to other clsObj, update the name of the found clsObj.
       *
       * For example,
       * [
       *   {
       *     name: 'exportedName',
       *     methods: [],
       *     identifierName: 'localName'
       *   },
       *   {
       *     name: 'localName',
       *     methods: [<methods you want to test>],
       *   }
       * ]
       * This structure is built from something like: `const exportedName = class localName() { method() {} }`
       * If the case above is given, the latter's name will be updated with `exportedName`.
       */
      if (clsObj.identifierName) {
        const foundCls = classObjects.find(
          _clsObj => _clsObj.name === clsObj.identifierName
        );
        if (foundCls) {
          acc.push({
            ...foundCls,
            name,
          });
        } else acc.push(clsObj);
      } else {
        acc.push(clsObj);
      }
      return acc;
    },
    []
  );
  return {
    exportedModules,
    classObjects: resultClassObjects.filter(
      classObject => classObject.name !== ''
    ),
  };
}

export { traverser };
