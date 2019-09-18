import { ModuleExportObject, MethodObject, ClassObject } from './zubora';

type ClassHash = {
  [key: string]: ClassObject;
};

export function importBlock(
  path: string,
  exports: ModuleExportObject[]
): string {
  const namedModules: ModuleExportObject[] = exports.filter(
    (moduleExportObj: ModuleExportObject) =>
      moduleExportObj.property && moduleExportObj.property !== 'default'
  );
  const modules: ModuleExportObject[] = exports.filter(
    // Expecting only one object
    (moduleExportObj: ModuleExportObject) => moduleExportObj.property === null
  );
  const defaultModules: ModuleExportObject[] = exports.filter(
    // Expecting only one object
    (moduleExportObj: ModuleExportObject) =>
      moduleExportObj.property && moduleExportObj.property === 'default'
  );
  const nonNamedModuleImport: string = modules.length
    ? `* as ${'FILENAME'}`
    : defaultModules.length
    ? `${'FILENAME'}`
    : '';
  const namedModuleImport: string = namedModules.length
    ? `{ ${namedModules
        .map((module: ModuleExportObject) => module.property)
        .join(',')} }`
    : '';
  return `import ${[nonNamedModuleImport, namedModuleImport]
    .filter(str => str.length)
    .join(',')} from "${path}"`;
}
export function testCaseBlock(
  exports: ModuleExportObject[],
  classObjects: ClassObject[]
): string {
  const classHash: ClassHash = classObjects.reduce(
    (acc: ClassHash, classObj: ClassObject) => {
      if (!acc[classObj.name]) acc[classObj.name] = classObj;
      return acc;
    },
    {}
  );
  return exports
    .map((moduleExportObj: ModuleExportObject): string => {
      const { property, classNameIfExists, name } = moduleExportObj;
      const nameFindClassWith = classNameIfExists || name;
      let classTestStr = '';
      if (nameFindClassWith) {
        const classObj: ClassObject = classHash[nameFindClassWith];
        if (classObj) {
          const exposedName =
            (property || 'default') === 'default'
              ? classNameIfExists || name
              : property;
          classTestStr =
            `describe("${classObj.name}",function(){\n` +
            classObj.methods
              .map((method: MethodObject) => {
                return `describe("#${exposedName}", ${
                  method.async ? 'async' : ''
                } function(){\n
                  it("", function() {\n
                    // TODO ${exposedName}#${method.name}\n
                  })\n
                })`;
              })
              .join('\n') +
            `\n})`;
        }
      }
      return classTestStr;
    })
    .join('\n');
}
