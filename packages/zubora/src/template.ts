import { ExportedModule, MethodObject, ClassObject } from './types';

type ClassHash = {
  [key: string]: ClassObject;
};

export function importBlock(
  relativePath: string,
  fileName: string,
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
  const moduleNameFromFilePath = fileName;
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
    .filter(str => str.length)
    .join(',')} from '${relativePath.replace(/\.[^/.]+$/, '')}'`;
}
export function testCaseBlock(
  fileName: string,
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
        property && property !== 'default' ? property : fileName;
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

export function template(relativePath: string, fileName: string): Function {
  return function generateTemplate(
    exportedModules: ExportedModule[],
    classObjects: ClassObject[]
  ): string {
    const imports = importBlock(relativePath, fileName, exportedModules);
    const describes = testCaseBlock(fileName, exportedModules, classObjects);
    return `${imports}\n${describes}`;
  };
}
