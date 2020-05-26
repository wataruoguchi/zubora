import { ExportedModule, MethodObject, ClassObject } from './types';
import { getRelativePath, getFileName } from './resolver';

type ClassHash = {
  [key: string]: ClassObject;
};

export function importBlock(
  relativePath: string,
  exported: ExportedModule[]
): string {
  const namedModules: ExportedModule[] = exported.filter(
    (moduleExportObj: ExportedModule) =>
      moduleExportObj.property && moduleExportObj.property !== 'default'
  );
  const modules: ExportedModule[] = exported.filter(
    // CJS module. Expecting only one object.
    (moduleExportObj: ExportedModule) => moduleExportObj.property === null
  );
  const defaultModules: ExportedModule[] = exported.filter(
    // Expecting only one object.
    (moduleExportObj: ExportedModule) =>
      moduleExportObj.property && moduleExportObj.property === 'default'
  );
  const moduleNameFromFilePath = getFileName(relativePath);
  const nonNamedModuleImport: string = modules.length
    ? `* as ${moduleNameFromFilePath}`
    : defaultModules.length
    ? `${moduleNameFromFilePath}`
    : '';
  const namedModuleImport: string = namedModules.length
    ? `{ ${namedModules
        .map((module: ExportedModule) => module.property)
        .join(',')} }`
    : '';
  return `import ${[nonNamedModuleImport, namedModuleImport]
    .filter((str) => str.length)
    .join(',')} from '${relativePath}'`;
}
export function testCaseBlock(
  relativePath: string,
  exported: ExportedModule[],
  classObjects: ClassObject[]
): string {
  const classHash: ClassHash = classObjects.reduce(
    (acc: ClassHash, classObj: ClassObject) => {
      if (!acc[classObj.name]) acc[classObj.name] = classObj;
      return acc;
    },
    {}
  );
  return exported
    .map((exportedModule: ExportedModule): string => {
      const { property, classNameIfExists, name } = exportedModule;
      const exposedName: string =
        property && property !== 'default'
          ? property
          : getFileName(relativePath);
      const nameFindClassWith: string =
        classNameIfExists || name || property || exposedName;
      const classObj: ClassObject = classHash[nameFindClassWith];
      if (classObj && !classObj.isFunction) {
        return (
          `describe('${classObj.name}',function(){\n` +
          classObj.methods
            .map((method: MethodObject) => {
              return `describe('#${method.name}', function(){
                  it('', ${method.async ? 'async' : ''} function() {
                    // TODO Write test for ${exposedName}#${method.name}
                  })
                })`;
            })
            .join('\n') +
          `\n})`
        );
      } else if (classObj) {
        return `describe('${exposedName}',function(){
          describe('${exposedName}', function(){
            it('', ${classObj.methods[0].async ? 'async' : ''} function() {
              // TODO Write test for ${exposedName}
            })
          })
        })`;
      } else {
        return `describe('${exposedName}',function(){
          describe('${exposedName}', function(){
            it('', function() {
              // TODO Write test for ${exposedName}
            })
          })
        })`;
      }
    })
    .join('\n');
}

export function template(srcFilePath: string, destFilePath: string): Function {
  const relativePath = getRelativePath(srcFilePath, destFilePath);
  return function generateTemplate(
    exportedModules: ExportedModule[],
    classObjects: ClassObject[]
  ): string {
    const imports = importBlock(relativePath, exportedModules);
    const describes = testCaseBlock(
      relativePath,
      exportedModules,
      classObjects
    );
    return `${imports}\n${describes}`;
  };
}
