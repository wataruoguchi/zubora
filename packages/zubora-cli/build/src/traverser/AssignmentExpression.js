"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@babel/types");
var buildExportedModule_1 = require("./buildExportedModule");
function flattenMemberExpression(exp) {
    if (!types_1.isMemberExpression(exp))
        return '';
    var object = exp.object, property = exp.property;
    if (types_1.isMemberExpression(object)) {
        return flattenMemberExpression(object) + ("." + property.name);
    }
    else if (types_1.isIdentifier(object)) {
        return object.name + "." + property.name;
    }
    else {
        return '';
    }
}
function visitAssignmentExpression(exportedModules) {
    return function (path) {
        var node = path.node;
        var left = node.left, right = node.right;
        if (types_1.isMemberExpression(left)) {
            if (flattenMemberExpression(left).match(/^module.exports\.?(.*)$/)) {
                var property = RegExp.$1 || null;
                var moduleExportObject = buildExportedModule_1.buildExportedModule(property, right);
                exportedModules.push(moduleExportObject);
            }
        }
    };
}
exports.visitAssignmentExpression = visitAssignmentExpression;
//# sourceMappingURL=AssignmentExpression.js.map