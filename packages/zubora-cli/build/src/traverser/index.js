"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO This could be a babel plugin in the future.
var traverse_1 = __importDefault(require("@babel/traverse"));
var ClassExpression_1 = require("./ClassExpression");
var ExportNamedDeclaration_1 = require("./ExportNamedDeclaration");
var ExportDefaultDeclaration_1 = require("./ExportDefaultDeclaration");
var AssignmentExpression_1 = require("./AssignmentExpression");
function traverser(ast) {
    var exportedModules = [];
    var classObjects = [];
    traverse_1.default(ast, {
        ClassExpression: ClassExpression_1.visitClassExpression(classObjects),
        ClassDeclaration: ClassExpression_1.visitClassExpression(classObjects),
        ExportNamedDeclaration: ExportNamedDeclaration_1.visitExportNamedDeclaration(exportedModules),
        ExportDefaultDeclaration: ExportDefaultDeclaration_1.visitExportDefaultDeclaration(exportedModules),
        AssignmentExpression: AssignmentExpression_1.visitAssignmentExpression(exportedModules),
    });
    return { exportedModules: exportedModules, classObjects: classObjects };
}
exports.traverser = traverser;
//# sourceMappingURL=index.js.map