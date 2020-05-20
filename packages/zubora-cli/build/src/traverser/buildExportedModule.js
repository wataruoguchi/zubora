"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@babel/types");
/**
 * Create ExportedModule type object by given property and name, then return.
 * @param property name, 'default', or null
 * @param node
 */
function buildExportedModule(property, node) {
    if (types_1.isClassExpression(node) || types_1.isClassDeclaration(node)) {
        // e.g., module.exports = class Class { ... }
        // e.g., module.exports.named = class Class { ... }
        // e.g., module.exports.default = class Class { ... }
        // e.g., export default class Class { ... }
        // e.g., export class Class { ... }
        var classNameIfExists = types_1.isIdentifier(node.id) ? node.id.name : null;
        return {
            property: property,
            classNameIfExists: classNameIfExists,
            name: classNameIfExists,
        };
    }
    else if (types_1.isIdentifier(node)) {
        // e.g., function func() { ... }; module.exports.func = func;
        // e.g., class Class { ... }; module.exports = Class;
        // e.g., class Class { ... }; module.exports.named = Class;
        // e.g., class Class { ... }; module.exports.default = Class;
        // e.g., class Class { ... }; export default = Class;
        return {
            property: property,
            classNameIfExists: null,
            name: node.name,
        };
    }
    else {
        // e.g., module.exports = function () { ... }
        // e.g., module.exports.named = function () { ... }
        // e.g., module.exports.default = function () { ... }
        // e.g., export default function () { ... }
        // e.g., export function func() { ... }
        // e.g., function func() { ... }; export { func };
        // e.g., class Class { ... }; export { Class };
        return {
            property: property,
            classNameIfExists: null,
            name: null,
        };
    }
}
exports.buildExportedModule = buildExportedModule;
//# sourceMappingURL=buildExportedModule.js.map