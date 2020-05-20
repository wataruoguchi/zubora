"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolver_1 = require("./resolver");
function importBlock(relativePath, exported) {
    var namedModules = exported.filter(function (moduleExportObj) {
        return moduleExportObj.property && moduleExportObj.property !== 'default';
    });
    var modules = exported.filter(
    // Expecting only one object
    function (moduleExportObj) { return moduleExportObj.property === null; });
    var defaultModules = exported.filter(
    // Expecting only one object
    function (moduleExportObj) {
        return moduleExportObj.property && moduleExportObj.property === 'default';
    });
    var moduleNameFromFilePath = resolver_1.getFileName(relativePath);
    var nonNamedModuleImport = modules.length
        ? "* as " + moduleNameFromFilePath
        : defaultModules.length
            ? "" + moduleNameFromFilePath
            : '';
    var namedModuleImport = namedModules.length
        ? "{ " + namedModules
            .map(function (module) { return module.property; })
            .join(',') + " }"
        : '';
    return "import " + [nonNamedModuleImport, namedModuleImport]
        .filter(function (str) { return str.length; })
        .join(',') + " from '" + relativePath + "'";
}
exports.importBlock = importBlock;
function testCaseBlock(relativePath, exported, classObjects) {
    var classHash = classObjects.reduce(function (acc, classObj) {
        if (!acc[classObj.name])
            acc[classObj.name] = classObj;
        return acc;
    }, {});
    return exported
        .map(function (moduleExportObj) {
        var property = moduleExportObj.property, classNameIfExists = moduleExportObj.classNameIfExists, name = moduleExportObj.name;
        var exposedName = property && property !== 'default'
            ? property
            : resolver_1.getFileName(relativePath);
        var nameFindClassWith = classNameIfExists || name || property || exposedName;
        var classObj = classHash[nameFindClassWith];
        if (classObj) {
            return ("describe('" + classObj.name + "',function(){\n" +
                classObj.methods
                    .map(function (method) {
                    return "describe('#" + method.name + "', " + (method.async ? 'async' : '') + " function(){\n                  it('', function() {\n                    // TODO Write test for " + exposedName + "#" + method.name + "\n                  })\n                })";
                })
                    .join('\n') +
                "\n})");
        }
        else {
            return "describe('" + exposedName + "',function(){\n          describe('" + exposedName + "', function(){\n            it('', function() {\n              // TODO Write test for " + exposedName + "\n            })\n          })\n        })";
        }
    })
        .join('\n');
}
exports.testCaseBlock = testCaseBlock;
function template(srcFilePath, destFilePath) {
    var relativePath = resolver_1.getRelativePath(srcFilePath, destFilePath);
    return function generateTemplate(exportedModules, classObjects) {
        var imports = importBlock(relativePath, exportedModules);
        var describes = testCaseBlock(relativePath, exportedModules, classObjects);
        return imports + "\n" + describes;
    };
}
exports.template = template;
//# sourceMappingURL=template.js.map