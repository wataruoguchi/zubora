import { ModuleExportObject, MethodObject, ClassObject } from './types';
import { getRelativePath, getFileName } from './resolver';

type ClassHash = {
  [key: string]: ClassObject;
};

export function importBlock(
  relativePath: string,
  exported: ModuleExportObject[]
): string {
  const namedModules: ModuleExportObject[] = exported.filter(
    (moduleExportObj: ModuleExportObject) =>
      moduleExportObj.property && moduleExportObj.property !== 'default'
  );
  const modules: ModuleExportObject[] = exported.filter(
    // Expecting only one object
    (moduleExportObj: ModuleExportObject) => moduleExportObj.property === null
  );
  const defaultModules: ModuleExportObject[] = exported.filter(
    // Expecting only one object
    (moduleExportObj: ModuleExportObject) =>
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
        .map((module: ModuleExportObject) => module.property)
        .join(',')} }`
    : '';
  return `import ${[nonNamedModuleImport, namedModuleImport]
    .filter(str => str.length)
    .join(',')} from '${relativePath}'`;
}
export function testCaseBlock(
  relativePath: string,
  exported: ModuleExportObject[],
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
    .map((moduleExportObj: ModuleExportObject): string => {
      const { property, classNameIfExists, name } = moduleExportObj;
      const exposedName: string =
        property && property !== 'default'
          ? property
          : getFileName(relativePath);
      const nameFindClassWith: string =
        classNameIfExists || name || property || exposedName;
      const classObj: ClassObject = classHash[nameFindClassWith];
      if (classObj) {
        return (
          `describe('${classObj.name}',function(){\n` +
          classObj.methods
            .map((method: MethodObject) => {
              return `describe('#${method.name}', ${
                method.async ? 'async' : ''
              } function(){
                  it('', function() {
                    // TODO Write test for ${exposedName}#${method.name}
                  })
                })`;
            })
            .join('\n') +
          `\n})`
        );
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
    moduleExports: ModuleExportObject[],
    classObjects: ClassObject[]
  ): string {
    const imports = importBlock(relativePath, moduleExports);
    const describes = testCaseBlock(relativePath, moduleExports, classObjects);
    return `${imports}\n${describes}`;
  };
}
