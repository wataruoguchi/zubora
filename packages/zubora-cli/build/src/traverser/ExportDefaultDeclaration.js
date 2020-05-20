"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildExportedModule_1 = require("./buildExportedModule");
function visitExportDefaultDeclaration(exportedModules) {
    return function (path) {
        var node = path.node;
        var declaration = node.declaration;
        var moduleExportObject = buildExportedModule_1.buildExportedModule('default', declaration);
        exportedModules.push(moduleExportObject);
    };
}
exports.visitExportDefaultDeclaration = visitExportDefaultDeclaration;
//# sourceMappingURL=ExportDefaultDeclaration.js.map