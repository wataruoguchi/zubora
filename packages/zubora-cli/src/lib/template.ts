import { ModuleExportObject, MethodObject, ClassObject } from './zubora';

type ModuleHash = {
  [key: string]: ClassObject;
};

export function importBlock(
  path: string,
  exports: ModuleExportObject[]
): string {
  return exports
    .map((moduleExportObj: ModuleExportObject): string => {
      const { name, property } = moduleExportObj;
      const importModule: string = !property
        ? `* as ${name}`
        : property === 'default'
        ? property
        : `{${property}}`;
      return `import ${importModule} from "${path}"`;
    })
    .join('\n');
}
export function testCaseBlock(
  exports: ModuleExportObject[],
  modules: ClassObject[]
): string {
  const moduleHash: ModuleHash = modules.reduce(
    (acc: ModuleHash, classObj: ClassObject) => {
      if (!acc[classObj.name]) acc[classObj.name] = classObj;
      return acc;
    },
    {}
  );
  return exports
    .map((moduleExportObj: ModuleExportObject): string => {
      const { name } = moduleExportObj;
      let classTestStr = '';
      if (name) {
        const classObj: ClassObject = moduleHash[name];
        if (classObj) {
          classTestStr =
            `describe("${classObj.name}",function(){\n` +
            classObj.methods
              .map((method: MethodObject) => {
                return `describe("#${method.name}", ${
                  method.async ? 'async' : ''
                } function(){\n
                  it("", function() {\n
                    // TODO ${name}#${method.name}\n
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
